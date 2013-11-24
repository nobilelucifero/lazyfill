(function () {

    'use strict';

    var lazyfill = function () {

        function getPseudoProperty (el, context, property) {
            return window.getComputedStyle(el, context).getPropertyValue(property).replace(/\"|\'/g, '');
        }

        var mediaControl = document.querySelector('.js-media');

        if (!mediaControl) {
            var body = document.querySelector('body');

            mediaControl = document.createElement('div');
            mediaControl.className = 'js-media';
            body.appendChild(mediaControl);

            // Debug
            console.info('[Lazyfill] INIT');
        }

        var els = document.querySelectorAll('.js-lazyfill');
        var media = getPseudoProperty(mediaControl, ':before', 'content');

        // If no media is provided, fallback on default
        if (media === '' || !media) { media = 'default'; }

        // Detect changes, false by default
        var changed = false;

        // Loop through all the found images
        for (var i = 0; i < els.length; i++) {

            var el       = els[i],
                sources  = JSON.parse(el.getAttribute('data-sources')),
                // extract the value from imageSet
                src      = sources[media],
                // Old src
                srcOld   = el.getAttribute('src');

            if (!sources[media]) { src = sources['default']; }

            if (srcOld == src) {
                continue;
            }

            // Provide also an [alt] attribute
            var alt = el.getAttribute('data-alt');

            if (!alt) { alt = ''; }

            // Set the [src] attribute
            el.setAttribute('src', src);
            // Set alse the [alt] attribute, this avoid some flickering while setting [src]
            el.setAttribute('alt', alt);

            changed = true;
        }

        // Debug
        if (changed && console.groupCollapsed) {
            console.groupCollapsed('[Lazyfill]', 'Elements found:', els.length, 'Media is:', media);
            console.table(els, ['src', 'alt', 'className']);
            console.groupEnd();
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
