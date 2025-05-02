const { createTransformer, getReactNativeTransformer } = require("../index.js");

module.exports.transform = createTransformer(getReactNativeTransformer());
