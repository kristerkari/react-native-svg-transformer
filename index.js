const { resolveConfig, transform } = require("@svgr/core");
const resolveConfigDir = require("path-dirname");
/**
 * `metro-react-native-babel-transformer` has recently been migrated to the React Native
 * repository and published under the `@react-native/metro-babel-transformer` name.
 * The new package is default on `react-native` >= 0.73.0, so we need to conditionally load it.
 */
const upstreamTransformer = (function () {
  try {
    const resolver = require("@react-native/metro-babel-transformer");
    return resolver;
  } catch (error) {
    return require("metro-react-native-babel-transformer");
  }
}());

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

module.exports.transform = async ({ src, filename, options }) => {
  if (filename.endsWith(".svg")) {
    const config = await resolveConfig(resolveConfigDir(filename));
    const svgrConfig = config
      ? { ...defaultSVGRConfig, ...config }
      : defaultSVGRConfig;
    return upstreamTransformer.transform({
      src: await transform(src, svgrConfig),
      filename,
      options
    });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
