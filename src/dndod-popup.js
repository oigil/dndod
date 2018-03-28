const originalOptions = Object.freeze({
    "prefixClass": "dndod",
    "title": "",
    "msg": "",
    "textAlign": "center",
    "animation": "from-top", // from-top, from-bottom, none
    "animationDuration": 250,
    "disableCloseBtn": false,
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

class Popup {
    constructor(options) {
        this.options = {};
        this.$wrapper = null;
        this.$popup = null;
        this.$customBtnWrapper = null;
        this.$previousActiveElement = document.activeElement || null;

        this.resizeHandler = null;

        let mergedOptions = Object.assign({}, originalOptions);
        this.options = Object.assign(mergedOptions, options);

        typeof this.options.events.create === "function" && this.options.events.create();
    }

    render(msg = "", title = "") {
        // create wrapper element.
        this.$wrapper = this.createWrapper();

        // create popup element.
        this.$popup = this.createPopup(msg, title);
        this.$wrapper.appendChild(this.$popup);

        //place custom buttons if exist.
        if (this.options.buttons.length > 0) {
            this.$wrapper.classList.add([this.options.prefixClass,"has-btn"].join("-"));
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

    createWrapper() {
        let $wrapper = document.createElement("div");

        // TODO : classList polyfill bug at IE11 (cannot add multiple classes)
        // $wrapper.classList.add([this.prefixClass,"wrapper"].join("-"), [this.prefixClass, "animate", this.animation].join("-"));
        $wrapper.classList.add([this.options.prefixClass,"wrapper"].join("-"));
        $wrapper.classList.add([this.options.prefixClass, "animate", this.options.animation].join("-"));

        $wrapper.classList.toggle([this.options.prefixClass, "no-outline"].join("-"), this.options.disableOutline === true);
        $wrapper.setAttribute("tabindex", "0");
        $wrapper.addEventListener("keydown", (e) => {
            e.stopPropagation();
            if (e.keyCode === 27) {
                this.close();
            }
        });
        $wrapper.addEventListener("click", (e) => {
            e.stopPropagation();
            this.close();
        });
        return $wrapper;
    }

    createPopup(msg, title) {
        let contentProperty = this.options.enableHTML === true ? "innerHTML" : "innerText";

        let $popup = document.createElement("div");
        $popup.classList.add([this.options.prefixClass,"popup"].join("-"));
        $popup.classList.toggle([this.options.prefixClass, "text", this.options.textAlign].join("-"), this.options.textAlign !== "center");
        $popup.setAttribute("tabindex", "0");

        let $title = document.createElement("h1");
        $title.classList.add([this.options.prefixClass,"heading"].join("-"));
        $title[contentProperty] = `${title}`;
        $popup.appendChild($title);

        let $message = document.createElement("p");
        $message.classList.add([this.options.prefixClass,"body"].join("-"));
        $message[contentProperty] = `${msg}`;
        $popup.appendChild($message);

        return $popup;
    }

    createCloseBtn() {
        let $closeBtn = document.createElement("button");
        $closeBtn.innerHTML = "&times;";
        $closeBtn.setAttribute("title", "Close this popup");
        $closeBtn.classList.add([this.options.prefixClass,"btn-close"].join("-"));
        $closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.close();
        });
        return $closeBtn;

    }

    createCustomBtnWrapper() {
        let $customBtnWrapper = document.createElement("div");
        $customBtnWrapper.classList.add([this.options.prefixClass,"custom-btn-wrapper"].join("-"));
        return $customBtnWrapper;
    }

    createCustomBtn(buttonInfo, index, buttons) {
        let $customBtn = document.createElement("button");
        $customBtn.innerHTML = buttonInfo.text;
        $customBtn.classList.add([this.options.prefixClass,"btn-custom"].join("-"));

        buttonInfo.type = buttonInfo.type || "default";
        $customBtn.classList.add([this.options.prefixClass,"btn",buttonInfo.type].join("-"));

        if (typeof buttonInfo.handler === "function") {
            $customBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                buttonInfo.handler(e, this);
            });
        }

        this.$customBtnWrapper.appendChild($customBtn);
        buttons[index].$button = $customBtn;

        if (index === buttons.length - 1) {
            this.$popup.appendChild(this.$customBtnWrapper);
        }
    }

    createFocusTrap() {
        let $trap = document.createElement("span");
        $trap.setAttribute("tabindex", "0");
        $trap.addEventListener("focus", (e) => {
            e.stopPropagation();
            this.$popup.focus();
        });
        return $trap;
    }

    watchScreenResize() {
        // TODO : classList polyfill bug at IE11 (cannot toggle)
        // this.$wrapper.classList.toggle([this.options.prefixClass, "oversize"].join("-"), this.$popup.offsetHeight > window.innerHeight - 60);

        let classList = this.$wrapper.classList,
            oversizeClass = [this.options.prefixClass, "oversize"].join("-");

        (this.$popup.offsetHeight > window.innerHeight - 60) ? classList.add(oversizeClass) : classList.remove(oversizeClass);
    }

    open() {
        this.render(this.options.msg, this.options.title);

        this.options.animation === "none" && this.$wrapper.classList.add([this.options.prefixClass, "status-show"].join("-"));
        document.body.appendChild(this.$wrapper);

        setTimeout(() => {
            typeof this.options.events.mount === "function" && this.options.events.mount();
            this.$wrapper.classList.add([this.options.prefixClass, "status-show"].join("-"));
        });

        if (this.options.animation === "none") {
            this.$popup.focus();
        } else {
            setTimeout(() => {
                this.$popup.focus();
            }, this.options.animationDuration);
        }

        this.watchScreenResize();
        this.resizeHandler = this.watchScreenResize.bind(this);
        window.addEventListener("resize", this.resizeHandler);
    }


    close() {
        typeof this.options.events.close === "function" && this.options.events.close();

        if (this.options.animation === "none") {
            this.remove();
        } else {
            this.$wrapper.classList.remove([this.options.prefixClass,"status-show"].join("-"));
            setTimeout(() => {
                this.remove();
            }, this.options.animationDuration);
        }

        this.$previousActiveElement !== null && this.$previousActiveElement.focus();
        window.removeEventListener("resize", this.resizeHandler);

        delete this;
    }

    remove() {
        this.$wrapper.parentNode.removeChild(this.$wrapper);
        setTimeout(() => {
            typeof this.options.events.unmount === "function" && this.options.events.unmount();
        });
    }
}

export const popup = (options = {}) => {
    let pop = new Popup(options);
    pop.open();
};

export const notice = (msg = "", options = {}) => {
    options.msg = msg;
    let pop = new Popup(options);
    pop.open();
};

export const alert = (msg = "", options = {}) => {
    options.msg = msg;
    options.buttons = [
        {
            text: "OK",
            type: "primary",
            handler: function (e, popup) {
                popup.close()
            }
        }
    ];
    let pop = new Popup(options);
    pop.open();
};

export const confirm = (msg = "", calllback = function(){}, options = {}) => {
    options.msg = msg;
    options.buttons = [
        {
            text: "Cancel",
            handler: function (e, popup) {
                popup.close()
            }
        },
        {
            text: "Continue",
            type: "primary",
            handler: function (e, popup) {
                popup.close();
                calllback();

            }
        }
    ];
    let pop = new Popup(options);
    pop.open();
};

export default {
    popup,
    notice,
    alert,
    confirm
}
