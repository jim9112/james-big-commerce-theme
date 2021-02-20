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
    // added by me

    // add event listener to add all button
    document.querySelector('.addAllToCart').addEventListener('click', () => {
      const productList = this.context.currentCategoryProducts;
      this.addAllProducts(productList);
    });
    // end added by me

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

  //   added by me
  addAllProducts(products) {
    console.log(products);
    products.forEach((product) => {
      fetch(`/cart.php?action=add&product_id=${product.id}`, {
        method: 'POST',
      }).catch((err) => console.error(err));
    });
  }

  getCartContents() {
    fetch('/api/storefront/carts')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  // end added by me

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
