/*!
 * Lazyfill v0.1
 * A lazy way to handle responsive images
 * http://nobilelucifero.github.io/Lazyfill
 * MIT License
 * by Lucifero Von Nachtosphere
 */

function Lazyfill() {

    this.mediaControl = $('.js-media');

    this.getPseudoProperty = function (el, context, property) {
        var r = window.getComputedStyle(el, context).getPropertyValue(property).replace(/\"|\'/g, '');
        return r;
    };

    this._getMediaCurrent = function (el) {
        if (!el) { el = this.mediaControl; }

        var media = this.getPseudoProperty(el, ':before', 'content');
        var isRetina = this.getPseudoProperty(el, ':after', 'content');

        // If no media is provided, fallback on default
        if (media === '' || !media) {
            media = 'default';
        }

        return media;
    };

    this._source2src = function (els, media) {
        // Loop through all the found images
        var loop = function () {
            // Detect changes, false by default
            var changed = false;
            // Loop through all the found images
            for (var i = 0; i < els.length; i++) {
                // simplify the syntax
                var el       = els[i],
                    // jsonify data-imageset
                    sources  = JSON.parse(el.getAttribute('data-sources'));
                    // extract the value from imageSet
                    src      = sources[media];
                    // Old src
                    srcOld   = el.getAttribute('src');

                if (!sources[media]) { src = sources['default']; }

                if (srcOld == src) {
                    continue;
                }

                changed = true;
                // how to break a for?

                // Provide also an [alt] attribute
                var alt = el.getAttribute('data-alt');

                if (!alt) { alt = ''; }

                // Set the [src] attribute
                el.setAttribute('src', src);
                // Set alse the [alt] attribute, this avoid some flickering while setting [src]
                el.setAttribute('alt', alt);
            }

            return changed;
        };

        // Debug
        if (loop()) {
            console.groupCollapsed('[LazyFill]', 'Elements found:', els.length, 'Media is:', media);
            console.table(els, ["src", "alt", "className"]);
            console.groupEnd();
        }
    };

    this._calculate = function () {
        // Get the images we want, assign the found media support
        this._source2src($$('.js-lazyfill'), this._getMediaCurrent());
    };

    this.init = function () {
        // Debug
        console.info('[LazyFill] INIT');

        // Wraps the arguments
        this._calculate();

        // Handle the rezise event
        this._initOnResize();
    };

    this._initOnResize = function () {

        // Preserve the old context
        var that = this;

        window.addEventListener(
            'resize',
            _.debounce(that._calculate.bind(that), 1000),
            false
        );
    };

}