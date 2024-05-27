/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/single-product-script/index.js":
/*!***********************************************!*\
  !*** ./src/js/single-product-script/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _single_product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./single-product.js */ \"./src/js/single-product-script/single-product.js\");\n\ncustomElements.define('single-product', _single_product_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://my-webpack-project/./src/js/single-product-script/index.js?");

/***/ }),

/***/ "./src/js/single-product-script/single-product.js":
/*!********************************************************!*\
  !*** ./src/js/single-product-script/single-product.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SingleProduct)\n/* harmony export */ });\nclass SingleProduct extends HTMLElement {\n  constructor() {\n    super();\n    this.product = {\n      \"variants\": window.productData.variants,\n      \"options\": window.productData.options\n    };\n    this.productId = window.productData.productId;\n    this.availableColors = this.getAvailableColors();\n  }\n  connectedCallback() {\n    document.addEventListener('DOMContentLoaded', () => {\n      this.initializeOptionSelectors();\n      this.showDefaultColorImages();\n      this.initializeColorSwatchHover();\n      this.initializeProductMediaHover();\n    });\n\n    // Listen for the variant change event\n    document.addEventListener('variant:change', this.handleVariantChange.bind(this));\n  }\n  getAvailableColors() {\n    const colorLabels = document.querySelectorAll('.opt-label--swatch .js-value');\n    return Array.from(colorLabels).map(label => label.textContent.toLowerCase());\n  }\n  initializeOptionSelectors() {\n    const optionSelectors = this.querySelectorAll('.js-option');\n    optionSelectors.forEach(selector => {\n      selector.addEventListener('change', this.handleOptionChange.bind(this));\n    });\n  }\n  handleOptionChange() {\n    const selectedOptions = Array.from(this.querySelectorAll('.js-option:checked')).map(input => {\n      const name = input.name.split('-option')[0].split('-').slice(-1)[0];\n      return {\n        name: name.charAt(0).toUpperCase() + name.slice(1),\n        value: input.value\n      };\n    });\n    const variant = this.findVariant(selectedOptions);\n    const selectedColor = selectedOptions.find(option => option.name.toLowerCase() === 'color').value;\n    if (variant) {\n      this.updateProductDetails(variant, selectedColor);\n    }\n  }\n  handleVariantChange(event) {\n    const variant = event.detail.variant;\n    const selectedColor = variant.options.find(option => option.toLowerCase() === 'color');\n    this.updateProductDetails(variant, selectedColor);\n  }\n  findVariant(selectedOptions) {\n    const variant = this.product.variants.find(variant => {\n      return selectedOptions.every(option => {\n        const optionIndex = this.product.options.indexOf(option.name);\n        return variant.options[optionIndex] === option.value;\n      });\n    });\n    return variant;\n  }\n  updateProductDetails(variant, selectedColor) {\n    this.updateProductImage(selectedColor);\n    this.updateProductPrice(variant.price);\n    this.updateProductAvailability(variant.available);\n  }\n  updateProductImage(selectedColor) {\n    const productMediaItems = this.querySelectorAll('.product-media-collage__item');\n    productMediaItems.forEach(item => {\n      const img = item.querySelector('img');\n      if (img && img.alt.toLowerCase() === selectedColor.toLowerCase()) {\n        item.style.display = 'block';\n        item.classList.add('is-active');\n      } else {\n        item.style.display = 'none';\n        item.classList.remove('is-active');\n      }\n    });\n  }\n  updateProductPrice(price) {\n    const productPriceCurrentElement = this.querySelector('.price__current');\n    if (productPriceCurrentElement) {\n      productPriceCurrentElement.textContent = `$${(price / 100).toFixed(2)}`;\n    }\n  }\n  updateProductAvailability(available) {\n    const productAvailabilityElement = this.querySelector('.product-availability');\n    if (productAvailabilityElement) {\n      productAvailabilityElement.textContent = available ? 'In Stock' : 'Out of Stock';\n    }\n  }\n  showDefaultColorImages() {\n    const defaultColorInput = this.querySelector('.js-option[checked]');\n    if (defaultColorInput) {\n      const defaultColor = defaultColorInput.value;\n      this.updateProductImage(defaultColor);\n    }\n  }\n  initializeColorSwatchHover() {\n    const swatchLabels = document.querySelectorAll('.opt-label--swatch');\n    swatchLabels.forEach(label => {\n      label.addEventListener('mouseenter', this.showTooltip);\n      label.addEventListener('mouseleave', this.hideTooltip);\n    });\n  }\n  showTooltip(event) {\n    const label = event.currentTarget;\n    const colorName = label.querySelector('.js-value').textContent;\n    let tooltip = label.querySelector('.color-tooltip');\n    if (!tooltip) {\n      tooltip = document.createElement('div');\n      tooltip.className = 'color-tooltip';\n      tooltip.textContent = colorName;\n      label.appendChild(tooltip);\n    }\n    tooltip.style.display = 'block';\n  }\n  hideTooltip(event) {\n    const label = event.currentTarget;\n    const tooltip = label.querySelector('.color-tooltip');\n    if (tooltip) {\n      tooltip.style.display = 'none';\n    }\n  }\n  initializeProductMediaHover() {\n    const productMediaItems = this.querySelectorAll('.product-media--image');\n    productMediaItems.forEach(item => {\n      item.addEventListener('mouseenter', this.handleMediaHover.bind(this));\n      item.addEventListener('mouseleave', this.handleMediaMouseLeave.bind(this));\n    });\n  }\n  handleMediaHover(event) {\n    const item = event.currentTarget;\n    const img = item.querySelector('img');\n    if (img) {\n      const currentAlt = img.alt.toLowerCase();\n      const newAlt = this.getNewAlt(currentAlt);\n      img.dataset.originalSrc = img.src;\n      img.dataset.originalAlt = currentAlt;\n      img.dataset.originalSrcset = img.srcset; // Store original srcset\n      this.swapImage(item, newAlt);\n    }\n  }\n  handleMediaMouseLeave(event) {\n    const item = event.currentTarget;\n    const img = item.querySelector('img');\n    if (img) {\n      img.src = img.dataset.originalSrc;\n      img.alt = img.dataset.originalAlt;\n      img.srcset = img.dataset.originalSrcset; // Restore original srcset\n    }\n  }\n  swapImage(item, newAlt) {\n    const productMediaItems = this.querySelectorAll('.product-media-collage__item');\n    productMediaItems.forEach(mediaItem => {\n      const img = mediaItem.querySelector('img');\n      if (img && img.alt.toLowerCase() === newAlt.toLowerCase()) {\n        const currentImg = item.querySelector('img');\n        if (currentImg) {\n          currentImg.src = img.src;\n          currentImg.alt = img.alt;\n          currentImg.srcset = img.srcset; // Update srcset\n        }\n      }\n    });\n  }\n  getNewAlt(currentAlt) {\n    const currentIndex = this.availableColors.indexOf(currentAlt);\n    const nextIndex = (currentIndex + 1) % this.availableColors.length;\n    return this.availableColors[nextIndex];\n  }\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/js/single-product-script/single-product.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/single-product-script/index.js");
/******/ 	
/******/ })()
;