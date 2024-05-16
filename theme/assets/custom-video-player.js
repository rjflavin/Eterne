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

/***/ "./src/js/custom-video-player/custom-video-player.js":
/*!***********************************************************!*\
  !*** ./src/js/custom-video-player/custom-video-player.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CustomVideoPlayer)\n/* harmony export */ });\nclass CustomVideoPlayer extends HTMLElement {\n  constructor() {\n    super();\n    this.sectionId = this.dataset.id;\n    this.video = this.querySelector('video');\n    this.setListeners();\n  }\n  setListeners() {\n    let touchstartX = 0;\n    let touchstartY = 0;\n    let touchendX = 0;\n    let touchendY = 0;\n    window.addEventListener('scroll', event => this.pauseVideoOnScroll(true), true);\n    this.addEventListener('touchstart', function (event) {\n      touchstartX = event.changedTouches[0].screenX;\n      touchstartY = event.changedTouches[0].screenY;\n    }, false);\n    this.addEventListener('touchend', function (event) {\n      touchendX = event.changedTouches[0].screenX;\n      touchendY = event.changedTouches[0].screenY;\n      handleGesture(event);\n    }, false);\n    this.addEventListener('click', this.handleVideoClick);\n    const handleGesture = event => {\n      if (touchendY === touchstartY) {\n        this.handleVideoClick(event);\n      }\n    };\n  }\n  isVideoPlaying(video) {\n    return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);\n  }\n  pauseVideoOnScroll() {\n    const videoBounding = this.video.getBoundingClientRect();\n    const isVisible = !!(videoBounding.top < window.innerHeight && videoBounding.bottom >= 0);\n    const isPlaying = this.isVideoPlaying(this.video);\n    if (!isVisible && isPlaying) {\n      if (this.video) {\n        this.video.pause();\n        this.classList.remove('play');\n      }\n    }\n  }\n  handleVideoClick(event) {\n    if (!event.target.classList.contains('caption') && !event.target.classList.contains('caption__text') && !event.target.classList.contains('caption__link')) {\n      event.preventDefault();\n      const isPlaying = this.isVideoPlaying(this.video);\n      if (!isPlaying) {\n        this.video.play();\n        this.classList.add('play');\n      } else {\n        this.video.pause();\n        this.classList.remove('play');\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/js/custom-video-player/custom-video-player.js?");

/***/ }),

/***/ "./src/js/custom-video-player/index.js":
/*!*********************************************!*\
  !*** ./src/js/custom-video-player/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _custom_video_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-video-player.js */ \"./src/js/custom-video-player/custom-video-player.js\");\n\nif (!customElements.get('custom-video-player')) {\n  customElements.define('custom-video-player', _custom_video_player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n}\n\n//# sourceURL=webpack://my-webpack-project/./src/js/custom-video-player/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/custom-video-player/index.js");
/******/ 	
/******/ })()
;
