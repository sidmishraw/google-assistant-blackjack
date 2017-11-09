/**
* webpack.config.js
* @author Sidharth Mishra
* @description Webpack configuration for using ES6 for BlackJack game
* @created Wed Nov 08 2017 18:17:23 GMT-0800 (PST)
* @copyright 2017 Sidharth Mishra
* @last-modified Wed Nov 08 2017 18:17:23 GMT-0800 (PST)
*/

//# imports CommonJS style
const path = require("path");
const webpack = require("webpack");
//# imports CommonJS style

const webpackconfig = {
  //# entry point used by Webpack for generating dependency graph
  entry: {
    blackjack: path.join(__dirname, "src", "blackjack.js")
  },
  //# entry point used by Webpack for generating dependency graph

  //# output library configuration
  output: {
    filename: "./dist/[name].bundle.js",
    libraryTarget: "umd",
    library: ["[name]"],
    umdNamedDefine: true
  },
  //# output library configuration

  //# module configuration
  module: {
    loaders: [
      //# for ES6 using babel
      {
        test: /\.js$/i,
        loader: "babel-loader",
        exclude: /node_modules/i,
        query: {
          presets: ["env"]
        }
      }
      //# for ES6 using babel
    ]
  },
  //# module configuration
  //# target setting
  target: "node" // this tells Webpack that the bundle doesn't need to contain node platform stuff
  //# target setting
};

//# export webpack configuration
module.exports = webpackconfig;
//# export webpack configuration
