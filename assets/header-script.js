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

/***/ "./src/js/header-script/burger-menu.js":
/*!*********************************************!*\
  !*** ./src/js/header-script/burger-menu.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_check_parents_for_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/check-parents-for-class */ \"./src/js/utils/check-parents-for-class.js\");\n\nconst burgerMenuElement = document.getElementById('BurgerMenu');\nconst burgerMenuButtonElement = document.getElementById('BurgerMenuButton');\nconst burgerMenuListWrapperElement = document.getElementById('BurgerMenuListWrapper');\nconst burgerMenuItemsElements = burgerMenuListWrapperElement.querySelectorAll('[data-burger-menu-item]');\n\n// burger menu open/close\n\nconst showBurgerMenu = () => {\n  burgerMenuButtonElement.dataset.isBurgerMenuOpen = 'true';\n  document.body.classList.add('scr-dis-on-mbl');\n  burgerMenuElement.classList.add('brgr_actv');\n};\nconst hideBurgerMenu = () => {\n  burgerMenuButtonElement.dataset.isBurgerMenuOpen = 'false';\n  document.body.classList.remove('scr-dis-on-mbl');\n  burgerMenuElement.classList.remove('brgr_actv');\n};\nburgerMenuButtonElement.addEventListener('click', () => {\n  if (burgerMenuButtonElement.dataset.isBurgerMenuOpen === 'false') {\n    showBurgerMenu();\n  } else hideBurgerMenu();\n});\n\n// burger menu dropdowns\nburgerMenuItemsElements.forEach(itemElement => {\n  const hasItemDropdown = itemElement.querySelector('[data-burger-menu-item-dropdown]');\n  if (!!hasItemDropdown) {\n    itemElement.addEventListener('click', event => {\n      const isDropdownItemClicked = (0,_utils_check_parents_for_class__WEBPACK_IMPORTED_MODULE_0__.checkParentsForClass)(event.target, 'brgr-drpd__item');\n      const stateIndicatorPlus = itemElement.querySelector('[data-dropdown-state-plus]');\n      const stateIndicatorMinus = itemElement.querySelector('[data-dropdown-state-minus]');\n      const dropdownElement = itemElement.querySelector('[data-burger-menu-item-dropdown]');\n      const shouldShowDropdown = hasItemDropdown.dataset.isDropdownOpen === 'false';\n      if (!isDropdownItemClicked) {\n        if (shouldShowDropdown) {\n          dropdownElement.dataset.isDropdownOpen = 'true';\n          itemElement.classList.remove('brgr-list__item_hid-drpd');\n          stateIndicatorPlus.classList.add('brgr-list__state_hide');\n          stateIndicatorMinus.classList.remove('brgr-list__state_hide');\n        } else {\n          dropdownElement.dataset.isDropdownOpen = 'false';\n          itemElement.classList.add('brgr-list__item_hid-drpd');\n          stateIndicatorPlus.classList.remove('brgr-list__state_hide');\n          stateIndicatorMinus.classList.add('brgr-list__state_hide');\n        }\n      }\n    });\n  }\n});\n\n// fix 100vh bug on Safari\n\nconst updateAppHeight = () => {\n  const html = document.querySelector('html');\n  html.style.setProperty('--app-height', `${window.innerHeight}px`);\n  html.style.setProperty('--app-width', `${window.innerWidth}px`);\n};\nwindow.addEventListener('resize', updateAppHeight);\nupdateAppHeight();\n\n//# sourceURL=webpack://my-webpack-project/./src/js/header-script/burger-menu.js?");

/***/ }),

/***/ "./src/js/header-script/desktop-dropdowns.js":
/*!***************************************************!*\
  !*** ./src/js/header-script/desktop-dropdowns.js ***!
  \***************************************************/
/***/ (() => {

eval("const desktopMenuElement = document.getElementById('DesktopMenu');\nconst desktopMenuItemsElements = desktopMenuElement.querySelectorAll('[data-desktop-menu-item]');\ndesktopMenuItemsElements.forEach(itemElement => {\n  itemElement.addEventListener('click', () => {\n    window.location.href = itemElement.dataset.url;\n  });\n  const hasItemDropdown = itemElement.querySelector('[data-desktop-menu-item-dropdown]');\n  if (hasItemDropdown) {\n    itemElement.addEventListener('mouseenter', () => {\n      itemElement.classList.remove('hide-drpd');\n    });\n    itemElement.addEventListener('mouseleave', () => {\n      itemElement.classList.add('hide-drpd');\n    });\n  }\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/js/header-script/desktop-dropdowns.js?");

/***/ }),

/***/ "./src/js/header-script/hide-on-scroll.js":
/*!************************************************!*\
  !*** ./src/js/header-script/hide-on-scroll.js ***!
  \************************************************/
/***/ (() => {

eval("let oldValue = window.pageYOffset || document.documentElement.scrollTop;\nlet newValue = window.pageYOffset || document.documentElement.scrollTop;\nconst headerElement = document.querySelector('page-header');\nconst rootHeaderElement = document.querySelector('.section-header');\nwindow.addEventListener('scroll', () => {\n  // Get the new Value\n  newValue = window.pageYOffset;\n\n  //Subtract the two and conclude\n  if (oldValue - newValue < 0 && newValue > headerElement.offsetHeight) {\n    headerElement.style.opacity = 0;\n    headerElement.style.visibility = 'hidden';\n    headerElement.style.zIndex = '-1';\n    rootHeaderElement.style.zIndex = '0';\n  } else if (oldValue - newValue > 0) {\n    headerElement.style.opacity = 1;\n    headerElement.style.visibility = 'visible';\n    headerElement.style.zIndex = '999';\n    rootHeaderElement.style.zIndex = '999';\n  }\n\n  // Update the old value\n  oldValue = newValue <= 0 ? 0 : newValue;\n}, false);\n\n//# sourceURL=webpack://my-webpack-project/./src/js/header-script/hide-on-scroll.js?");

/***/ }),

/***/ "./src/js/header-script/index.js":
/*!***************************************!*\
  !*** ./src/js/header-script/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _burger_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./burger-menu */ \"./src/js/header-script/burger-menu.js\");\n/* harmony import */ var _desktop_dropdowns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./desktop-dropdowns */ \"./src/js/header-script/desktop-dropdowns.js\");\n/* harmony import */ var _desktop_dropdowns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_desktop_dropdowns__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hide_on_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hide-on-scroll */ \"./src/js/header-script/hide-on-scroll.js\");\n/* harmony import */ var _hide_on_scroll__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_hide_on_scroll__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/js/header-script/index.js?");

/***/ }),

/***/ "./src/js/utils/check-parents-for-class.js":
/*!*************************************************!*\
  !*** ./src/js/utils/check-parents-for-class.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/header-script/index.js");
/******/ 	
/******/ })()
;