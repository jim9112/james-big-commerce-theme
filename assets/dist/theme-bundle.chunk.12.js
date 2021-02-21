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
    var productList = this.context.currentCategoryProducts;
    this.deleteButtonToggle(); // add event listener to add all button

    document.querySelector('.addAllToCart').addEventListener('click', function () {
      _this2.addAllProducts(productList);
    }); // add event listener to delete cart

    document.querySelector('.deleteCart').addEventListener('click', function () {
      _this2.deleteCartContents();
    }); // add event listener for image

    document.querySelectorAll('.card-image').forEach(function (picture, index) {
      picture.addEventListener('mouseover', function (e) {
        var thumbNail = e.target;
        var picList = productList[index].images;
        console.log(picList);
        thumbNail.src = picList[1].data;
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJvblJlYWR5IiwicHJvZHVjdExpc3QiLCJjdXJyZW50Q2F0ZWdvcnlQcm9kdWN0cyIsImRlbGV0ZUJ1dHRvblRvZ2dsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRBbGxQcm9kdWN0cyIsImRlbGV0ZUNhcnRDb250ZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicGljdHVyZSIsImluZGV4IiwiZSIsInRodW1iTmFpbCIsInRhcmdldCIsInBpY0xpc3QiLCJpbWFnZXMiLCJjb25zb2xlIiwibG9nIiwic3JjIiwiZGF0YSIsIiQiLCJvbiIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiYXR0ciIsInJvbGUiLCJjb21wYXJlUHJvZHVjdHMiLCJ1cmxzIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwicHJvZHVjdHMiLCJwcm9kdWN0IiwiZmV0Y2giLCJpZCIsIm1ldGhvZCIsInRoZW4iLCJsb2NhdGlvbiIsInJlbG9hZCIsImVyciIsImVycm9yIiwicmVzIiwianNvbiIsImRlbGV0ZUJ1dHRvbiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsImZvY3VzIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIkNhdGFsb2dQYWdlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJKU09OIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkEsUTs7O0FBQ25CLG9CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLG9DQUFNQSxPQUFO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Q29EbkcsT0FEcEQsQ0FDbEJtRyxnQ0FEa0I7QUFBQSxNQUNnQkMsK0JBRGhCLEdBQ29EcEcsT0FEcEQsQ0FDZ0JvRywrQkFEaEI7QUFFcEQsTUFBTUMsZ0JBQWdCLEdBQUdQLHNCQUFzQixDQUFDSSx3QkFBRCxFQUEyQkMsZ0NBQTNCLEVBQTZEQywrQkFBN0QsQ0FBL0M7QUFDQSxNQUFNRSxhQUFhLEdBQUdWLE1BQU0sQ0FBQ1csTUFBUCxDQUFjRixnQkFBZ0IsQ0FBQ1osWUFBRCxDQUE5QixDQUF0QjtBQUNBLE1BQU1lLGVBQWUsR0FBR1osTUFBTSxDQUFDQyxJQUFQLENBQVlRLGdCQUFnQixDQUFDWixZQUFELENBQTVCLEVBQTRDZ0IsR0FBNUMsQ0FBZ0QsVUFBQUMsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLEdBQVYsRUFBZUMsR0FBZixFQUFKO0FBQUEsR0FBbkQsQ0FBeEI7QUFFQSxTQUFPSixlQUFlLENBQUNLLE1BQWhCLENBQXVCLFVBQUNDLEdBQUQsRUFBTUosR0FBTixFQUFXWCxDQUFYLEVBQWlCO0FBQzNDZSxPQUFHLENBQUNKLEdBQUQsQ0FBSCxHQUFXSixhQUFhLENBQUNQLENBQUQsQ0FBeEI7QUFDQSxXQUFPZSxHQUFQO0FBQ0gsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgIHN1cGVyKGNvbnRleHQpO1xuICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIC8vIGFkZGVkIGJ5IEphbWVzXG4gICAgY29uc3QgcHJvZHVjdExpc3QgPSB0aGlzLmNvbnRleHQuY3VycmVudENhdGVnb3J5UHJvZHVjdHM7XG5cbiAgICB0aGlzLmRlbGV0ZUJ1dHRvblRvZ2dsZSgpO1xuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBhbGwgYnV0dG9uXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZEFsbFRvQ2FydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGRBbGxQcm9kdWN0cyhwcm9kdWN0TGlzdCk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgdG8gZGVsZXRlIGNhcnRcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlQ2FydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5kZWxldGVDYXJ0Q29udGVudHMoKTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciBmb3IgaW1hZ2VcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZC1pbWFnZScpLmZvckVhY2goKHBpY3R1cmUsIGluZGV4KSA9PiB7XG4gICAgICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRodW1iTmFpbCA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCBwaWNMaXN0ID0gcHJvZHVjdExpc3RbaW5kZXhdLmltYWdlcztcbiAgICAgICAgY29uc29sZS5sb2cocGljTGlzdCk7XG4gICAgICAgIHRodW1iTmFpbC5zcmMgPSBwaWNMaXN0WzFdLmRhdGE7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGVuZCBhZGRlZCBieSBKYW1lc1xuXG4gICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLmF0dHIoe1xuICAgICAgICByb2xlOiAnc3RhdHVzJyxcbiAgICAgICAgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0LnVybHMpO1xuXG4gICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLmF0dHIoe1xuICAgICAgICByb2xlOiAnc3RhdHVzJyxcbiAgICAgICAgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKCk7XG4gIH1cblxuICAvLyAgIGFkZGVkIGJ5IEphbWVzXG5cbiAgLy8gICBhZGQgYWxsIHByb2plY3RzIHRvIHVzZXJzIHNob3BwaW5nIGNhcnRcbiAgYWRkQWxsUHJvZHVjdHMocHJvZHVjdHMpIHtcbiAgICBjb25zb2xlLmxvZyhwcm9kdWN0cyk7XG4gICAgcHJvZHVjdHMuZm9yRWFjaCgocHJvZHVjdCwgaW5kZXgpID0+IHtcbiAgICAgIGZldGNoKGAvY2FydC5waHA/YWN0aW9uPWFkZCZwcm9kdWN0X2lkPSR7cHJvZHVjdC5pZH1gLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gcHJvZHVjdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICAgZGVsZXRlIHNob3BwaW5nIGNhcnQgYW5kIGNvbnRlbnRzXG4gIGRlbGV0ZUNhcnRDb250ZW50cygpIHtcbiAgICBsZXQgaWQ7XG4gICAgZmV0Y2goJy9hcGkvc3RvcmVmcm9udC9jYXJ0cy8nKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiAoaWQgPSBkYXRhWzBdLmlkKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgZmV0Y2goYC9hcGkvc3RvcmVmcm9udC9jYXJ0cy8ke2lkfWAsIHtcbiAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gICBzZXQgYnV0dG9uIHN0YXRlIGZvciBkZWxldGUgYWxsIGJ1dHRvblxuICBkZWxldGVCdXR0b25Ub2dnbGUoKSB7XG4gICAgZmV0Y2goJy9hcGkvc3RvcmVmcm9udC9jYXJ0cy8nKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGVDYXJ0Jyk7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjdXN0b21IaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY3VzdG9tSGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gZW5kIGFkZGVkIGJ5IEphbWVzXG5cbiAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgIGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgIH0sXG4gICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG4gICAgfTtcblxuICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKFxuICAgICAgcmVxdWVzdE9wdGlvbnMsXG4gICAgICAoY29udGVudCkgPT4ge1xuICAgICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMTAwXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9