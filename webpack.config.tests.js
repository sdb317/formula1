var path = require("path");
var webpackConfig = require("./webpack.config");

var target = "tests";

module.exports = Object.assign({}, webpackConfig, {
  entry: [
    "babel-polyfill",
    "./src/Tests/" + target // The is the entry point. The extensions will be specified later in the `resolve` section.
  ],

  output: {
    path: __dirname,
    filename: "src/Tests/" + target + ".bundle.js" // This is where the compiled bundle will be stored.
  },

  devtool: "source-map",

  devServer: {
    contentBase: path.resolve("."),
    inline: true,
    historyApiFallback: {
      index: "tests.html"
    },
    proxy: {
    }
  }
});

// .\node_modules\.bin\webpack-dev-server --config webpack.config.tests.js --port 8082
