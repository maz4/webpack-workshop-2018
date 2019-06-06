const HtmlWebpackPluginh = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

module.exports = env => {
  let srcDirPath = __dirname + "/src/";
  let srcFilesArray = fs.readdirSync(srcDirPath);
  let srcFilesPathObj = {};

  srcFilesArray.forEach((file) => {
    if(file.indexOf('.js') > -1) {
      let fileName = file.slice(0, file.indexOf('.'));
      srcFilesPathObj[fileName] = './src/' + file;
    }
  });

  console.log(env);
  return {
    mode: env.mode,
    entry: {
      ...srcFilesPathObj
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].bundle.js"
    },
    plugins: [new HtmlWebpackPluginh(), new webpack.ProgressPlugin()]
  };
};
