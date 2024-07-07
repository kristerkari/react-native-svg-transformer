const { createTransformer, reactNativeTransformer } = require("../index.js");

module.exports.transform = createTransformer(reactNativeTransformer);
