const { createTransformer, getExpoTransformer } = require("../index.js");

module.exports.transform = createTransformer(getExpoTransformer());
