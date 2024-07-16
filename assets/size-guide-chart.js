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

/***/ "./src/js/size-guide-chart/index.js":
/*!******************************************!*\
  !*** ./src/js/size-guide-chart/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _size_guide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./size-guide */ \"./src/js/size-guide-chart/size-guide.js\");\n\nif (!customElements.get('size-guide')) {\n  customElements.define('size-guide', _size_guide__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/js/size-guide-chart/index.js?");

/***/ }),

/***/ "./src/js/size-guide-chart/size-guide.js":
/*!***********************************************!*\
  !*** ./src/js/size-guide-chart/size-guide.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SizeGuide)\n/* harmony export */ });\n/* harmony import */ var _utils_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/modal */ \"./src/js/utils/modal.js\");\n\nclass SizeGuide extends HTMLElement {\n  constructor() {\n    super();\n    this.tabcontentElems = this.querySelectorAll('.size-tabcontent');\n    this.tabLinksElems = this.querySelectorAll('.size-tablinks');\n  }\n  connectedCallback() {\n    this.removeEmptyDetails();\n    if (!this.tabLinksElems[0].classList.contains('active')) {\n      this.tabLinksElems[0].classList.add('active');\n    }\n    this.tabLinksElems.forEach(tabLink => {\n      tabLink.addEventListener('click', event => this.openSize(event, tabLink.dataset.type));\n    });\n    this.querySelectorAll('[data-toggle-modal]').forEach(modalButton => {\n      modalButton.addEventListener('click', e => this.handleModalVisibility(modalButton, e));\n    });\n  }\n  handleModalVisibility(modalButton, e) {\n    e.preventDefault();\n    const header = document.querySelector('.section-header');\n    if (e.target == modalButton) {\n      const modalElement = document.querySelector(`#${modalButton.dataset.connectedModal}`);\n      switch (modalButton.dataset.toggleModal) {\n        case 'open':\n          modalElement.classList.add('open');\n          const scrollWidth = (0,_utils_modal__WEBPACK_IMPORTED_MODULE_0__.scrollbarWidth)();\n          document.body.style.overflow = 'hidden';\n          document.body.style.marginRight = `${scrollWidth}px`;\n          header.style.position = 'relative';\n          header.style.zIndex = '-1';\n          break;\n        case 'close':\n          modalElement.classList.remove('open');\n          document.body.style.overflow = null;\n          document.body.style.marginRight = '0';\n          header.style.position = 'sticky';\n          header.style.zIndex = null;\n          break;\n      }\n    }\n  }\n  removeEmptyDetails() {\n    const productDetailsElements = Array.from(this.querySelector('[data-product-details-size]').children);\n    productDetailsElements.forEach(detail => {\n      const detailInnerHtml = detail.innerHTML.trim();\n      if (detailInnerHtml === '' || detailInnerHtml === '<br>') {\n        detail.remove();\n      }\n    });\n  }\n  openSize(evt, name) {\n    this.tabcontentElems.forEach(tabContent => tabContent.style.display = 'none');\n    this.tabLinksElems.forEach(tabLink => tabLink.className = tabLink.className.replace('active', ''));\n    if (!evt.currentTarget.classList.contains('active')) {\n      this.querySelector(`#${name}`).style.display = 'flex';\n      evt.currentTarget.className += 'active';\n    }\n  }\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/js/size-guide-chart/size-guide.js?");

/***/ }),

/***/ "./src/js/utils/modal.js":
/*!*******************************!*\
  !*** ./src/js/utils/modal.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   scrollbarWidth: () => (/* binding */ scrollbarWidth)\n/* harmony export */ });\nconst scrollbarWidth = () => {\n  let documentWidth = parseInt(document.documentElement.clientWidth);\n  let windowsWidth = parseInt(window.innerWidth);\n  return windowsWidth - documentWidth;\n};\n\n//# sourceURL=webpack://my-webpack-project/./src/js/utils/modal.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/size-guide-chart/index.js");
/******/ 	
/******/ })()
;