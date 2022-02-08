const { transform } = require("@svgr/core");
// const { resolveConfig, transform } = require("@svgr/core");
// const resolveConfigDir = require("path-dirname");
const upstreamTransformer = require("metro-react-native-babel-transformer");

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
    let config = defaultSVGRConfig;
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
