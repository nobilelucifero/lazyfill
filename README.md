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

Nothing more than the library. Just include it the  HTML.

```html
<script src='lazyfill.js'></script>
```


##Browser support

This table is somehow incomplete. I still didn't have the chance to test it on IE nor on Safari Mobile. I did a quick test on Android's stock browser and it seems to work fine.

| Chrome | Firefox | IE   | Safari |
|:-------|:--------|:-----|:-------|
| 31     | 27      | 9-10 | 5.1-7  |

**Note 1**: I do not intend to support IE8 at the moment. But if for you is a hit or miss, just tell me and I'll figure out something. A quick patch would be to add a second, following, image within some special IE comments.


##To Do
* **Remove** some debug code, clean the whole thing.
* **Retina (HiDPI) support**: I still don't know how to implement it in a efficient way. Any suggestion is welcome.
* **Add settings** or a way to customize it (?).


##Future

I'd like to add support for the `video` media element.


##Support and Feedbacks

Feel free to ask me question or to submit feedbacks of any kind! The more I'll test the thing, the more I'll be able to provide support for it.
