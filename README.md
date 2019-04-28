# gatsby-remark-code-buttons

Add buttons to code snippets.

## Install

```bash
npm install gatsby-remark-code-buttons --save-dev
```

![](https://media.giphy.com/media/hoHRea4IdkDBrsE4Bu/source.gif)

## How to use

in your `gatsby-config.js`

```js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: ['gatsby-remark-code-buttons']
    }
  }
]
```

## Options

```js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-code-buttons',
          options: {
            // Optional button container class name. Defaults
            // to 'gatsby-code-button-container'.
            className: `customClassName`,
            // Optional button class name. Defaults to 'gatsby-code-button'.
            buttonClassName: `customButtonClassName`,
            // Optional icon class name. Defaults to 'gatsby-code-button-icon'.
            iconClassName: `customIconClassName`,
            // Optional `svg` icon. Defaults to `svg` string and can be
            // replaced with any other valid `svg`. Append custom classes
            // right in the `svg` string and skip `iconClassName` option.
            icon: `customIcon`,
            // Optional button text. Defaults to ''.
            text: `customText`,
            // Optional tooltip text. Defaults to ''.
            tooltip: `customTooltip`,
            // Optional toaster class name. Defaults to 'gatsby-code-button-toaster'.
            toasterClassName: `customToasterClassName`,
            // Optional toaster text. Defaults to ''.
            toasterText: 'customToasterText',
            // Optional toaster text class name. Defaults to 'gatsby-code-button-toaster-text'.
            toasterTextClassName: `customЕoasterTextClassName`,
            // Optional toaster duration. Defaults to 3500.
            toasterDuration: 5000
          }
        }
      ]
    }
  }
]
```

### Include CSS

Now that we've injected the custom button, we need to style it!

```css
.gatsby-code-button-container {}
.gatsby-code-button {}
.gatsby-code-button-icon {}
.gatsby-code-button-toaster {}
.gatsby-code-button-toaster-text {}
.gatsby-code-button-buffer {}
```

To apply custom styles import your stylesheet in your app's root `gatsby-browser.js`.

```js
// gatsby-browser.js
import './src/styles/custom-code-buttons.scss';
```

### Usage in Markdown

In your Markdown content

``````js
```js
alert('click to copy 💾');
```
``````

This plugin will parse the Markdown AST, pluck the button, and then "clean" the code snippet language for further 
processing. With the default config options this plugin will create the following structure, injecting a custom `div`:

```html
<div
  class="gatsby-code-button-container"
  onclick="copyToClipboard(`alert('how cool is this');`)"
  data-toaster-text=""
  data-toaster-id=""
  data-toaster-duration="5000"
  data-toaster-class="gatsby-code-button-toaster"
  data-toaster-text-class="gatsby-code-button-toaster-text"
>
  <div class="gatsby-code-button" data-tooltip="">
    <svg class="gatsby-code-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>
  </div>
</div>
```

With `toasterText` config option this plugin will create the following structure for the toaster node:

```html
<div class="gatsby-code-button-toaster">
  <div class="gatsby-code-button-toaster-text">Copied to clipboard</div>
</div>
```

Don't show button

``````js
```js:clipboard=false
alert('will not be copied 💾');
```
``````
