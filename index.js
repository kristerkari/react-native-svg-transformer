var semver = require("semver");
var svgr = require("@svgr/core").default;
var resolveConfig = require("@svgr/core").resolveConfig;

var upstreamTransformer = null;

var reactNativeVersionString = require("react-native/package.json").version;
var reactNativeMinorVersion = semver(reactNativeVersionString).minor;

if (reactNativeMinorVersion >= 59) {
  upstreamTransformer = require("metro-react-native-babel-transformer");
} else if (reactNativeMinorVersion >= 56) {
  upstreamTransformer = require("metro/src/reactNativeTransformer");
} else if (reactNativeMinorVersion >= 52) {
  upstreamTransformer = require("metro/src/transformer");
} else if (reactNativeMinorVersion >= 47) {
  upstreamTransformer = require("metro-bundler/src/transformer");
} else if (reactNativeMinorVersion === 46) {
  upstreamTransformer = require("metro-bundler/build/transformer");
} else {
  // handle RN <= 0.45
  var oldUpstreamTransformer = require("react-native/packager/transformer");
  upstreamTransformer = {
    transform({ src, filename, options }) {
      return oldUpstreamTransformer.transform(src, filename, options);
    }
  };
}

// xlink:href is supported in react-native-svg
// starting from version 9.0.4.
//
// TODO: remove this fix in v1.0.0.
function xlinkHrefToHref(svgrOutput) {
  return svgrOutput.replace(/xlinkHref=/g, "href=");
}

function xmlnsSvgToXmlns(svgrOutput) {
  return svgrOutput.replace(/xmlns:svg=/gi, "xmlns=");
}

function fixRenderingBugs(svgrOutput) {
  return xmlnsSvgToXmlns(xlinkHrefToHref(svgrOutput));
}

module.exports.transform = function(src, filename, options) {
  if (typeof src === "object") {
    // handle RN >= 0.46
    ({ src, filename, options } = src);
  }

  if (filename.endsWith(".svg") || filename.endsWith(".svgx")) {
    var config = resolveConfig.sync(process.cwd());
    var defaultsvgrConfig = { native: true };
    var svgrConfig = config
      ? Object.assign({}, defaultsvgrConfig, config)
      : defaultsvgrConfig;
    var jsCode = svgr.sync(src, svgrConfig);
    return upstreamTransformer.transform({
      src: fixRenderingBugs(jsCode),
      filename,
      options
    });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
