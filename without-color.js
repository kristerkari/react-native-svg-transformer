var defaultTransformer = require('.');

module.exports.transform = function(src, filename, options) {
  if (typeof src === "object") {
    // handle RN >= 0.46
    ({ src, filename, options } = src);
  }

  if (options) {
    options.removeSvgColor = true;
  } else {
    options = {
      removeSvgColor: true
    };
  }

  return defaultTransformer.transform(src, filename, options);
};
