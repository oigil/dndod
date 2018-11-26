(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dndod"] = factory();
	else
		root["dndod"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var originalOptions = Object.freeze({
    "prefixClass": "dndod",
    "title": "",
    "msg": "",
    "textAlign": "center",
    "animation": "from-top", // from-top, from-bottom, none
    "animationDuration": 250,
    "disableCloseBtn": false,
    "disableCloseWithOverlay": false,
    "disableOutline": false,
    "enableHTML": false,
    "events": {
        "create": null,
        "mount": null,
        "close": null,
        "unmount": null
    },
    "buttons": []
});

var Popup = function () {
    function Popup(options) {
        _classCallCheck(this, Popup);

        this.options = {};
        this.$wrapper = null;
        this.$popup = null;
        this.$customBtnWrapper = null;
        this.$previousActiveElement = document.activeElement || null;

        this.openTimeout = undefined;
        this.closeTimeout = undefined;

        this.resizeHandler = null;

        var mergedOptions = _extends({}, originalOptions);
        this.options = _extends(mergedOptions, options);

        typeof this.options.events.create === "function" && this.options.events.create();
    }

    _createClass(Popup, [{
        key: "render",
        value: function render() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

            // create wrapper element.
            this.$wrapper = this.createWrapper();

            // create popup element.
            this.$popup = this.createPopup(msg, title);
            this.$wrapper.appendChild(this.$popup);

            //place custom buttons if exist.
            if (this.options.buttons.length > 0) {
                this.$wrapper.classList.add([this.options.prefixClass, "has-btn"].join("-"));
                this.$customBtnWrapper = this.createCustomBtnWrapper();
                this.options.buttons.forEach(this.createCustomBtn.bind(this));
            }

            //place close button unless disabled.
            if (this.options.disableCloseBtn !== true) {
                this.$popup.appendChild(this.createCloseBtn());
            }

            //place focus trap
            this.$popup.appendChild(this.createFocusTrap());
        }
    }, {
        key: "createWrapper",
        value: function createWrapper() {
            var _this = this;

            var $wrapper = document.createElement("div");

            // TODO : classList polyfill bug at IE11 (cannot add multiple classes)
            // $wrapper.classList.add([this.prefixClass,"wrapper"].join("-"), [this.prefixClass, "animate", this.animation].join("-"));
            $wrapper.classList.add([this.options.prefixClass, "wrapper"].join("-"));
            $wrapper.classList.add([this.options.prefixClass, "animate", this.options.animation].join("-"));

            $wrapper.classList.toggle([this.options.prefixClass, "no-outline"].join("-"), this.options.disableOutline === true);

            if (this.options.animationDuration !== 250) {
                $wrapper.style.transitionDuration = parseInt(this.options.animationDuration, 10) / 1000 + "s";
            }

            $wrapper.setAttribute("tabindex", "0");

            $wrapper.dndodKeydownHandler = function (e) {
                e.stopPropagation();
                if (e.keyCode === 27) {
                    _this.close();
                }
            };

            $wrapper.dndodClickHandler = function (e) {
                e.stopPropagation();
                _this.close();
            };

            $wrapper.addEventListener("keydown", $wrapper.dndodKeydownHandler);
            if (!this.options.disableCloseWithOverlay) {
                $wrapper.addEventListener("click", $wrapper.dndodClickHandler);
            }
            return $wrapper;
        }
    }, {
        key: "createPopup",
        value: function createPopup(msg, title) {
            var contentProperty = this.options.enableHTML === true ? "innerHTML" : "innerText";

            var $popup = document.createElement("div");
            $popup.classList.add([this.options.prefixClass, "popup"].join("-"));
            $popup.classList.toggle([this.options.prefixClass, "text", this.options.textAlign].join("-"), this.options.textAlign !== "center");

            if (this.options.animationDuration !== 250) {
                $popup.style.transitionDuration = parseInt(this.options.animationDuration, 10) / 1000 + "s";
            }

            $popup.setAttribute("tabindex", "0");

            $popup.dndodClickHandler = function (e) {
                e.stopPropagation();
            };
            $popup.addEventListener("click", $popup.dndodClickHandler);

            var $title = document.createElement("h1");
            $title.classList.add([this.options.prefixClass, "heading"].join("-"));
            $title[contentProperty] = "" + title;
            $popup.appendChild($title);

            var $message = document.createElement("p");
            $message.classList.add([this.options.prefixClass, "body"].join("-"));

            if (msg instanceof HTMLElement) {
                $message.appendChild(msg);
            } else {
                $message[contentProperty] = "" + msg;
            }

            $popup.appendChild($message);

            return $popup;
        }
    }, {
        key: "createCloseBtn",
        value: function createCloseBtn() {
            var _this2 = this;

            var $closeBtn = document.createElement("button");
            $closeBtn.innerHTML = "&times;";
            $closeBtn.setAttribute("title", "Close this popup");
            $closeBtn.classList.add([this.options.prefixClass, "btn-close"].join("-"));
            $closeBtn.dndodClickHandler = function (e) {
                e.stopPropagation();
                _this2.close();
            };
            $closeBtn.addEventListener("click", $closeBtn.dndodClickHandler);
            return $closeBtn;
        }
    }, {
        key: "createCustomBtnWrapper",
        value: function createCustomBtnWrapper() {
            var $customBtnWrapper = document.createElement("div");
            $customBtnWrapper.classList.add([this.options.prefixClass, "custom-btn-wrapper"].join("-"));
            return $customBtnWrapper;
        }
    }, {
        key: "createCustomBtn",
        value: function createCustomBtn(buttonInfo, index, buttons) {
            var _this3 = this;

            var $customBtn = document.createElement("button");
            $customBtn.innerHTML = buttonInfo.text;
            $customBtn.classList.add([this.options.prefixClass, "btn-custom"].join("-"));

            buttonInfo.type = buttonInfo.type || "default";
            $customBtn.classList.add([this.options.prefixClass, "btn", buttonInfo.type].join("-"));

            if (typeof buttonInfo.handler === "function") {
                $customBtn.dndodClickHandler = function (e) {
                    e.stopPropagation();
                    buttonInfo.handler(e, _this3);
                };
                $customBtn.addEventListener("click", $customBtn.dndodClickHandler);
            }

            this.$customBtnWrapper.appendChild($customBtn);
            buttons[index].$button = $customBtn;

            if (index === buttons.length - 1) {
                this.$popup.appendChild(this.$customBtnWrapper);
            }
        }
    }, {
        key: "createFocusTrap",
        value: function createFocusTrap() {
            var _this4 = this;

            var $trap = document.createElement("span");
            $trap.setAttribute("tabindex", "0");
            $trap.addEventListener("focus", function (e) {
                e.stopPropagation();
                _this4.$popup.focus();
            });
            return $trap;
        }
    }, {
        key: "watchScreenResize",
        value: function watchScreenResize() {
            // TODO : classList polyfill bug at IE11 (cannot toggle)
            // this.$wrapper.classList.toggle([this.options.prefixClass, "oversize"].join("-"), this.$popup.offsetHeight > window.innerHeight - 60);

            var classList = this.$wrapper.classList,
                oversizeClass = [this.options.prefixClass, "oversize"].join("-");

            this.$popup.offsetHeight > window.innerHeight - 60 ? classList.add(oversizeClass) : classList.remove(oversizeClass);
        }
    }, {
        key: "removeAllEventHandler",
        value: function removeAllEventHandler() {
            window.removeEventListener("resize", this.resizeHandler);
            this.$popup.removeEventListener("click", this.$popup.dndodClickHandler);
            this.$wrapper.removeEventListener("keydown", this.$wrapper.dndodKeydownHandler);
            this.$wrapper.removeEventListener("click", this.$wrapper.dndodClickHandler);
            this.options.buttons.forEach(function (buttonInfo) {
                buttonInfo.$button.removeEventListener("click", buttonInfo.$button.dndodClickHandler);
            });
        }
    }, {
        key: "open",
        value: function open() {
            var _this5 = this;

            this.$previousActiveElement !== null && this.$previousActiveElement.blur();

            this.render(this.options.msg, this.options.title);
            this.options.animation === "none" && this.$wrapper.classList.add([this.options.prefixClass, "status-show"].join("-"));
            document.body.appendChild(this.$wrapper);

            setTimeout(function () {
                typeof _this5.options.events.mount === "function" && _this5.options.events.mount();
                _this5.options.animation !== "none" && _this5.$wrapper.classList.add([_this5.options.prefixClass, "status-show"].join("-"));
            });

            if (this.options.animation === "none") {
                this.$popup.focus();
            } else {
                this.openTimeout = setTimeout(function () {
                    _this5.$popup.focus();
                }, this.options.animationDuration);
            }

            this.watchScreenResize();
            this.resizeHandler = this.watchScreenResize.bind(this);
            window.addEventListener("resize", this.resizeHandler);
        }
    }, {
        key: "close",
        value: function close() {
            var _this6 = this;

            typeof this.options.events.close === "function" && this.options.events.close();

            this.openTimeout && clearTimeout(this.openTimeout);
            this.removeAllEventHandler();

            if (this.options.animation === "none") {
                this.remove();
            } else {
                this.$wrapper.classList.remove([this.options.prefixClass, "status-show"].join("-"));
                this.closeTimeout = setTimeout(function () {
                    _this6.remove();
                }, this.options.animationDuration);
            }

            delete this;
        }
    }, {
        key: "remove",
        value: function remove() {
            var _this7 = this;

            this.$previousActiveElement !== null && this.$previousActiveElement.focus();

            this.$wrapper.parentNode.removeChild(this.$wrapper);
            setTimeout(function () {
                typeof _this7.options.events.unmount === "function" && _this7.options.events.unmount();
            });
        }
    }]);

    return Popup;
}();

var popup = exports.popup = function popup() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var pop = new Popup(options);
    pop.open();
};

var notice = exports.notice = function notice() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    options.msg = msg;
    var pop = new Popup(options);
    pop.open();
};

var alert = exports.alert = function alert() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    options.msg = msg;
    options.buttons = [{
        text: "OK",
        type: "primary",
        handler: function handler(e, popup) {
            popup.close();
        }
    }];
    var pop = new Popup(options);
    pop.open();
};

var confirm = exports.confirm = function confirm() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var calllback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    options.msg = msg;
    options.buttons = [{
        text: "Cancel",
        handler: function handler(e, popup) {
            popup.close();
        }
    }, {
        text: "Continue",
        type: "primary",
        handler: function handler(e, popup) {
            popup.close();
            calllback();
        }
    }];
    var pop = new Popup(options);
    pop.open();
};

exports.default = {
    popup: popup,
    notice: notice,
    alert: alert,
    confirm: confirm
};

/***/ })
/******/ ]);
});
