# react-native-svg-transformer [![NPM version](http://img.shields.io/npm/v/react-native-svg-transformer.svg)](https://www.npmjs.org/package/react-native-svg-transformer) [![Downloads per month](https://img.shields.io/npm/dm/react-native-svg-transformer.svg)](http://npmcharts.com/compare/react-native-svg-transformer?periodLength=30)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

<a href="https://facebook.github.io/react-native/"><img src="images/react-native-logo.png" width="160"></a><img src="images/plus.svg" width="100"><img src="images/svg-logo.svg" width="160">

React Native SVG transformer allows you import SVG files in your React Native project the same way that you would in a Web application when a using library like [SVGR](https://github.com/smooth-code/svgr/tree/master/packages/webpack#svgrwebpack) to transform your imported SVG images into React components.

This makes it easy to use the same code for React Native and Web.

### Usage

Import your `.svg` file inside a React component:

```jsx
import Logo from "./logo.svg";
```

You can then use your image as a component:

```jsx
<Logo width={120} height={40} />
```

_If you use React Native version 0.56 or older, you need to rename your `.svg` files to `.svgx`._

**iOS/Android/Web demo app:** [react-native-svg-example](https://github.com/kristerkari/react-native-svg-example)

## Installation and configuration

### Step 1: Install react-native-svg library

Make sure that you have installed and linked `react-native-svg` library:

- https://github.com/react-native-community/react-native-svg#installation

### Step 2: Install react-native-svg-transformer library

```sh
yarn add --dev react-native-svg-transformer
```

### Step 3: Configure the react native packager

#### For React Native v0.57 or newer

Add this to your `rn-cli.config.js` (create the file if it does not exist already):

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

...or if you are using [Expo](https://expo.io/), in `app.json`:

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


### Dependencies

In addition to React Native, this transfomer depends on the following libraries:

- [react-native-svg](https://github.com/magicismight/react-native-svg#readme)
- [react-native-svg-loader](https://github.com/unimonkiez/react-native-svg-loader)
