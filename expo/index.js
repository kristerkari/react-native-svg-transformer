const { createTransformer, expoTransformer } = require("../index.js");

module.exports.transform = createTransformer(expoTransformer);
