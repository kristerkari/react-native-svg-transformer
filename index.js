const { resolveConfig, transform } = require("@svgr/core");
const resolveConfigDir = require("path-dirname");

/**
 * `metro-react-native-babel-transformer` has recently been migrated to the React Native
 * repository and published under the `@react-native/metro-babel-transformer` name.
 * The new package is default on `react-native` >= 0.73.0, so we need to conditionally load it.
 */
const reactNativeTransformer = (() => {
  try {
    return require("@react-native/metro-babel-transformer");
  } catch (error) {
    return require("metro-react-native-babel-transformer");
  }
})();

const expoTransformer = (() => {
  try {
    return require("@expo/metro-config/babel-transformer");
  } catch (error) {
    return null;
  }
})();

const defaultSVGRConfig = {
  native: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            inlineStyles: {
              onlyMatchedOnce: false
            },
            removeViewBox: false,
            removeUnknownsAndDefaults: false,
            convertColors: false
          }
        }
      }
    ]
  }
};

function createTransformer(transformer) {
  return async ({ src, filename, ...rest }) => {
    if (filename.endsWith(".svg")) {
      const config = await resolveConfig(resolveConfigDir(filename));
      const svgrConfig = config
        ? { ...defaultSVGRConfig, ...config }
        : defaultSVGRConfig;
      return transformer.transform({
        src: await transform(src, svgrConfig),
        filename,
        ...rest
      });
    }
    return transformer.transform({ src, filename, ...rest });
  };
}

module.exports = {
  reactNativeTransformer,
  expoTransformer,
  createTransformer,
  transform: createTransformer(
    /*
     * Expo v50.0.0 has begun using @expo/metro-config/babel-transformer as its upstream transformer.
     * To avoid breaking projects, we should prioritze that package if it is available.
     **/
    expoTransformer || reactNativeTransformer
  )
};
