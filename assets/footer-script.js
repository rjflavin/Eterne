/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/footer-script/form-validation.js":
/*!*************************************************!*\
  !*** ./src/js/footer-script/form-validation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_form_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/form-validation */ \"./src/js/utils/form-validation.js\");\n\nconst formElement = document.getElementById('ContactFooter');\nconst inputElement = formElement.querySelector('input.newsletter__input');\nconst sendFormButtonElement = formElement.querySelector('#Subscribe');\nconst footerErrorMessageContainerElement = document.getElementById('FooterErrorMessageContainer');\nconst errorInputClassName = 'footerFormSideInput_error';\nconst updateValidationMessage = status => {\n  const emptyErrorMessageElement = footerErrorMessageContainerElement.querySelector(`[data-error-type=\"empty\"]`);\n  const invalidErrorMessageElement = footerErrorMessageContainerElement.querySelector(`[data-error-type=\"invalid\"]`);\n  switch (status) {\n    case 'empty':\n      {\n        if (!inputElement.classList.contains(errorInputClassName)) {\n          inputElement.classList.add(errorInputClassName);\n        }\n        if (emptyErrorMessageElement.classList.contains('disp-none-imp')) {\n          emptyErrorMessageElement.classList.remove('disp-none-imp');\n        }\n        if (!invalidErrorMessageElement.classList.contains('disp-none-imp')) {\n          invalidErrorMessageElement.classList.add('disp-none-imp');\n        }\n        break;\n      }\n    case 'invalid':\n      {\n        if (!inputElement.classList.contains(errorInputClassName)) {\n          inputElement.classList.add(errorInputClassName);\n        }\n        if (invalidErrorMessageElement.classList.contains('disp-none-imp')) {\n          invalidErrorMessageElement.classList.remove('disp-none-imp');\n        }\n        if (!emptyErrorMessageElement.classList.contains('disp-none-imp')) {\n          emptyErrorMessageElement.classList.add('disp-none-imp');\n        }\n        break;\n      }\n    case 'hide':\n      {\n        if (inputElement.classList.contains(errorInputClassName)) {\n          inputElement.classList.remove(errorInputClassName);\n        }\n        if (!invalidErrorMessageElement.classList.contains('disp-none-imp')) {\n          invalidErrorMessageElement.classList.add('disp-none-imp');\n        }\n        if (!emptyErrorMessageElement.classList.contains('disp-none-imp')) {\n          emptyErrorMessageElement.classList.add('disp-none-imp');\n        }\n        break;\n      }\n    default:\n      break;\n  }\n};\nif (inputElement) {\n  inputElement.addEventListener('input', event => {\n    const isInputEmpty = !inputElement.value;\n    if (inputElement && isInputEmpty) {\n      formElement.setAttribute('data-empty', '');\n    } else if (inputElement) {\n      formElement.removeAttribute('data-empty');\n    }\n    if (footerErrorMessageContainerElement) {\n      updateValidationMessage('hide');\n    }\n  });\n}\nif (sendFormButtonElement) {\n  sendFormButtonElement.addEventListener('click', event => {\n    event.preventDefault();\n    const isEmptyInputValue = formElement.hasAttribute('data-empty');\n    if (isEmptyInputValue && footerErrorMessageContainerElement) {\n      updateValidationMessage('empty');\n      return;\n    } else {\n      const isEmailValueValid = (0,_utils_form_validation__WEBPACK_IMPORTED_MODULE_0__.validateEmail)(inputElement.value);\n      if (!isEmailValueValid && footerErrorMessageContainerElement) {\n        updateValidationMessage('invalid');\n        return;\n      }\n    }\n    formElement.submit();\n  });\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/js/footer-script/form-validation.js?");

/***/ }),

/***/ "./src/js/footer-script/index.js":
/*!***************************************!*\
  !*** ./src/js/footer-script/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mobile_dropdowns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobile-dropdowns */ \"./src/js/footer-script/mobile-dropdowns.js\");\n/* harmony import */ var _mobile_dropdowns__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mobile_dropdowns__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _form_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-validation */ \"./src/js/footer-script/form-validation.js\");\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/js/footer-script/index.js?");

/***/ }),

/***/ "./src/js/footer-script/mobile-dropdowns.js":
/*!**************************************************!*\
  !*** ./src/js/footer-script/mobile-dropdowns.js ***!
  \**************************************************/
/***/ (() => {

eval("const footerDropdownsTopElements = document.querySelectorAll('.mobile-drpd-top');\nfooterDropdownsTopElements.forEach(dropdownTopElement => {\n  const dropdownElement = dropdownTopElement.parentElement;\n  const dropdownTickElement = dropdownTopElement.querySelector('.ftr-mobile-state');\n  dropdownTopElement.addEventListener('click', () => {\n    if (!dropdownElement.classList.contains('ftr-mobile-drpd_open')) {\n      dropdownElement.classList.add('ftr-mobile-drpd_open');\n      dropdownTickElement.classList.add('ftr-mobile-state_rotated');\n    } else {\n      dropdownElement.classList.remove('ftr-mobile-drpd_open');\n      dropdownTickElement.classList.remove('ftr-mobile-state_rotated');\n    }\n  });\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/js/footer-script/mobile-dropdowns.js?");

/***/ }),

/***/ "./src/js/utils/form-validation.js":
/*!*****************************************!*\
  !*** ./src/js/utils/form-validation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateEmail: () => (/* binding */ validateEmail)\n/* harmony export */ });\nconst validateEmail = email => {\n  return String(email).toLowerCase().match(/^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|.(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/);\n};\n\n//# sourceURL=webpack://my-webpack-project/./src/js/utils/form-validation.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/footer-script/index.js");
/******/ 	
/******/ })()
;