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

/***/ "./src/js/faq-script/index.js":
/*!************************************!*\
  !*** ./src/js/faq-script/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _toggle_visibility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toggle-visibility */ \"./src/js/faq-script/toggle-visibility.js\");\n\n\n//# sourceURL=webpack://my-webpack-project/./src/js/faq-script/index.js?");

/***/ }),

/***/ "./src/js/faq-script/toggle-visibility.js":
/*!************************************************!*\
  !*** ./src/js/faq-script/toggle-visibility.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_check_parents_for_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/check-parents-for-class */ \"./src/js/utils/check-parents-for-class.js\");\n\nconst questionsContainerElement = document.querySelector('.faq__questions');\nconst toggleVisibilityHandler = event => {\n  const questionBlockElement = event.target.closest('[data-faq-item]');\n  const isClickOnQuestion = (0,_utils_check_parents_for_class__WEBPACK_IMPORTED_MODULE_0__.checkParentsForClass)(event.target, 'faq__question');\n  if (isClickOnQuestion) {\n    const answerElement = questionBlockElement.querySelector('.faq__answer');\n    const plusButtonElement = questionBlockElement.querySelector('[data-plus-button]');\n    const minusButtonElement = questionBlockElement.querySelector('[data-minus-button]');\n    const isOpen = answerElement.classList.contains('disp-none-imp');\n    if (isOpen) {\n      answerElement.classList.remove('disp-none-imp');\n      plusButtonElement.classList.add('disp-none-imp');\n      minusButtonElement.classList.remove('disp-none-imp');\n    } else {\n      answerElement.classList.add('disp-none-imp');\n      plusButtonElement.classList.remove('disp-none-imp');\n      minusButtonElement.classList.add('disp-none-imp');\n    }\n  }\n};\nquestionsContainerElement.addEventListener('click', toggleVisibilityHandler);\n\n//# sourceURL=webpack://my-webpack-project/./src/js/faq-script/toggle-visibility.js?");

/***/ }),

/***/ "./src/js/utils/check-parents-for-class.js":
/*!*************************************************!*\
  !*** ./src/js/utils/check-parents-for-class.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkParentsForClass: () => (/* binding */ checkParentsForClass)\n/* harmony export */ });\nconst checkParentsForClass = (element, className) => {\n  let currentElement = element;\n  let isParentHaveClass = false;\n  while (currentElement !== null) {\n    if (currentElement.classList.contains(className)) {\n      isParentHaveClass = true;\n    }\n    currentElement = currentElement.parentElement;\n  }\n  return isParentHaveClass;\n};\n\n//# sourceURL=webpack://my-webpack-project/./src/js/utils/check-parents-for-class.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/faq-script/index.js");
/******/ 	
/******/ })()
;