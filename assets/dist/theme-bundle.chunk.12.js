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
      document.querySelector('.customAlert').classList.add('customHidden');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJvblJlYWR5IiwicHJvZHVjdExpc3QiLCJjdXJyZW50Q2F0ZWdvcnlQcm9kdWN0cyIsImRlbGV0ZUJ1dHRvblRvZ2dsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRBbGxQcm9kdWN0cyIsImRlbGV0ZUNhcnRDb250ZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicGljdHVyZSIsImluZGV4IiwiZSIsInBpY3R1cmVUb2dnbGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJsb2NhdGlvbiIsInJlbG9hZCIsIiQiLCJvbiIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiYXR0ciIsInJvbGUiLCJjb21wYXJlUHJvZHVjdHMiLCJ1cmxzIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwicHJvZHVjdHMiLCJjb25zb2xlIiwibG9nIiwicHJvZHVjdCIsImZldGNoIiwiaWQiLCJtZXRob2QiLCJ0aGVuIiwicmVtb3ZlIiwiZXJyIiwiZXJyb3IiLCJyZXMiLCJqc29uIiwiZGF0YSIsImRlbGV0ZUJ1dHRvbiIsInBpY0xpc3QiLCJpbWFnZXMiLCJpbWdVcmwiLCJpbm5lckhUTUwiLCJyZXBsYWNlIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiZm9jdXMiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxROzs7QUFDbkIsb0JBQVlDLE9BQVosRUFBcUI7QUFB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QUFDSyxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1KLEdBQU4sRUFBV1gsQ0FBWCxFQUFpQjtBQUMzQ2UsT0FBRyxDQUFDSixHQUFELENBQUgsR0FBV0osYUFBYSxDQUFDUCxDQUFELENBQXhCO0FBQ0EsV0FBT2UsR0FBUDtBQUNILEdBSE0sRUFHSixFQUhJLENBQVA7QUFJSCxDQVZNLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICBzdXBlcihjb250ZXh0KTtcbiAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICAvLyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIGFkZGVkIGJ5IEphbWVzXG4gICAgY29uc3QgcHJvZHVjdExpc3QgPSB0aGlzLmNvbnRleHQuY3VycmVudENhdGVnb3J5UHJvZHVjdHM7XG5cbiAgICAvLyBzZXQgdmlzaWJpbGl0eSBvZiBkZWxldGUgYWxsIGJ1dHRvblxuICAgIHRoaXMuZGVsZXRlQnV0dG9uVG9nZ2xlKCk7XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIGFsbCBidXR0b25cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkQWxsVG9DYXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkZEFsbFByb2R1Y3RzKHByb2R1Y3RMaXN0KTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBkZWxldGUgY2FydFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGVDYXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmRlbGV0ZUNhcnRDb250ZW50cygpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBpbWFnZVxuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQtaW1nLWNvbnRhaW5lcicpXG4gICAgICAuZm9yRWFjaCgocGljdHVyZSwgaW5kZXgpID0+IHtcbiAgICAgICAgcGljdHVyZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGljdHVyZVRvZ2dsZShwaWN0dXJlLCBpbmRleCwgcHJvZHVjdExpc3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgZm9yIGN1c3RvbSBhbGVydCBjbG9zZSBidXR0b25cbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b21DbG9zZUJ1dHRvbicpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b21BbGVydCcpLmNsYXNzTGlzdC5hZGQoJ2N1c3RvbUhpZGRlbicpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgLy8gZW5kIGFkZGVkIGJ5IEphbWVzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKS5hdHRyKHtcbiAgICAgICAgcm9sZTogJ3N0YXR1cycsXG4gICAgICAgICdhcmlhLWxpdmUnOiAncG9saXRlJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dC51cmxzKTtcblxuICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgJCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKS5hdHRyKHtcbiAgICAgICAgcm9sZTogJ3N0YXR1cycsXG4gICAgICAgICdhcmlhLWxpdmUnOiAncG9saXRlJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuICB9XG5cbiAgLy8gICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAgIGFkZGVkIGJ5IEphbWVzXG5cbiAgLy8gICBhZGQgYWxsIHByb2plY3RzIHRvIHVzZXJzIHNob3BwaW5nIGNhcnRcbiAgYWRkQWxsUHJvZHVjdHMocHJvZHVjdHMpIHtcbiAgICBjb25zb2xlLmxvZyhwcm9kdWN0cyk7XG4gICAgcHJvZHVjdHMuZm9yRWFjaCgocHJvZHVjdCwgaW5kZXgpID0+IHtcbiAgICAgIGZldGNoKGAvY2FydC5waHA/YWN0aW9uPWFkZCZwcm9kdWN0X2lkPSR7cHJvZHVjdC5pZH1gLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gcHJvZHVjdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b21BbGVydCcpXG4gICAgICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKCdjdXN0b21IaWRkZW4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gICBkZWxldGUgc2hvcHBpbmcgY2FydCBhbmQgY29udGVudHNcbiAgZGVsZXRlQ2FydENvbnRlbnRzKCkge1xuICAgIGxldCBpZDtcbiAgICBmZXRjaCgnL2FwaS9zdG9yZWZyb250L2NhcnRzLycpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IChpZCA9IGRhdGFbMF0uaWQpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBmZXRjaChgL2FwaS9zdG9yZWZyb250L2NhcnRzLyR7aWR9YCwge1xuICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tQWxlcnQnKS5jbGFzc0xpc3QucmVtb3ZlKCdjdXN0b21IaWRkZW4nKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gICBzZXQgYnV0dG9uIHN0YXRlIGZvciBkZWxldGUgYWxsIGJ1dHRvblxuICBkZWxldGVCdXR0b25Ub2dnbGUoKSB7XG4gICAgZmV0Y2goJy9hcGkvc3RvcmVmcm9udC9jYXJ0cy8nKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGVDYXJ0Jyk7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjdXN0b21IaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY3VzdG9tSGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gICB0b2dnbGUgcGljdHVyZSB3aXRoIG1vdXNlb3ZlclxuICBwaWN0dXJlVG9nZ2xlKHBpY3R1cmUsIGluZGV4LCBwcm9kdWN0TGlzdCkge1xuICAgIGNvbnN0IHBpY0xpc3QgPSBwcm9kdWN0TGlzdFtpbmRleF0uaW1hZ2VzO1xuICAgIGNvbnN0IGltZ1VybCA9IHBpY0xpc3RbMV0uZGF0YTtcbiAgICBwaWN0dXJlLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwiY2FyZC1pbWFnZSBsYXl6eWF1dG9zaXplcyBsYXl6eWxvYWRlZFwiIHNyYz1cIiR7aW1nVXJsLnJlcGxhY2UoXG4gICAgICAnezpzaXplfScsXG4gICAgICAnNTAweDY1OSdcbiAgICApfVwiPmA7XG4gIH1cbiAgLy8gZW5kIGFkZGVkIGJ5IEphbWVzXG4gIC8vICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICBjb25zdCAkbm9Qcm9kdWN0c01lc3NhZ2UgPSAkKCdbZGF0YS1uby1wcm9kdWN0cy1ub3RpZmljYXRpb25dJyk7XG4gICAgaWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcbiAgICAgICRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XG4gICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuICAgICAgfSxcbiAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICB9O1xuXG4gICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2goXG4gICAgICByZXF1ZXN0T3B0aW9ucyxcbiAgICAgIChjb250ZW50KSA9PiB7XG4gICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxMDBcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=