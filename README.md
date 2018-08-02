# react-native-svg-transformer

[![NPM version](http://img.shields.io/npm/v/react-native-svg-transformer.svg)](https://www.npmjs.org/package/react-native-svg-transformer)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

Load SVG files in React Native.

**Limitations:** React Native's packager does not currently support running the transformer for `.svg` file extension. That is why a `.svgx` file extension should be used instead for your SVG files. This will hopefully be fixed in the future versions of React Native.

## Installation and configuration

### Step 1: Install react-native-svg library

Make sure that you have installed and linked `react-native-svg` library:
https://github.com/react-native-community/react-native-svg#installation

### Step 2: Install react-native-svg-transformer library

```sh
yarn add --dev react-native-svg-transformer
```

### Step 3: Configure the react native packager

Add this to your `rn-cli.config.js` (make one if you don't have one already):

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

### Usage

First make sure that you rename your `.svg` file to `.svgx`.

Import your `.svgx` file inside a React component:

```jsx
import Logo from "./logo.svgx";
```

You can then use your image as a component:

```jsx
<Logo width={120} height={40} />
```

### Dependencies

In addition to React Native, this transfomer depends on the following libraries:

- [react-native-svg](https://github.com/magicismight/react-native-svg#readme)
- [react-native-svg-loader](https://github.com/unimonkiez/react-native-svg-loader)
