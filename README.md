Lazyfill
========

A simple, experimental, solution to handle *responsive images*.

* Author: Lucifero Von Nachtosphere (c) 2013
* License: MIT/GPLv2

Lazyfill aims to solve the problem of *responsive images* from an Art-Directoring point of view. It relies a lot on the Client and tries to avoid possible useless network requests.
More on this on the upcoming post on my blog.

---

**Demo at: [nobilelucifero.github.io/lazyfill](http://nobilelucifero.github.io/lazyfill)**

---


##How it works?

You just have to set up the parameters you are interested in being captured and then you bind them to the each image that has a class of `.js-lazyfill`.


####The HTML

This is how an image looks like. The `alt` attribute is *lazy*-loaded in order to avoid flickerings. If a specified parameter is missing (e.g.: `small`), the fallback is always to `default`. The idea is that some CMSs can automate the JSON generation. Anyway, if the website is hand-crafted, the code it's still manageable and easy to edit.

```html
<img
    class='js-lazyfill'
    src=''
    alt=''
    data-sources='{
        "default": "images/path/image.png",
        "small"  : "images/path/image-small.png",
        "large"  : "images/path/image-large.png"
    }'
    data-alt="Some kind of alternate description"
>
```


####The CSS

This is the Lazyfill handler. It's up to the CSS to give the media support we are interested in. In the future the property `content` should host multiple parameters.

```css
.js-media:before { content: ''; display: none }

@media screen and (max-width: 640px) {
    .js-media:before { content: 'small' }
}
@media screen and (min-width: 1280px) {
    .js-media:before { content: 'large' }
}

```


####The Javascript

Very simple, we just need to initialize it.

```javascript
window.addEventListener('load', function(e) {
    var lazyfill = new Lazyfill();
    lazyfill.init();
});
```


##Browser support

This table is somehow incomplete. I still didn't have the chance to test it on IE nor on Safari Mobile. I did a quick test on Android's stock browser and it seems to work fine.

| Chrome | Firefox | IE | Safari |
|:-------|:--------|:---|:-------|
| 31     | 27      | ?  | 7      |


#####Requirements
* [underscore.js](http://underscorejs.org) (uses `_.debounce()`).
* the silly DOM selector I wrote (`$(), $$()`).

I hope I'll be able to delete them one day. Anyway, if you use jQuery (or Zepto), just change `$$()` to `$()` and remove the related code. The same goes for underscore.js: if you don't use it, just delete the related function.


##To Do
* **Remove** the automatic `resize` event and thus the related function. Is not something Lazyfiller should do. Probably I just need to expose the `_calculate` method.
* **Remove** some debug code, clean the whole thing.
* **Retina (HiDPI) support**: I still don't know how to implement it in a efficient way. Any suggestion is welcome.
* **Add settings** or a way to customize it (?).
* **Plugin**: create a plugin out ot this (?).


##Problems

Not many so far, what bugs me is the To Do list


##Future

I'd like to add support for the `video` media element.


##Support and Feedbacks

Feel free to ask me question or to submit feedbacks of any kind! The more I'll test the thing, the more I'll be able to provide support for it.
