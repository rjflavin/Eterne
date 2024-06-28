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

/***/ "./src/js/lazy-load-handlers/image-handler.js":
/*!****************************************************!*\
  !*** ./src/js/lazy-load-handlers/image-handler.js ***!
  \****************************************************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  const handleIntersection = (entries, observer) => {\n    entries.forEach(entry => {\n      if (entry.isIntersecting) {\n        const highQualityImage = entry.target.dataset.bgimage;\n        const img = new Image();\n        img.src = highQualityImage;\n        img.onload = () => {\n          entry.target.style.backgroundImage = `url('${highQualityImage}')`;\n          entry.target.style.filter = 'none';\n          observer.unobserve(entry.target);\n        };\n      }\n    });\n  };\n  const observeLazyLoadItems = () => {\n    const items = document.querySelectorAll('.lazyLoad');\n    if ('IntersectionObserver' in window) {\n      const observer = new IntersectionObserver(handleIntersection, {\n        rootMargin: '120px',\n        threshold: [0, 0.5, 1]\n      });\n      items.forEach(item => observer.observe(item));\n    } else {\n      items.forEach(item => {\n        const highQualityImage = item.dataset.bgimage;\n        const img = new Image();\n        img.src = highQualityImage;\n        img.onload = () => {\n          item.style.backgroundImage = `url('${highQualityImage}')`;\n          item.style.filter = 'none';\n        };\n      });\n    }\n  };\n  observeLazyLoadItems();\n  const observer = new MutationObserver(mutationsList => {\n    mutationsList.forEach(mutation => {\n      if (mutation.type === 'attributes' && mutation.attributeName === 'open') {\n        observeLazyLoadItems();\n      }\n    });\n  });\n  observer.observe(document.body, {\n    attributes: true,\n    subtree: true\n  });\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/js/lazy-load-handlers/image-handler.js?");

/***/ }),

/***/ "./src/js/lazy-load-handlers/index.js":
/*!********************************************!*\
  !*** ./src/js/lazy-load-handlers/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _image_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-handler */ \"./src/js/lazy-load-handlers/image-handler.js\");\n/* harmony import */ var _image_handler__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_image_handler__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/js/lazy-load-handlers/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/lazy-load-handlers/index.js");
/******/ 	
/******/ })()
;