"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var oj_eventaggregator_1 = require("oj-eventaggregator");
exports.randomString = function () {
    return Math.random().toString(36).substring(2);
};
exports.getRootElements = function (selector, loaded) {
    if (loaded === void 0) { loaded = false; }
    var elements = Array.from(document.querySelectorAll(selector));
    if (loaded) {
        elements = elements.filter(function (x) { return x.getAttribute("data-loaded") !== null; });
        elements.forEach(function (x) { return x.setAttribute("data-loaded", "loaded"); });
    }
    return elements;
};
exports.parseHTML = function (html) {
    var container = document.createElement("div");
    container.innerHTML = html;
    return container.childNodes[0];
};
var YoutubeLoader = /** @class */ (function (_super) {
    __extends(YoutubeLoader, _super);
    function YoutubeLoader(root, options) {
        var _this = _super.call(this) || this;
        _this.options = {};
        _this.root = root;
        _this.mergeOptions(options);
        var hash = "cbfn_" + exports.randomString();
        window[hash] = (function (e) { return _this.emit("load", _this); });
        _this.iframe = exports.parseHTML("<iframe onload=\"" + hash + "(this)\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" width=\"100%\" height=\"100%\" type=\"text/html\" src=\"https://www.youtube.com/embed/" + _this.options.id + "?enablejsapi=1&autoplay=" + (_this.options.autoplay ? 1 : 0) + "&loop=" + (_this.options.loop ? 1 : 0) + "&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0\"></iframe>");
        _this.root.appendChild(_this.iframe);
        return _this;
    }
    YoutubeLoader.prototype.play = function () {
        this.postMessage("playVideo");
        this.emit("play", this);
    };
    YoutubeLoader.prototype.pause = function () {
        this.postMessage("pauseVideo");
        this.emit("pause", this);
    };
    YoutubeLoader.prototype.stop = function () {
        this.postMessage("stopVideo");
        this.emit("stop", this);
    };
    YoutubeLoader.prototype.mergeOptions = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        Object.assign(this.options, options);
        var elOptions = {
            id: this.root.getAttribute("data-youtube-loader"),
            loop: this.root.getAttribute("loop"),
            autoplay: this.root.getAttribute("autoplay"),
        };
        Object.entries(elOptions)
            .filter(function (_a) {
            var k = _a[0], v = _a[1];
            return v;
        })
            .forEach(function (_a) {
            var k = _a[0], v = _a[1];
            return _this.options[k] = v;
        });
    };
    YoutubeLoader.prototype.postMessage = function (func) {
        this.iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: func }), "https://www.youtube.com");
    };
    return YoutubeLoader;
}(oj_eventaggregator_1.EventAggregator));
exports.YoutubeLoader = YoutubeLoader;
exports.mount = function (options) {
    return exports.getRootElements("[data-youtube-loader]", true)
        .map(function (x) { return new YoutubeLoader(x, options); });
};
