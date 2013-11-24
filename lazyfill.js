(function () {

    'use strict';

    var lazyfill = function () {

        function getPseudoProperty (el, context, property) {
            return window.getComputedStyle(el, context).getPropertyValue(property).replace(/\"|\'/g, '');
        }

        var mediaControl = document.querySelector('.js-media');

        if (!mediaControl) {
            mediaControl = document.createElement('div');
            mediaControl.className = 'js-media';
            document.querySelector('body').appendChild(mediaControl);
        }

        var els   = document.querySelectorAll('.js-lazyfill');
        var media = getPseudoProperty(mediaControl, ':before', 'content');
        // If no media is provided, fallback on default
        if (media === '' || !media) { media = 'default'; }

        // Detect changes, false by default
        var changed = false;
        // Loop through all the found images
        for (var i = 0; i < els.length; i++) {

            var el       = els[i],
                sources  = JSON.parse(el.getAttribute('data-sources')),
                src      = sources[media],
                srcOld   = el.getAttribute('src');

            if (!sources[media]) { src = sources['default']; }

            if (srcOld == src) {
                continue;
            }

            // Provide also an [alt] attribute
            var alt = el.getAttribute('data-alt');

            if (!alt) { alt = ''; }

            el.setAttribute('src', src);
            // avoid some flickering while setting [src]
            el.setAttribute('alt', alt);

            changed = true;
        }

    };

    if (window.addEventListener) {
        window.addEventListener("DOMContentLoaded", function () {
            lazyfill();
            // detach the initial event
            window.removeEventListener("DOMContentLoaded", lazyfill, false);
        }, false );
        window.addEventListener("resize", lazyfill, false);
    }

}(this));
