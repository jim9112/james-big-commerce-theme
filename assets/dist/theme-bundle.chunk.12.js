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
    var productList = this.context.currentCategoryProducts; // add event listener to add all button

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJvblJlYWR5IiwicHJvZHVjdExpc3QiLCJjdXJyZW50Q2F0ZWdvcnlQcm9kdWN0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRBbGxQcm9kdWN0cyIsImRlbGV0ZUNhcnRDb250ZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicGljdHVyZSIsImluZGV4IiwiZSIsInRodW1iTmFpbCIsInRhcmdldCIsInBpY0xpc3QiLCJpbWFnZXMiLCJjb25zb2xlIiwibG9nIiwic3JjIiwiZGF0YSIsIiQiLCJvbiIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiYXR0ciIsInJvbGUiLCJjb21wYXJlUHJvZHVjdHMiLCJ1cmxzIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwicHJvZHVjdHMiLCJwcm9kdWN0IiwiZmV0Y2giLCJpZCIsIm1ldGhvZCIsInRoZW4iLCJsb2NhdGlvbiIsInJlbG9hZCIsImVyciIsImVycm9yIiwicmVzIiwianNvbiIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsImZvY3VzIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIkNhdGFsb2dQYWdlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJKU09OIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkEsUTs7O0FBQ25CLG9CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLG9DQUFNQSxPQUFOO0FBQ0EsVUFBS0Msb0JBQUwsR0FBNEJDLDBHQUEyQixDQUFDRixPQUFELENBQXZEO0FBRm1CO0FBR3BCOzs7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Q0osR0FBRCxDQUFILEdBQVdKLGFBQWEsQ0FBQ1AsQ0FBRCxDQUF4QjtBQUNBLFdBQU9lLEdBQVA7QUFDSCxHQUhNLEVBR0osRUFISSxDQUFQO0FBSUgsQ0FWTSxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgfVxuXG4gIG9uUmVhZHkoKSB7XG4gICAgLy8gYWRkZWQgYnkgSmFtZXNcbiAgICBjb25zdCBwcm9kdWN0TGlzdCA9IHRoaXMuY29udGV4dC5jdXJyZW50Q2F0ZWdvcnlQcm9kdWN0cztcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgYWxsIGJ1dHRvblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRBbGxUb0NhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuYWRkQWxsUHJvZHVjdHMocHJvZHVjdExpc3QpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGRlbGV0ZSBjYXJ0XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZUNhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuZGVsZXRlQ2FydENvbnRlbnRzKCk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGltYWdlXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQtaW1hZ2UnKS5mb3JFYWNoKChwaWN0dXJlLCBpbmRleCkgPT4ge1xuICAgICAgcGljdHVyZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0aHVtYk5haWwgPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3QgcGljTGlzdCA9IHByb2R1Y3RMaXN0W2luZGV4XS5pbWFnZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHBpY0xpc3QpO1xuICAgICAgICB0aHVtYk5haWwuc3JjID0gcGljTGlzdFsxXS5kYXRhO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBlbmQgYWRkZWQgYnkgSmFtZXNcblxuICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKS5hdHRyKHtcbiAgICAgICAgcm9sZTogJ3N0YXR1cycsXG4gICAgICAgICdhcmlhLWxpdmUnOiAncG9saXRlJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dC51cmxzKTtcblxuICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgJCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKS5hdHRyKHtcbiAgICAgICAgcm9sZTogJ3N0YXR1cycsXG4gICAgICAgICdhcmlhLWxpdmUnOiAncG9saXRlJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuICB9XG5cbiAgLy8gICBhZGRlZCBieSBKYW1lc1xuXG4gIC8vICAgYWRkIGFsbCBwcm9qZWN0cyB0byB1c2VycyBzaG9wcGluZyBjYXJ0XG4gIGFkZEFsbFByb2R1Y3RzKHByb2R1Y3RzKSB7XG4gICAgY29uc29sZS5sb2cocHJvZHVjdHMpO1xuICAgIHByb2R1Y3RzLmZvckVhY2goKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICBmZXRjaChgL2NhcnQucGhwP2FjdGlvbj1hZGQmcHJvZHVjdF9pZD0ke3Byb2R1Y3QuaWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IHByb2R1Y3RzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAgIGRlbGV0ZSBzaG9wcGluZyBjYXJ0IGFuZCBjb250ZW50c1xuICBkZWxldGVDYXJ0Q29udGVudHMoKSB7XG4gICAgbGV0IGlkO1xuICAgIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJylcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4gKGlkID0gZGF0YVswXS5pZCkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGZldGNoKGAvYXBpL3N0b3JlZnJvbnQvY2FydHMvJHtpZH1gLCB7XG4gICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIGVuZCBhZGRlZCBieSBKYW1lc1xuXG4gIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKTtcbiAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICBjb25maWc6IHtcbiAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICB9LFxuICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgIH07XG5cbiAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChcbiAgICAgIHJlcXVlc3RPcHRpb25zLFxuICAgICAgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==