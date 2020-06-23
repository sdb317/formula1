// Pull in dependencies
var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname,

  module: {
    rules: [
      // A regexp that tells webpack use the following loaders on all .js and .jsx files
      {
        test: /\.jsx?$/,
        // Ignore these folders
        exclude: [
          path.resolve(__dirname, "dist"),
          path.resolve(__dirname, "node_modules"),
          /\.bundle\./
        ],
        // Use the babel loader
        loader: "babel-loader",
        query: {
        }
      }
    ]
  },
  externals:{
    "LOG_LEVEL": '"debug"'
  },

  plugins: [
  ],

  resolve: {
    // Extensions that should be used to resolve modules
    extensions: [".js", ".jsx"]
  },

};