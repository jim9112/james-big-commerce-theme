import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';

export default class Category extends CatalogPage {
  constructor(context) {
    super(context);
    this.validationDictionary = createTranslationDictionary(context);
  }

  onReady() {
    //   ------------------------------------------------------------------------
    // added by James
    const productList = this.context.currentCategoryProducts;
    // set visibility of delete all button
    this.deleteButtonToggle();

    // add event listener to add all button
    document.querySelector('.addAllToCart').addEventListener('click', () => {
      this.addAllProducts(productList);
    });

    // add event listener to delete cart

    document.querySelector('.deleteCart').addEventListener('click', () => {
      this.deleteCartContents();
    });

    // add event listener for image
    document
      .querySelectorAll('.card-img-container')
      .forEach((picture, index) => {
        picture.addEventListener('mouseover', (e) => {
          this.pictureToggle(picture, index, productList);
        });
      });

    // event listener for custom alert close button
    document
      .querySelector('.customCloseButton')
      .addEventListener('click', () => {
        document.querySelector('.customAlert').classList.add('customHidden');
        location.reload();
        return false;
      });
    // end added by James
    // -----------------------------------------------------------------------------

    $('[data-button-type="add-cart"]').on('click', (e) => {
      $(e.currentTarget).next().attr({
        role: 'status',
        'aria-live': 'polite',
      });
    });

    compareProducts(this.context.urls);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      hooks.on('sortBy-submitted', this.onSortBySubmit);
    }

    $('a.reset-btn').on('click', () => {
      $('span.reset-message').attr({
        role: 'status',
        'aria-live': 'polite',
      });
    });

    this.ariaNotifyNoProducts();
  }

  //   --------------------------------------------------------------
  //   added by James

  //   add all projects to users shopping cart
  addAllProducts(products) {
    products.forEach((product, index) => {
      fetch(`/cart.php?action=add&product_id=${product.id}`, {
        method: 'POST',
      })
        .then(() => {
          if (index === products.length - 1) {
            document
              .querySelector('.customAlert')
              .classList.remove('customHidden');

            document
              .querySelector('.deleteCart')
              .classList.remove('customHidden');
          }
        })
        .catch((err) => console.error(err));
    });
  }

  //   delete shopping cart and contents
  deleteCartContents() {
    let id;
    fetch('/api/storefront/carts/')
      .then((res) => res.json())
      .then((data) => (id = data[0].id))
      .then(() => {
        fetch(`/api/storefront/carts/${id}`, {
          method: 'DELETE',
        });
        document.querySelector('.customAlert').classList.remove('customHidden');
        document.querySelector('.deleteCart').classList.add('customHidden');
      })
      .catch((err) => console.error(err));
  }

  //   set button state for delete all button
  deleteButtonToggle() {
    fetch('/api/storefront/carts/')
      .then((res) => res.json())
      .then((data) => {
        const deleteButton = document.querySelector('.deleteCart');
        if (data.length === 0) {
          deleteButton.classList.add('customHidden');
        } else {
          deleteButton.classList.remove('customHidden');
        }
      })
      .catch((err) => console.error(err));
  }

  //   toggle picture with mouseover
  pictureToggle(picture, index, productList) {
    const picList = productList[index].images;
    const imgUrl = picList[1].data;
    const imgAlt = picList[1].alt;
    picture.innerHTML = `<img class="card-image layzyautosizes layzyloaded" src="${imgUrl.replace(
      '{:size}',
      '500x659'
    )}" alt="${imgAlt}">`;
  }
  // end added by James
  //   -------------------------------------------------------------------
  ariaNotifyNoProducts() {
    const $noProductsMessage = $('[data-no-products-notification]');
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  }

  initFacetedSearch() {
    const {
      price_min_evaluation: onMinPriceError,
      price_max_evaluation: onMaxPriceError,
      price_min_not_entered: minPriceNotEntered,
      price_max_not_entered: maxPriceNotEntered,
      price_invalid_value: onInvalidPrice,
    } = this.validationDictionary;
    const $productListingContainer = $('#product-listing-container');
    const $facetedSearchContainer = $('#faceted-search-container');
    const productsPerPage = this.context.categoryProductsPerPage;
    const requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage,
          },
        },
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar',
      },
      showMore: 'category/show-more',
    };

    this.facetedSearch = new FacetedSearch(
      requestOptions,
      (content) => {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);

        $('body').triggerHandler('compareReset');

        $('html, body').animate(
          {
            scrollTop: 0,
          },
          100
        );
      },
      {
        validationErrorMessages: {
          onMinPriceError,
          onMaxPriceError,
          minPriceNotEntered,
          maxPriceNotEntered,
          onInvalidPrice,
        },
      }
    );
  }
}
