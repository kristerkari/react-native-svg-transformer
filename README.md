# react-native-svg-transformer [![NPM version](http://img.shields.io/npm/v/react-native-svg-transformer.svg)](https://www.npmjs.org/package/react-native-svg-transformer) [![Downloads per month](https://img.shields.io/npm/dm/react-native-svg-transformer.svg)](http://npmcharts.com/compare/react-native-svg-transformer?periodLength=30) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

<a href="https://facebook.github.io/react-native/"><img src="images/react-native-logo.png" width="160"></a><img src="images/plus.svg" width="100"><img src="images/svg-logo.svg" width="160">

React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when using a library like [SVGR](https://github.com/smooth-code/svgr/tree/master/packages/webpack#svgrwebpack) to transform your imported SVG images into React components.

This makes it possible to use the same code for React Native and Web.

## Usage

Import your `.svg` file inside a React component:

```jsx
import Logo from "./logo.svg";
```

You can then use your image as a component:

```jsx
<Logo width={120} height={40} />
```

_If you use React Native version 0.56 or older, you need to rename your `.svg` files to `.svgx`._

### Demo (iOS/Android/Web)

- [react-native-svg-example](https://github.com/kristerkari/react-native-svg-example)

## Installation and configuration

### Step 1: Install react-native-svg library

Make sure that you have installed and linked `react-native-svg` library:

- https://github.com/react-native-community/react-native-svg#installation

### Step 2: Install react-native-svg-transformer library

```sh
yarn add --dev react-native-svg-transformer
```

### Step 3: Configure the react native packager

#### For React Native v0.57 or newer / Expo SDK v31.0.0 or newer

Merge the contents from your project's `metro.config.js` file with this config (create the file if it does not exist already).

`metro.config.js`:

```js
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();
```

If you are using [Expo](https://expo.io/), you also need to add this to `app.json`:

```json
{
  "expo": {
    "packagerOpts": {
      "config": "metro.config.js",
      "sourceExts": ["js", "jsx", "ts", "tsx", "svg"]
    }
  }
}
```

---

#### For React Native v0.56 or older

React Native versions older than 0.57 do not support running the transformer for `.svg` file extension. That is why a `.svgx` file extension should be used instead for your SVG files. This is fixed in React Native 0.57 and newer versions.

Add this to your `rn-cli.config.js` (create the file if it does not exist already):

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-svg-transformer");
  },
  getSourceExts() {
    return ["js", "jsx", "svgx"];
  }
};
```

---

#### For Expo SDK v30.0.0 or older

If you are using [Expo](https://expo.io/), instead of adding the `rn-cli.config.js` file, you need to add this to `app.json`:

```json
{
  "expo": {
    "packagerOpts": {
      "sourceExts": ["js", "jsx", "svgx"],
      "transformer": "node_modules/react-native-svg-transformer/index.js"
    }
  }
}
```

### Using TypeScript

If you are using TypeScript, you need to add this to your `declarations.d.ts` file (create one if you don't have one already):

```ts
declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.StatelessComponent<SvgProps>;
  export default content;
}
```

### Configuring SVGR (how SVG images get transformed)

[SVGR](https://github.com/smooth-code/svgr) has a configuration file, which makes it possible for you to customize how SVG images get transformed to React/React Native.

Read more about the configuration options: [Configuring SVGR](https://github.com/smooth-code/svgr/blob/master/website/src/pages/docs/configuration-files.mdx) and [SVGR options](https://github.com/smooth-code/svgr/blob/master/website/src/pages/docs/options.mdx).

For example, if you want to change SVG image's fill color from `red` to `currentColor` (keep in mind that this will be used for all SVG images in your app).

`.svgrrc`

```json
{
  "replaceAttrValues": {
    "red": "currentColor"
  }
}
```

#### Changing SVG fill color in JS Code

Edit your `.svgrrc` file and include a line for **replaceAttrValues** that matching a hex code to **{props.fill}**

```json
{
  "replaceAttrValues": {
    "#000": "{props.fill}"
  }
}
```

And then make sure your path tag inside the SVG file `fill` attribute is the hex code (in this case `#000`).

```xml
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.965 6.0925C4.045 8.215 ..." fill="#000"/>
</svg>
```

You can then use your image as a component:

```jsx
<Logo width={120} height={40} fill={"any color"} />
```

### Usage with Jest

To use `Jest` to test your React Native components that import `.svg` images, you need to add this configuration that mocks the SVG images that are transformed to React components:

```js
// __mocks__/svgMock.js
module.exports = "SvgMock";
module.exports.ReactComponent = "SvgMock";
```

Then, depending on where you have your Jest configuration:

```json
// package.json
{
  "jest": {
    "moduleNameMapper": {
      "\\.svg": "<rootDir>/__mocks__/svgMock.js"
    }
  }
}
```

or

```js
// jest.config.js
module.exports = {
  moduleNameMapper: {
    "\\.svg": "<rootDir>/__mocks__/svgMock.js"
  }
};
```

### Dependencies

In addition to React Native, this transfomer depends on the following libraries:

- [react-native-svg](https://github.com/magicismight/react-native-svg#readme)
- [@svgr/core](https://github.com/smooth-code/svgr/tree/master/packages/core)
- [@svgr/plugin-svgo](https://github.com/smooth-code/svgr/tree/master/packages/plugin-svgo)
- [path-dirname](https://github.com/gulpjs/path-dirname#readme)
- [semver](https://github.com/npm/node-semver#readme)
