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
import Component from "oj-component";
var YoutubeLoader = /** @class */ (function (_super) {
    __extends(YoutubeLoader, _super);
    function YoutubeLoader(root, options) {
        return _super.call(this, "youtube-loader", root, options) || this;
    }
    YoutubeLoader.mount = function (options) {
        return Component.getRoots("[data-youtube-loader]:not([data-youtube-loader=\"loaded\"])")
            .map(function (x) { return new YoutubeLoader(x, options); });
    };
    YoutubeLoader.prototype.initialize = function (url) {
        if (url && url !== "loaded") {
            this.url = url;
            this.load(this.root, this.url);
            this.iframe = this.root.children[0];
        }
        var loop = this.root.getAttribute("data-youtube-loader-loop");
        if (loop !== null)
            this.loop = loop === "true";
    };
    YoutubeLoader.prototype.load = function (target, id) {
        target.innerHTML = "<iframe frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" width=\"100%\" height=\"100%\" type=\"text/html\" src=\"https://www.youtube.com/embed/" + id + "?enablejsapi=1&autoplay=" + (this.autoplay ? 1 : 0) + "&loop=" + (this.loop ? 1 : 0) + "&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0\"></iframe>";
    };
    YoutubeLoader.prototype.play = function () {
        this.iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), 'https://www.youtube.com');
    };
    YoutubeLoader.prototype.pause = function () {
        this.iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), 'https://www.youtube.com');
    };
    YoutubeLoader.prototype.stop = function () {
        this.iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), 'https://www.youtube.com');
    };
    YoutubeLoader.prototype.unmount = function () { };
    return YoutubeLoader;
}(Component));
export default YoutubeLoader;
