let fs = require('fs');
let path = require('path');
const webpack = require("webpack");

let devMode = process.env.NODE_ENV == 'development';

module.exports = function () {
  const fse = require('fs-extra');
  const srcDirPath = __dirname + "/src/frontend/js/react/apps/";
  const srcFilesArray = fs.readdirSync(srcDirPath);
  let srcFilesPathObj = {};

  // create object with names and sources of the start files
  srcFilesArray.forEach((file) => {
      if (file.indexOf('.js') > -1) {
          let fileName = path.basename(srcDirPath + file, 'js');
          srcFilesPathObj[fileName] = srcDirPath + file;
      }
  });

  let webpackConfig = {
    mode: devMode ? 'development' : 'production',
    watch: devMode,
    devtool: devMode ? "cheap-inline-module-source-map" : process.env.NODE_ENV == 'production' ? 'source-map' : false,
    cache: devMode,
    watchOptions: {
      aggregateTimeout: 10,
      ignored: /node_modules/
    },

    entries: {
      ...srcFilesPathObj
    },

    output: {
      path: path.join(__dirname, 'public_html/assets/js/react'),
      filename: "[name].bundle.js"
    },

    module: {
      rules:   [],
    },

    plugins: [new webpack.ProgressPlugin()],
  };

  return webpackConfig;
};