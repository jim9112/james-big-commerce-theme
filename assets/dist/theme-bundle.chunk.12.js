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
        var picList = productList[index].images;
        console.log(e.currentTarget);
        var imgUrl = picList[1].data;
        picture.innerHTML = "<img class=\"card-image layzyautosizes layzyloaded\" src=\"" + imgUrl.replace('{:size}', '500x659') + "\">";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJvblJlYWR5IiwicHJvZHVjdExpc3QiLCJjdXJyZW50Q2F0ZWdvcnlQcm9kdWN0cyIsImRlbGV0ZUJ1dHRvblRvZ2dsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRBbGxQcm9kdWN0cyIsImRlbGV0ZUNhcnRDb250ZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwicGljdHVyZSIsImluZGV4IiwiZSIsInBpY0xpc3QiLCJpbWFnZXMiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFRhcmdldCIsImltZ1VybCIsImRhdGEiLCJpbm5lckhUTUwiLCJyZXBsYWNlIiwibG9jYXRpb24iLCJyZWxvYWQiLCIkIiwib24iLCJuZXh0IiwiYXR0ciIsInJvbGUiLCJjb21wYXJlUHJvZHVjdHMiLCJ1cmxzIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwicHJvZHVjdHMiLCJwcm9kdWN0IiwiZmV0Y2giLCJpZCIsIm1ldGhvZCIsInRoZW4iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJlcnIiLCJlcnJvciIsInJlcyIsImpzb24iLCJkZWxldGVCdXR0b24iLCJhZGQiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJmb2N1cyIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFcUJBLFE7OztBQUNuQixvQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixvQ0FBTUEsT0FBTjtBQUNBLFVBQUtDLG9CQUFMLEdBQTRCQywwR0FBMkIsQ0FBQ0YsT0FBRCxDQUF2RDtBQUZtQjtBQUdwQjs7OztTQUVERyxPLEdBQUEsbUJBQVU7QUFBQTs7QUFDUjtBQUNBO0FBQ0EsUUFBTUMsV0FBVyxHQUFHLEtBQUtKLE9BQUwsQ0FBYUssdUJBQWpDLENBSFEsQ0FLUjs7QUFDQSxTQUFLQyxrQkFBTCxHQU5RLENBUVI7O0FBQ0FDLFlBQVEsQ0FBQ0MsYUFBVCxDQUF1QixlQUF2QixFQUF3Q0MsZ0JBQXhDLENBQXlELE9BQXpELEVBQWtFLFlBQU07QUFDdEUsWUFBSSxDQUFDQyxjQUFMLENBQW9CTixXQUFwQjtBQUNELEtBRkQsRUFUUSxDQWFSOztBQUNBRyxZQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0NDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxZQUFNO0FBQ3BFLFlBQUksQ0FBQ0Usa0JBQUw7QUFDRCxLQUZELEVBZFEsQ0FrQlI7O0FBQ0FKLFlBQVEsQ0FDTEssZ0JBREgsQ0FDb0IscUJBRHBCLEVBRUdDLE9BRkgsQ0FFVyxVQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBb0I7QUFDM0JELGFBQU8sQ0FBQ0wsZ0JBQVIsQ0FBeUIsV0FBekIsRUFBc0MsVUFBQ08sQ0FBRCxFQUFPO0FBQzNDLFlBQU1DLE9BQU8sR0FBR2IsV0FBVyxDQUFDVyxLQUFELENBQVgsQ0FBbUJHLE1BQW5DO0FBQ0FDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZSixDQUFDLENBQUNLLGFBQWQ7QUFDQSxZQUFNQyxNQUFNLEdBQUdMLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV00sSUFBMUI7QUFDQVQsZUFBTyxDQUFDVSxTQUFSLG1FQUErRUYsTUFBTSxDQUFDRyxPQUFQLENBQzdFLFNBRDZFLEVBRTdFLFNBRjZFLENBQS9FO0FBSUQsT0FSRDtBQVNELEtBWkgsRUFuQlEsQ0FpQ1I7O0FBQ0FsQixZQUFRLENBQ0xDLGFBREgsQ0FDaUIsb0JBRGpCLEVBRUdDLGdCQUZILENBRW9CLE9BRnBCLEVBRTZCLFlBQU07QUFDL0JpQixjQUFRLENBQUNDLE1BQVQ7QUFDQSxhQUFPLEtBQVA7QUFDRCxLQUxILEVBbENRLENBd0NSO0FBQ0E7O0FBRUFDLEtBQUMsQ0FBQywrQkFBRCxDQUFELENBQW1DQyxFQUFuQyxDQUFzQyxPQUF0QyxFQUErQyxVQUFDYixDQUFELEVBQU87QUFDcERZLE9BQUMsQ0FBQ1osQ0FBQyxDQUFDSyxhQUFILENBQUQsQ0FBbUJTLElBQW5CLEdBQTBCQyxJQUExQixDQUErQjtBQUM3QkMsWUFBSSxFQUFFLFFBRHVCO0FBRTdCLHFCQUFhO0FBRmdCLE9BQS9CO0FBSUQsS0FMRDtBQU9BQyw0RUFBZSxDQUFDLEtBQUtqQyxPQUFMLENBQWFrQyxJQUFkLENBQWY7O0FBRUEsUUFBSU4sQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JPLE1BQXBCLEdBQTZCLENBQWpDLEVBQW9DO0FBQ2xDLFdBQUtDLGlCQUFMO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS0MsY0FBTCxHQUFzQixLQUFLQSxjQUFMLENBQW9CQyxJQUFwQixDQUF5QixJQUF6QixDQUF0QjtBQUNBQyxzRUFBSyxDQUFDVixFQUFOLENBQVMsa0JBQVQsRUFBNkIsS0FBS1EsY0FBbEM7QUFDRDs7QUFFRFQsS0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQkMsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBTTtBQUNqQ0QsT0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0JHLElBQXhCLENBQTZCO0FBQzNCQyxZQUFJLEVBQUUsUUFEcUI7QUFFM0IscUJBQWE7QUFGYyxPQUE3QjtBQUlELEtBTEQ7QUFPQSxTQUFLUSxvQkFBTDtBQUNELEcsQ0FFRDtBQUNBO0FBRUE7OztTQUNBOUIsYyxHQUFBLHdCQUFlK0IsUUFBZixFQUF5QjtBQUN2QnRCLFdBQU8sQ0FBQ0MsR0FBUixDQUFZcUIsUUFBWjtBQUNBQSxZQUFRLENBQUM1QixPQUFULENBQWlCLFVBQUM2QixPQUFELEVBQVUzQixLQUFWLEVBQW9CO0FBQ25DNEIsV0FBSyxzQ0FBb0NELE9BQU8sQ0FBQ0UsRUFBNUMsRUFBa0Q7QUFDckRDLGNBQU0sRUFBRTtBQUQ2QyxPQUFsRCxDQUFMLENBR0dDLElBSEgsQ0FHUSxZQUFNO0FBQ1YsWUFBSS9CLEtBQUssS0FBSzBCLFFBQVEsQ0FBQ04sTUFBVCxHQUFrQixDQUFoQyxFQUFtQztBQUNqQzVCLGtCQUFRLENBQ0xDLGFBREgsQ0FDaUIsY0FEakIsRUFFR3VDLFNBRkgsQ0FFYUMsTUFGYixDQUVvQixjQUZwQjtBQUdEO0FBQ0YsT0FUSCxXQVVTLFVBQUNDLEdBQUQ7QUFBQSxlQUFTOUIsT0FBTyxDQUFDK0IsS0FBUixDQUFjRCxHQUFkLENBQVQ7QUFBQSxPQVZUO0FBV0QsS0FaRDtBQWFELEcsQ0FFRDs7O1NBQ0F0QyxrQixHQUFBLDhCQUFxQjtBQUNuQixRQUFJaUMsRUFBSjtBQUNBRCxTQUFLLENBQUMsd0JBQUQsQ0FBTCxDQUNHRyxJQURILENBQ1EsVUFBQ0ssR0FBRDtBQUFBLGFBQVNBLEdBQUcsQ0FBQ0MsSUFBSixFQUFUO0FBQUEsS0FEUixFQUVHTixJQUZILENBRVEsVUFBQ3ZCLElBQUQ7QUFBQSxhQUFXcUIsRUFBRSxHQUFHckIsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRcUIsRUFBeEI7QUFBQSxLQUZSLEVBR0dFLElBSEgsQ0FHUSxZQUFNO0FBQ1ZILFdBQUssNEJBQTBCQyxFQUExQixFQUFnQztBQUNuQ0MsY0FBTSxFQUFFO0FBRDJCLE9BQWhDLENBQUw7QUFHQXRDLGNBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixFQUF1Q3VDLFNBQXZDLENBQWlEQyxNQUFqRCxDQUF3RCxjQUF4RDtBQUNELEtBUkg7QUFTRCxHLENBRUQ7OztTQUNBMUMsa0IsR0FBQSw4QkFBcUI7QUFDbkJxQyxTQUFLLENBQUMsd0JBQUQsQ0FBTCxDQUNHRyxJQURILENBQ1EsVUFBQ0ssR0FBRDtBQUFBLGFBQVNBLEdBQUcsQ0FBQ0MsSUFBSixFQUFUO0FBQUEsS0FEUixFQUVHTixJQUZILENBRVEsVUFBQ3ZCLElBQUQsRUFBVTtBQUNkLFVBQU04QixZQUFZLEdBQUc5QyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBckI7O0FBQ0EsVUFBSWUsSUFBSSxDQUFDWSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCa0Isb0JBQVksQ0FBQ04sU0FBYixDQUF1Qk8sR0FBdkIsQ0FBMkIsY0FBM0I7QUFDRCxPQUZELE1BRU87QUFDTEQsb0JBQVksQ0FBQ04sU0FBYixDQUF1QkMsTUFBdkIsQ0FBOEIsY0FBOUI7QUFDRDtBQUNGLEtBVEg7QUFVRCxHLENBRUQ7QUFDQTs7O1NBQ0FSLG9CLEdBQUEsZ0NBQXVCO0FBQ3JCLFFBQU1lLGtCQUFrQixHQUFHM0IsQ0FBQyxDQUFDLGlDQUFELENBQTVCOztBQUNBLFFBQUkyQixrQkFBa0IsQ0FBQ3BCLE1BQXZCLEVBQStCO0FBQzdCb0Isd0JBQWtCLENBQUNDLEtBQW5CO0FBQ0Q7QUFDRixHOztTQUVEcEIsaUIsR0FBQSw2QkFBb0I7QUFBQSxnQ0FPZCxLQUFLbkMsb0JBUFM7QUFBQSxRQUVNd0QsZUFGTix5QkFFaEJDLG9CQUZnQjtBQUFBLFFBR01DLGVBSE4seUJBR2hCQyxvQkFIZ0I7QUFBQSxRQUlPQyxrQkFKUCx5QkFJaEJDLHFCQUpnQjtBQUFBLFFBS09DLGtCQUxQLHlCQUtoQkMscUJBTGdCO0FBQUEsUUFNS0MsY0FOTCx5QkFNaEJDLG1CQU5nQjtBQVFsQixRQUFNQyx3QkFBd0IsR0FBR3ZDLENBQUMsQ0FBQyw0QkFBRCxDQUFsQztBQUNBLFFBQU13Qyx1QkFBdUIsR0FBR3hDLENBQUMsQ0FBQywyQkFBRCxDQUFqQztBQUNBLFFBQU15QyxlQUFlLEdBQUcsS0FBS3JFLE9BQUwsQ0FBYXNFLHVCQUFyQztBQUNBLFFBQU1DLGNBQWMsR0FBRztBQUNyQkMsWUFBTSxFQUFFO0FBQ05DLGdCQUFRLEVBQUU7QUFDUkMsdUJBQWEsRUFBRSxJQURQO0FBRVJqQyxrQkFBUSxFQUFFO0FBQ1JrQyxpQkFBSyxFQUFFTjtBQURDO0FBRkY7QUFESixPQURhO0FBU3JCTyxjQUFRLEVBQUU7QUFDUkMsc0JBQWMsRUFBRSwwQkFEUjtBQUVSQyxlQUFPLEVBQUU7QUFGRCxPQVRXO0FBYXJCQyxjQUFRLEVBQUU7QUFiVyxLQUF2QjtBQWdCQSxTQUFLQyxhQUFMLEdBQXFCLElBQUlDLDhEQUFKLENBQ25CVixjQURtQixFQUVuQixVQUFDVyxPQUFELEVBQWE7QUFDWGYsOEJBQXdCLENBQUNnQixJQUF6QixDQUE4QkQsT0FBTyxDQUFDTCxjQUF0QztBQUNBVCw2QkFBdUIsQ0FBQ2UsSUFBeEIsQ0FBNkJELE9BQU8sQ0FBQ0osT0FBckM7QUFFQWxELE9BQUMsQ0FBQyxNQUFELENBQUQsQ0FBVXdELGNBQVYsQ0FBeUIsY0FBekI7QUFFQXhELE9BQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0J5RCxPQUFoQixDQUNFO0FBQ0VDLGlCQUFTLEVBQUU7QUFEYixPQURGLEVBSUUsR0FKRjtBQU1ELEtBZGtCLEVBZW5CO0FBQ0VDLDZCQUF1QixFQUFFO0FBQ3ZCOUIsdUJBQWUsRUFBZkEsZUFEdUI7QUFFdkJFLHVCQUFlLEVBQWZBLGVBRnVCO0FBR3ZCRSwwQkFBa0IsRUFBbEJBLGtCQUh1QjtBQUl2QkUsMEJBQWtCLEVBQWxCQSxrQkFKdUI7QUFLdkJFLHNCQUFjLEVBQWRBO0FBTHVCO0FBRDNCLEtBZm1CLENBQXJCO0FBeUJELEc7OztFQXpMbUN1QixnRDs7Ozs7Ozs7Ozs7Ozs7O0FDTnRDO0FBQUE7QUFBQSxJQUFNQyxZQUFZLEdBQUcsY0FBckI7O0FBQ0EsSUFBTUMsK0JBQStCLEdBQUcsU0FBbENBLCtCQUFrQyxDQUFDQyxVQUFEO0FBQUEsU0FBZ0IsQ0FBQyxDQUFDQyxNQUFNLENBQUNDLElBQVAsQ0FBWUYsVUFBVSxDQUFDRixZQUFELENBQXRCLEVBQXNDdEQsTUFBeEQ7QUFBQSxDQUF4Qzs7QUFDQSxJQUFNMkQsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixHQUEyQjtBQUN0RCxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsVUFBbUI1RCxNQUF2QyxFQUErQzRELENBQUMsRUFBaEQsRUFBb0Q7QUFDaEQsUUFBTUosVUFBVSxHQUFHSyxJQUFJLENBQUNDLEtBQUwsQ0FBOEJGLENBQTlCLDRCQUE4QkEsQ0FBOUIseUJBQThCQSxDQUE5QixFQUFuQjs7QUFDQSxRQUFJTCwrQkFBK0IsQ0FBQ0MsVUFBRCxDQUFuQyxFQUFpRDtBQUM3QyxhQUFPQSxVQUFQO0FBQ0g7QUFDSjtBQUNKLENBUEQ7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLElBQU16RiwyQkFBMkIsR0FBRyxTQUE5QkEsMkJBQThCLENBQUNGLE9BQUQsRUFBYTtBQUFBLE1BQzVDa0csd0JBRDRDLEdBQ29EbEcsT0FEcEQsQ0FDNUNrRyx3QkFENEM7QUFBQSxNQUNsQkMsZ0NBRGtCLEdBQ29EbkcsT0FEcEQsQ0FDbEJtRyxnQ0FEa0I7QUFBQSxNQUNnQkMsK0JBRGhCLEdBQ29EcEcsT0FEcEQsQ0FDZ0JvRywrQkFEaEI7QUFFcEQsTUFBTUMsZ0JBQWdCLEdBQUdQLHNCQUFzQixDQUFDSSx3QkFBRCxFQUEyQkMsZ0NBQTNCLEVBQTZEQywrQkFBN0QsQ0FBL0M7QUFDQSxNQUFNRSxhQUFhLEdBQUdWLE1BQU0sQ0FBQ1csTUFBUCxDQUFjRixnQkFBZ0IsQ0FBQ1osWUFBRCxDQUE5QixDQUF0QjtBQUNBLE1BQU1lLGVBQWUsR0FBR1osTUFBTSxDQUFDQyxJQUFQLENBQVlRLGdCQUFnQixDQUFDWixZQUFELENBQTVCLEVBQTRDZ0IsR0FBNUMsQ0FBZ0QsVUFBQUMsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLEdBQVYsRUFBZUMsR0FBZixFQUFKO0FBQUEsR0FBbkQsQ0FBeEI7QUFFQSxTQUFPSixlQUFlLENBQUNLLE1BQWhCLENBQXVCLFVBQUNDLEdBQUQsRUFBTUosR0FBTixFQUFXWCxDQUFYLEVBQWlCO0FBQzNDZSxPQUFHLENBQUNKLEdBQUQsQ0FBSCxHQUFXSixhQUFhLENBQUNQLENBQUQsQ0FBeEI7QUFDQSxXQUFPZSxHQUFQO0FBQ0gsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgIHN1cGVyKGNvbnRleHQpO1xuICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIC8vICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gYWRkZWQgYnkgSmFtZXNcbiAgICBjb25zdCBwcm9kdWN0TGlzdCA9IHRoaXMuY29udGV4dC5jdXJyZW50Q2F0ZWdvcnlQcm9kdWN0cztcblxuICAgIC8vIHNldCB2aXNpYmlsaXR5IG9mIGRlbGV0ZSBhbGwgYnV0dG9uXG4gICAgdGhpcy5kZWxldGVCdXR0b25Ub2dnbGUoKTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgYWxsIGJ1dHRvblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRBbGxUb0NhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuYWRkQWxsUHJvZHVjdHMocHJvZHVjdExpc3QpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGRlbGV0ZSBjYXJ0XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZUNhcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuZGVsZXRlQ2FydENvbnRlbnRzKCk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGltYWdlXG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZC1pbWctY29udGFpbmVyJylcbiAgICAgIC5mb3JFYWNoKChwaWN0dXJlLCBpbmRleCkgPT4ge1xuICAgICAgICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGljTGlzdCA9IHByb2R1Y3RMaXN0W2luZGV4XS5pbWFnZXM7XG4gICAgICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICBjb25zdCBpbWdVcmwgPSBwaWNMaXN0WzFdLmRhdGE7XG4gICAgICAgICAgcGljdHVyZS5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImNhcmQtaW1hZ2UgbGF5enlhdXRvc2l6ZXMgbGF5enlsb2FkZWRcIiBzcmM9XCIke2ltZ1VybC5yZXBsYWNlKFxuICAgICAgICAgICAgJ3s6c2l6ZX0nLFxuICAgICAgICAgICAgJzUwMHg2NTknXG4gICAgICAgICAgKX1cIj5gO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgZm9yIGN1c3RvbSBhbGVydCBjbG9zZSBidXR0b25cbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b21DbG9zZUJ1dHRvbicpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAvLyBlbmQgYWRkZWQgYnkgSmFtZXNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLmF0dHIoe1xuICAgICAgICByb2xlOiAnc3RhdHVzJyxcbiAgICAgICAgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0LnVybHMpO1xuXG4gICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLmF0dHIoe1xuICAgICAgICByb2xlOiAnc3RhdHVzJyxcbiAgICAgICAgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKCk7XG4gIH1cblxuICAvLyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vICAgYWRkZWQgYnkgSmFtZXNcblxuICAvLyAgIGFkZCBhbGwgcHJvamVjdHMgdG8gdXNlcnMgc2hvcHBpbmcgY2FydFxuICBhZGRBbGxQcm9kdWN0cyhwcm9kdWN0cykge1xuICAgIGNvbnNvbGUubG9nKHByb2R1Y3RzKTtcbiAgICBwcm9kdWN0cy5mb3JFYWNoKChwcm9kdWN0LCBpbmRleCkgPT4ge1xuICAgICAgZmV0Y2goYC9jYXJ0LnBocD9hY3Rpb249YWRkJnByb2R1Y3RfaWQ9JHtwcm9kdWN0LmlkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSBwcm9kdWN0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLmN1c3RvbUFsZXJ0JylcbiAgICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ2N1c3RvbUhpZGRlbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAgIGRlbGV0ZSBzaG9wcGluZyBjYXJ0IGFuZCBjb250ZW50c1xuICBkZWxldGVDYXJ0Q29udGVudHMoKSB7XG4gICAgbGV0IGlkO1xuICAgIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJylcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4gKGlkID0gZGF0YVswXS5pZCkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGZldGNoKGAvYXBpL3N0b3JlZnJvbnQvY2FydHMvJHtpZH1gLCB7XG4gICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b21BbGVydCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2N1c3RvbUhpZGRlbicpO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyAgIHNldCBidXR0b24gc3RhdGUgZm9yIGRlbGV0ZSBhbGwgYnV0dG9uXG4gIGRlbGV0ZUJ1dHRvblRvZ2dsZSgpIHtcbiAgICBmZXRjaCgnL2FwaS9zdG9yZWZyb250L2NhcnRzLycpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZUNhcnQnKTtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2N1c3RvbUhpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjdXN0b21IaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvLyBlbmQgYWRkZWQgYnkgSmFtZXNcbiAgLy8gICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuICAgIGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKTtcbiAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICBjb25maWc6IHtcbiAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICB9LFxuICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgIH07XG5cbiAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChcbiAgICAgIHJlcXVlc3RPcHRpb25zLFxuICAgICAgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==