const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageMeta = require("./package.json");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.jsx",
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader", // will use .babelrc
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: packageMeta.title,
    }),
  ],
};
