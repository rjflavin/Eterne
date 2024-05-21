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

/***/ "./src/js/collection-script/index.js":
/*!*******************************************!*\
  !*** ./src/js/collection-script/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _see_more__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./see-more */ \"./src/js/collection-script/see-more.js\");\n/* harmony import */ var _see_more__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_see_more__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/js/collection-script/index.js?");

/***/ }),

/***/ "./src/js/collection-script/see-more.js":
/*!**********************************************!*\
  !*** ./src/js/collection-script/see-more.js ***!
  \**********************************************/
/***/ (() => {

eval("const getProductsContainerScrollHeight = () => {\n  const productsContainerElements = document.querySelector('[data-products-container]');\n  return productsContainerElements.scrollHeight;\n};\nconst getProductCardHeight = () => {\n  const productElement = document.querySelector('[data-collection-item]');\n  return productElement.scrollHeight;\n};\nfunction debounce(fn, wait) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn.apply(this, args), wait);\n  };\n}\nconst productsCollectionElement = document.getElementById('ProductsCollection');\nconst productsContainerElement = productsCollectionElement.querySelector('[data-products-container]');\nconst seeMoreButtonElement = productsCollectionElement.querySelector('[data-see-more-button]');\nconst seeMoreLoaderElement = productsCollectionElement.querySelector('[data-see-more-loader]');\nseeMoreButtonElement.addEventListener('click', event => {\n  event.preventDefault();\n  if (sessionStorage.getItem('productsPage2')) {\n    infiniteScrollProducts();\n  } else {\n    seeMoreButtonElement.classList.add('disp-none-imp');\n    seeMoreLoaderElement.classList.remove('disp-none-imp');\n  }\n});\nconst infiniteScrollProducts = () => {\n  // insert page 2 products\n  const tempElement = document.createDocumentFragment();\n  const node = new DOMParser().parseFromString(sessionStorage.getItem('productsPage2'), \"text/html\").body;\n  sessionStorage.removeItem('productsPage2');\n  node.childNodes.forEach(childElement => {\n    childElement.removeAttribute('xmlns');\n    tempElement.append(childElement);\n  });\n  productsContainerElement.appendChild(tempElement);\n  seeMoreButtonElement.classList.add('disp-none-imp');\n  seeMoreLoaderElement.classList.add('disp-none-imp');\n  const loadMoreProducts = () => {\n    if (window.scrollY + window.innerHeight >= getProductsContainerScrollHeight() - getProductCardHeight() * 2) {\n      const nextPageUrl = document.querySelector('[data-next-url]').dataset.nextUrl;\n      if (nextPageUrl) {\n        fetch(nextPageUrl, {\n          method: 'GET',\n          headers: {\n            'Content-Type': 'text/html; charset=utf-8'\n          }\n        }).then(response => response.text()).then(responseText => {\n          const newHtml = new DOMParser().parseFromString(responseText, 'text/html');\n          const newNextUrl = newHtml.querySelector('[data-next-url]').dataset.nextUrl;\n          const newProductsContainerElement = newHtml.querySelectorAll('[data-collection-item]');\n          const newProductsDocumentFragment = document.createDocumentFragment();\n          newProductsContainerElement.forEach(newProductElement => {\n            newProductsDocumentFragment.appendChild(newProductElement);\n          });\n          productsContainerElement.appendChild(newProductsDocumentFragment);\n          if (newNextUrl) {\n            const productsContainerElement = document.querySelector('[data-products-container]');\n            productsContainerElement.dataset.nextUrl = newNextUrl;\n          } else {\n            const productsContainerElement = document.querySelector('[data-products-container]');\n            productsContainerElement.dataset.nextUrl = '';\n          }\n        });\n      }\n    }\n  };\n  const scrollDebounce = debounce(() => {\n    loadMoreProducts();\n  }, 300);\n  window.addEventListener('scroll', () => {\n    scrollDebounce();\n  });\n};\nconst loadProductsPage2 = () => {\n  const nextPageUrl = document.querySelector('[data-next-url]').dataset.nextUrl;\n  fetch(nextPageUrl, {\n    method: 'GET',\n    headers: {\n      'Content-Type': 'text/html; charset=utf-8'\n    }\n  }).then(response => response.text()).then(responseText => {\n    const newHtml = new DOMParser().parseFromString(responseText, 'text/html');\n    const newNextUrl = newHtml.querySelector('[data-next-url]').dataset.nextUrl;\n    const newProductsContainerElement = newHtml.querySelectorAll('[data-collection-item]');\n    const newProductsDocumentFragment = document.createDocumentFragment();\n    newProductsContainerElement.forEach(newProductElement => {\n      newProductsDocumentFragment.appendChild(newProductElement);\n    });\n    const serializer = new XMLSerializer();\n    const newProductsDocumentFragmentAsString = serializer.serializeToString(newProductsDocumentFragment);\n    sessionStorage.setItem('productsPage2', newProductsDocumentFragmentAsString);\n    if (newNextUrl) {\n      const productsContainerElement = document.querySelector('[data-products-container]');\n      productsContainerElement.dataset.nextUrl = newNextUrl;\n    }\n    if (!seeMoreLoaderElement.classList.contains('disp-none-imp')) {\n      infiniteScrollProducts();\n    }\n  });\n};\nloadProductsPage2();\n\n//# sourceURL=webpack://my-webpack-project/./src/js/collection-script/see-more.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/collection-script/index.js");
/******/ 	
/******/ })()
;