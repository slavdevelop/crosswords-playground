const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const modeConfig = env => require(`./utils/webpack.${env.mode}.js`)(env);
const loadPresets = require("./utils/loadPresets");

const webcomponentsjs = "./node_modules/@webcomponents/webcomponentsjs";

const polyfills = [
  {
    from: path.resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: "vendor",
    flatten: true
  },
  {
    from: path.resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: "vendor/bundles",
    flatten: true
  },
  {
    from: path.resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: "vendor",
    flatten: true
  }
];

const assets = [
  {
    from: "public/images",
    to: "assets/images"
  }
];

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./src/index.html",
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }
  }),
  new CopyWebpackPlugin([...polyfills, ...assets], {
    ignore: [".DS_Store"]
  })
];

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      output: {
        filename: "[name].[chunkhash:8].js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-syntax-dynamic-import"],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    targets: ">1%, not dead, not ie 11"
                  }
                ]
              ]
            }
          }
        ]
      },
      plugins
    },
    modeConfig({ mode, presets }),
    loadPresets({ mode, presets })
  );
};
