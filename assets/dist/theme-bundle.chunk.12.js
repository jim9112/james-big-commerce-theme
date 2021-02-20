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

    // added by James
    // add event listener to add all button
    document.querySelector('.addAllToCart').addEventListener('click', function () {
      var productList = _this2.context.currentCategoryProducts;

      _this2.addAllProducts(productList);
    }); // end added by James

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
  } //   added by James
  //   add all projects to users shopping cart
  ;

  _proto.addAllProducts = function addAllProducts(products) {
    console.log(products);
    products.forEach(function (product, index) {
      fetch("/cart.php?action=add&product_id=" + product.id, {
        method: 'POST'
      }).then(function () {
        if (index === products.length - 1) {
          location.reload();
          return false;
        }
      })["catch"](function (err) {
        return console.error(err);
      });
    });
  } //   get shopping cart info from api
  ;

  _proto.getCartContents = function getCartContents() {
    fetch('/api/storefront/carts').then(function (res) {
      return res.json();
    }).then(function (data) {
      return console.log(data);
    });
  } // end added by James
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJvblJlYWR5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInByb2R1Y3RMaXN0IiwiY3VycmVudENhdGVnb3J5UHJvZHVjdHMiLCJhZGRBbGxQcm9kdWN0cyIsIiQiLCJvbiIsImUiLCJjdXJyZW50VGFyZ2V0IiwibmV4dCIsImF0dHIiLCJyb2xlIiwiY29tcGFyZVByb2R1Y3RzIiwidXJscyIsImxlbmd0aCIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJhcmlhTm90aWZ5Tm9Qcm9kdWN0cyIsInByb2R1Y3RzIiwiY29uc29sZSIsImxvZyIsImZvckVhY2giLCJwcm9kdWN0IiwiaW5kZXgiLCJmZXRjaCIsImlkIiwibWV0aG9kIiwidGhlbiIsImxvY2F0aW9uIiwicmVsb2FkIiwiZXJyIiwiZXJyb3IiLCJnZXRDYXJ0Q29udGVudHMiLCJyZXMiLCJqc29uIiwiZGF0YSIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsImZvY3VzIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIkNhdGFsb2dQYWdlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJKU09OIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkEsUTs7O0FBQ25CLG9CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLG9DQUFNQSxPQUFOO0FBQ0EsVUFBS0Msb0JBQUwsR0FBNEJDLDBHQUEyQixDQUFDRixPQUFELENBQXZEO0FBRm1CO0FBR3BCOzs7O1NBRURHLE8sR0FBQSxtQkFBVTtBQUFBOztBQUNSO0FBRUE7QUFDQUMsWUFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDQyxn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LENBQUNaLFlBQUQsQ0FBNUIsRUFBNENnQixHQUE1QyxDQUFnRCxVQUFBQyxHQUFHO0FBQUEsV0FBSUEsR0FBRyxDQUFDQyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQUo7QUFBQSxHQUFuRCxDQUF4QjtBQUVBLFNBQU9KLGVBQWUsQ0FBQ0ssTUFBaEIsQ0FBdUIsVUFBQ0MsR0FBRCxFQUFNSixHQUFOLEVBQVdYLENBQVgsRUFBaUI7QUFDM0NlLE9BQUcsQ0FBQ0osR0FBRCxDQUFILEdBQVdKLGFBQWEsQ0FBQ1AsQ0FBRCxDQUF4QjtBQUNBLFdBQU9lLEdBQVA7QUFDSCxHQUhNLEVBR0osRUFISSxDQUFQO0FBSUgsQ0FWTSxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgfVxuXG4gIG9uUmVhZHkoKSB7XG4gICAgLy8gYWRkZWQgYnkgSmFtZXNcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgYWxsIGJ1dHRvblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRBbGxUb0NhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IHByb2R1Y3RMaXN0ID0gdGhpcy5jb250ZXh0LmN1cnJlbnRDYXRlZ29yeVByb2R1Y3RzO1xuICAgICAgdGhpcy5hZGRBbGxQcm9kdWN0cyhwcm9kdWN0TGlzdCk7XG4gICAgfSk7XG4gICAgLy8gZW5kIGFkZGVkIGJ5IEphbWVzXG5cbiAgICAkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCkuYXR0cih7XG4gICAgICAgIHJvbGU6ICdzdGF0dXMnLFxuICAgICAgICAnYXJpYS1saXZlJzogJ3BvbGl0ZScsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XG5cbiAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgICQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgJCgnc3Bhbi5yZXNldC1tZXNzYWdlJykuYXR0cih7XG4gICAgICAgIHJvbGU6ICdzdGF0dXMnLFxuICAgICAgICAnYXJpYS1saXZlJzogJ3BvbGl0ZScsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgfVxuXG4gIC8vICAgYWRkZWQgYnkgSmFtZXNcblxuICAvLyAgIGFkZCBhbGwgcHJvamVjdHMgdG8gdXNlcnMgc2hvcHBpbmcgY2FydFxuICBhZGRBbGxQcm9kdWN0cyhwcm9kdWN0cykge1xuICAgIGNvbnNvbGUubG9nKHByb2R1Y3RzKTtcbiAgICBwcm9kdWN0cy5mb3JFYWNoKChwcm9kdWN0LCBpbmRleCkgPT4ge1xuICAgICAgZmV0Y2goYC9jYXJ0LnBocD9hY3Rpb249YWRkJnByb2R1Y3RfaWQ9JHtwcm9kdWN0LmlkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSBwcm9kdWN0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gICBnZXQgc2hvcHBpbmcgY2FydCBpbmZvIGZyb20gYXBpXG4gIGdldENhcnRDb250ZW50cygpIHtcbiAgICBmZXRjaCgnL2FwaS9zdG9yZWZyb250L2NhcnRzJylcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuICB9XG5cbiAgLy8gZW5kIGFkZGVkIGJ5IEphbWVzXG5cbiAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgIGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgIH0sXG4gICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgfTtcblxuICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKFxuICAgICAgcmVxdWVzdE9wdGlvbnMsXG4gICAgICAoY29udGVudCkgPT4ge1xuICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTAwXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9