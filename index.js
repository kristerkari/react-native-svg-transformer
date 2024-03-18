const { transform } = require("@svgr/core");

/**
 * `metro-react-native-babel-transformer` has recently been migrated to the React Native
 * repository and published under the `@react-native/metro-babel-transformer` name.
 * The new package is default on `react-native` >= 0.73.0, so we need to conditionally load it.
 *
 * Additionally, Expo v50.0.0 has begun using @expo/metro-config/babel-transformer as its upstream transformer.
 * To avoid breaking projects, we should prioritze that package if it is available.
 */
const upstreamTransformer = (() => {
  try {
    return require("@expo/metro-config/babel-transformer");
  } catch (error) {
    try {
      return require("@react-native/metro-babel-transformer");
    } catch (error) {
      return require("metro-react-native-babel-transformer");
    }
  }
})();

const defaultSVGRConfig = {
  native: true,
  plugins: ["@svgr/plugin-jsx"]
};

module.exports.transform = async ({ src, filename, options }) => {
  if (filename.endsWith(".svg")) {
    // const config = await resolveConfig(resolveConfigDir(filename));
    // let svgrConfig = config
    //  ? { ...defaultSVGRConfig, ...config }
    //  : defaultSVGRConfig;
    let svgrConfig = defaultSVGRConfig;
    if (!filename.endsWith(".inline.svg")) {
      svgrConfig = { ...svgrConfig, exportType: "named" };
    }
    return upstreamTransformer.transform({
      src: await transform(src, svgrConfig),
      filename,
      options
    });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
