(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Category.prototype;

  _proto.onReady = function onReady() {
    var _this2 = this;

    //   ------------------------------------------------------------------------
    // added by James
    var productList = this.context.currentCategoryProducts; // set visibility of delete all button

    this.deleteButtonToggle(); // add event listener to add all button

    document.querySelector('.addAllToCart').addEventListener('click', function () {
      _this2.addAllProducts(productList);
    }); // add event listener to delete cart

    document.querySelector('.deleteCart').addEventListener('click', function () {
      _this2.deleteCartContents();
    }); // add event listener for image

    document.querySelectorAll('.card-img-container').forEach(function (picture, index) {
      picture.addEventListener('mouseover', function (e) {
        _this2.pictureToggle(picture, index, productList);
      });
    }); // event listener for custom alert close button

    document.querySelector('.customCloseButton').addEventListener('click', function () {
      location.reload();
      return false;
    }); // end added by James
    // -----------------------------------------------------------------------------

    $('[data-button-type="add-cart"]').on('click', function (e) {
      $(e.currentTarget).next().attr({
        role: 'status',
        'aria-live': 'polite'
      });
    });
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context.urls);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    $('a.reset-btn').on('click', function () {
      $('span.reset-message').attr({
        role: 'status',
        'aria-live': 'polite'
      });
    });
    this.ariaNotifyNoProducts();
  } //   --------------------------------------------------------------
  //   added by James
  //   add all projects to users shopping cart
  ;

  _proto.addAllProducts = function addAllProducts(products) {
    console.log(products);
    products.forEach(function (product, index) {
      fetch("/cart.php?action=add&product_id=" + product.id, {
        method: 'POST'
      }).then(function () {
        if (index === products.length - 1) {
          document.querySelector('.customAlert').classList.remove('customHidden');
        }
      })["catch"](function (err) {
        return console.error(err);
      });
    });
  } //   delete shopping cart and contents
  ;

  _proto.deleteCartContents = function deleteCartContents() {
    var id;
    fetch('/api/storefront/carts/').then(function (res) {
      return res.json();
    }).then(function (data) {
      return id = data[0].id;
    }).then(function () {
      fetch("/api/storefront/carts/" + id, {
        method: 'DELETE'
      });
      document.querySelector('.customAlert').classList.remove('customHidden');
    });
  } //   set button state for delete all button
  ;

  _proto.deleteButtonToggle = function deleteButtonToggle() {
    fetch('/api/storefront/carts/').then(function (res) {
      return res.json();
    }).then(function (data) {
      var deleteButton = document.querySelector('.deleteCart');

      if (data.length === 0) {
        deleteButton.classList.add('customHidden');
      } else {
        deleteButton.classList.remove('customHidden');
      }
    });
  } //   toggle picture with mouseover
  ;

  _proto.pictureToggle = function pictureToggle(picture, index, productList) {
    var picList = productList[index].images;
    var imgUrl = picList[1].data;
    picture.innerHTML = "<img class=\"card-image layzyautosizes layzyloaded\" src=\"" + imgUrl.replace('{:size}', '500x659') + "\">";
  } // end added by James
  //   -------------------------------------------------------------------
  ;

  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');

    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJvblJlYWR5IiwicHJvZHVjdExpc3QiLCJjdXJyZW50Q2F0ZWdvcnlQcm9kdWN0cyIsImRlbGV0ZUJ1dHRvblRvZ2dsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRBbGxQcm9kdWN0cyIsImRlbGV0ZUNhcnRDb250ZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicGljdHVyZSIsImluZGV4IiwiZSIsInBpY3R1cmVUb2dnbGUiLCJsb2NhdGlvbiIsInJlbG9hZCIsIiQiLCJvbiIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiYXR0ciIsInJvbGUiLCJjb21wYXJlUHJvZHVjdHMiLCJ1cmxzIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwicHJvZHVjdHMiLCJjb25zb2xlIiwibG9nIiwicHJvZHVjdCIsImZldGNoIiwiaWQiLCJtZXRob2QiLCJ0aGVuIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZXJyIiwiZXJyb3IiLCJyZXMiLCJqc29uIiwiZGF0YSIsImRlbGV0ZUJ1dHRvbiIsImFkZCIsInBpY0xpc3QiLCJpbWFnZXMiLCJpbWdVcmwiLCJpbm5lckhUTUwiLCJyZXBsYWNlIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiZm9jdXMiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxROzs7QUFDbkIsb0JBQVlDLE9BQVosRUFBcUI7QUFB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QUQsQ0FBSCxHQUFXSixhQUFhLENBQUNQLENBQUQsQ0FBeEI7QUFDQSxXQUFPZSxHQUFQO0FBQ0gsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgIHN1cGVyKGNvbnRleHQpO1xuICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIC8vICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gYWRkZWQgYnkgSmFtZXNcbiAgICBjb25zdCBwcm9kdWN0TGlzdCA9IHRoaXMuY29udGV4dC5jdXJyZW50Q2F0ZWdvcnlQcm9kdWN0cztcblxuICAgIC8vIHNldCB2aXNpYmlsaXR5IG9mIGRlbGV0ZSBhbGwgYnV0dG9uXG4gICAgdGhpcy5kZWxldGVCdXR0b25Ub2dnbGUoKTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgYWxsIGJ1dHRvblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRBbGxUb0NhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuYWRkQWxsUHJvZHVjdHMocHJvZHVjdExpc3QpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGRlbGV0ZSBjYXJ0XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZUNhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuZGVsZXRlQ2FydENvbnRlbnRzKCk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGltYWdlXG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZC1pbWctY29udGFpbmVyJylcbiAgICAgIC5mb3JFYWNoKChwaWN0dXJlLCBpbmRleCkgPT4ge1xuICAgICAgICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgICAgdGhpcy5waWN0dXJlVG9nZ2xlKHBpY3R1cmUsIGluZGV4LCBwcm9kdWN0TGlzdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBldmVudCBsaXN0ZW5lciBmb3IgY3VzdG9tIGFsZXJ0IGNsb3NlIGJ1dHRvblxuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcignLmN1c3RvbUNsb3NlQnV0dG9uJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIC8vIGVuZCBhZGRlZCBieSBKYW1lc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCkuYXR0cih7XG4gICAgICAgIHJvbGU6ICdzdGF0dXMnLFxuICAgICAgICAnYXJpYS1saXZlJzogJ3BvbGl0ZScsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XG5cbiAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgICQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgJCgnc3Bhbi5yZXNldC1tZXNzYWdlJykuYXR0cih7XG4gICAgICAgIHJvbGU6ICdzdGF0dXMnLFxuICAgICAgICAnYXJpYS1saXZlJzogJ3BvbGl0ZScsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgfVxuXG4gIC8vICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gICBhZGRlZCBieSBKYW1lc1xuXG4gIC8vICAgYWRkIGFsbCBwcm9qZWN0cyB0byB1c2VycyBzaG9wcGluZyBjYXJ0XG4gIGFkZEFsbFByb2R1Y3RzKHByb2R1Y3RzKSB7XG4gICAgY29uc29sZS5sb2cocHJvZHVjdHMpO1xuICAgIHByb2R1Y3RzLmZvckVhY2goKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICBmZXRjaChgL2NhcnQucGhwP2FjdGlvbj1hZGQmcHJvZHVjdF9pZD0ke3Byb2R1Y3QuaWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IHByb2R1Y3RzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tQWxlcnQnKVxuICAgICAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZSgnY3VzdG9tSGlkZGVuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICAgZGVsZXRlIHNob3BwaW5nIGNhcnQgYW5kIGNvbnRlbnRzXG4gIGRlbGV0ZUNhcnRDb250ZW50cygpIHtcbiAgICBsZXQgaWQ7XG4gICAgZmV0Y2goJy9hcGkvc3RvcmVmcm9udC9jYXJ0cy8nKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiAoaWQgPSBkYXRhWzBdLmlkKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgZmV0Y2goYC9hcGkvc3RvcmVmcm9udC9jYXJ0cy8ke2lkfWAsIHtcbiAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbUFsZXJ0JykuY2xhc3NMaXN0LnJlbW92ZSgnY3VzdG9tSGlkZGVuJyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vICAgc2V0IGJ1dHRvbiBzdGF0ZSBmb3IgZGVsZXRlIGFsbCBidXR0b25cbiAgZGVsZXRlQnV0dG9uVG9nZ2xlKCkge1xuICAgIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJylcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlQ2FydCcpO1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnY3VzdG9tSGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2N1c3RvbUhpZGRlbicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vICAgdG9nZ2xlIHBpY3R1cmUgd2l0aCBtb3VzZW92ZXJcbiAgcGljdHVyZVRvZ2dsZShwaWN0dXJlLCBpbmRleCwgcHJvZHVjdExpc3QpIHtcbiAgICBjb25zdCBwaWNMaXN0ID0gcHJvZHVjdExpc3RbaW5kZXhdLmltYWdlcztcbiAgICBjb25zdCBpbWdVcmwgPSBwaWNMaXN0WzFdLmRhdGE7XG4gICAgcGljdHVyZS5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2UgbGF5enlhdXRvc2l6ZXMgbGF5enlsb2FkZWRcIiBzcmM9XCIke2ltZ1VybC5yZXBsYWNlKFxuICAgICAgJ3s6c2l6ZX0nLFxuICAgICAgJzUwMHg2NTknXG4gICAgKX1cIj5gO1xuICB9XG4gIC8vIGVuZCBhZGRlZCBieSBKYW1lc1xuICAvLyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgIGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgIH0sXG4gICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgfTtcblxuICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKFxuICAgICAgcmVxdWVzdE9wdGlvbnMsXG4gICAgICAoY29udGVudCkgPT4ge1xuICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTAwXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9