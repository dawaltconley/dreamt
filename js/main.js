---
---

{% unless jekyll.environment == "development" %}
(function () {
{% endunless %}

/*
 * General-purpose functions
 */

    function toArray(collection) {
        return Array.prototype.slice.call(collection);
    };

/*
 * Image Preload
 */

    var imageSwapLinks = toArray(document.querySelectorAll("[data-image-swap]"));
    var imageSwapObjects = [];

    imageSwapLinks.forEach(function (element) {
        var newObject = new ImageSwap(element);
        imageSwapObjects.push(newObject);
    });
    
    function ImageSwap(element) {
        this.hoverElement = element;
        this.imageElement = document.getElementById(element.getAttribute("data-image-swap"));
        this.originalImageSrc = this.imageElement.getAttribute("src");
        this.newImage = new Image();
    }

    ImageSwap.prototype.swapImage = function () {
        this.imageElement.setAttribute("src", this.newImage.src);
    }

    ImageSwap.prototype.restoreImage = function () {
        this.imageElement.setAttribute("src", this.originalImageSrc);
    }

    ImageSwap.prototype.addListeners = function () {
        this.hoverElement.onmouseover = this.swapImage.bind(this);
        this.hoverElement.onmouseout = this.restoreImage.bind(this);
    }

    ImageSwap.prototype.prime = function () {
        this.newImage.onload = this.addListeners.bind(this);
        this.newImage.src = this.imageElement.getAttribute("data-hover-image");
    }

    if (imageSwapObjects.length > 0) {
        imageSwapObjects.forEach(function (object) {
            object.prime();
        });
    }

{% unless jekyll.environment == "development" %}
})();
{% endunless %}
