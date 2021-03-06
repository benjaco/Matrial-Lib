/**
 * Created by Benjaco on 25-10-2014.
 */

(function ($) {
    $.fn.toggleCheck = function () {
        this.each(function () {
            this.checked = !this.checked;
        });

    };
    $.fn.hasSetWidth = function () {
        return (this[0].style.width != "");

    };
    $.fn.getWidth = function () {
        return this[0].style.width
    };
    $.fn.hasSetHeight = function () {
        return (this[0].style.height != "");

    };
    $.fn.getHeight = function () {
        return this[0].style.height
    };
    $.fn.attributeChange = function (callback) {
        var MutationObserver = window.MutationObserver
        || window.WebKitMutationObserver
        || window.MozMutationObserver;
        var element = this[0];


        if (MutationObserver) {
            var observer = new MutationObserver(function(mutation) {
                callback(element, mutation[0].attributeName)
            });

            observer.observe(element, {
                subtree: false,
                attributes: true,
                attributeOldValue: false
            });


        } else if ('onpropertychange' in document.body) { //works only in IE
            element.onpropertychange =  function(event){
                callback(element, event.propertyName)
            }
        }
    }

}(jQuery));

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}


materialFramework = {
    core_elements: {},

    isAppleOrSaferi: (
        navigator.userAgent.indexOf('Safari') != -1 &&
        navigator.userAgent.indexOf('Chrome') == -1
    )
    ||
    /iPad|iPhone|iPod/.test(navigator.platform),

    init: function (autoUpdate) {

        materialFramework.core_elements.ink.init();
        this.updateElements();

        this.autoUpdate = typeof autoUpdate === "undefined" || autoUpdate === true;
        if (this.autoUpdate) {
            document.addEventListener("DOMNodeInserted", materialFramework.updateElements );
        }

        this.tools.handelDefaultNotifications()
    },
    autoUpdate: true,
    setAutoupdate: function (autoUpdate) {
        if(autoUpdate == this.autoUpdate) {
            return
        }
        this.autoUpdate = autoUpdate === true;

        if(this.autoUpdate) {
            document.addEventListener("DOMNodeInserted", materialFramework.updateElements );
            this.updateElements();
        }else{
            document.removeEventListener("DOMNodeInserted", materialFramework.updateElements );
        }
    },
    updateElements: function () {
        materialFramework.core_elements.checkbox.init();
        materialFramework.core_elements.icon.init();
        materialFramework.core_elements.input.init();
    }
};
