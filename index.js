var semver = require("semver");
var svgr = require("@svgr/core").default;

var upstreamTransformer = null;

var reactNativeVersionString = require("react-native/package.json").version;
var reactNativeMinorVersion = semver(reactNativeVersionString).minor;

if (reactNativeMinorVersion >= 56) {
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

function xlinkHrefToHref(svgrOutput) {
  return svgrOutput.replace(/xlinkHref=/g, "href=");
}

function xmlnsSvgToXmlns(svgrOutput) {
  return svgrOutput.replace(/xmlns:svg=/gi, "xmlns=");
}

function removeColor(svgrOutput) {
  return svgrOutput.replace(/fill=\"([#0-9a-fA-F]+)\"/gi, '');
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
    var jsCode = svgr.sync(src, { native: true });
    if (options.removeSvgColor) {
      delete options.removeSvgColor;
      jsCode = removeColor(jsCode);
    }
    return upstreamTransformer.transform({
      src: fixRenderingBugs(jsCode),
      filename,
      options
    });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
