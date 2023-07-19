# react-native-svg-transformer [![NPM version](http://img.shields.io/npm/v/react-native-svg-transformer.svg)](https://www.npmjs.org/package/react-native-svg-transformer) [![Downloads per month](https://img.shields.io/npm/dm/react-native-svg-transformer.svg)](http://npmcharts.com/compare/react-native-svg-transformer?periodLength=30) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

<a href="https://facebook.github.io/react-native/"><img src="images/react-native-logo.png" width="160"></a><img src="images/plus.svg" width="100"><img src="images/svg-logo.svg" width="160">

React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when using a library like [SVGR](https://github.com/gregberge/svgr/tree/main/packages/webpack) to transform your imported SVG images into React components.

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

### Demo / Expo demo (iOS/Android/Web)

- [react-native-svg-example](https://github.com/kristerkari/react-native-svg-example)
- [react-native-svg-expo-example](https://github.com/kristerkari/react-native-svg-expo-example) (no Web support for Expo, help needed)

## Installation and configuration

### Step 1: Install react-native-svg library

Make sure that you have installed the `react-native-svg` library:

- https://github.com/react-native-community/react-native-svg#installation

### Step 2: Install react-native-svg-transformer library

```sh
yarn add --dev react-native-svg-transformer
```

### Step 3: Configure the react native packager

#### For Expo SDK v41.0.0 or newer

Merge the contents from your project's `metro.config.js` file with this config (create the file if it does not exist already).

`metro.config.js`:

```js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };

  return config;
})();
```

---

#### For React Native v0.72.1 or newer

Merge the contents from your project's `metro.config.js` file with this config (create the file if it does not exist already).

`metro.config.js`:

```js
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"]
  }
};

module.exports = mergeConfig(defaultConfig, config);
```

---

#### For React Native v0.59 or newer

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
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();
```

### Using TypeScript

If you are using TypeScript, you need to add this to your `declarations.d.ts` file (create one if you don't have one already):

```ts
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

### Configuring SVGR (how SVG images get transformed)

[SVGR](https://github.com/gregberge/svgr) has a configuration file, which makes it possible for you to customize how SVG images get transformed to React/React Native.

Read more about the configuration options: [Configuring SVGR](https://react-svgr.com/docs/configuration-files/) and [SVGR options](https://react-svgr.com/docs/options/).

For example, if you want to change SVG image's fill color from `red` to `currentColor` (keep in mind that this will be used for all SVG images in your app).

`.svgrrc` (create the file in your project's root folder if it does not exist)

```json
{
  "replaceAttrValues": {
    "red": "currentColor"
  }
}
```

#### Changing SVG fill color in JS Code

Edit your `.svgrrc` file and include a line for `replaceAttrValues` that matching a hex code to `{props.fill}`

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

### Rendering custom fonts in iOS

At the moment [react-native-svg](https://github.com/react-native-svg/react-native-svg#readme) does not support custom font families in iOS right out of the box. A workaround is to take your `.svg` with custom fonts and [convert it to outlines](https://www.sketch.com/docs/text/#converting-text-to-vector-shapes). This will replace `text` tags for `path` tags in your `.svg` file.

### Dependencies

In addition to React Native, this transformer depends on the following libraries:

- [react-native-svg](https://github.com/react-native-svg/react-native-svg#readme)
- [@svgr/core](https://github.com/gregberge/svgr/tree/main/packages/core#readme)
- [@svgr/plugin-jsx](https://github.com/gregberge/svgr/tree/main/packages/plugin-jsx#readme)
- [@svgr/plugin-svgo](https://github.com/gregberge/svgr/tree/main/packages/plugin-svgo#readme)
- [path-dirname](https://github.com/gulpjs/path-dirname#readme)
