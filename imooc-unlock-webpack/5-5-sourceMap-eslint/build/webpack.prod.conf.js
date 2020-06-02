const path = require("path");

const webpack = require("webpack");


// Tree shaking css
const PurifyCss = require("purifycss-webpack");
const glob = require("glob-all");

// 每次打包清楚 dist 目录下的文件
const CleanWebpackPlugin = require("clean-webpack-plugin");



module.exports = {
    plugins: [
        // Tree shaking css
        new PurifyCss({
            paths: glob.sync([
                path.join(__dirname, "./index.html"),
                path.join(__dirname, "./src/*.js"),
            ])
        }),

        // 每次打包清楚 dist 目录下的文件
        new CleanWebpackPlugin(["dist"]),
    ]
};