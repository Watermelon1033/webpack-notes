var webpack = require("webpack");
var path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = {
    mode: "none",
    entry: {
        pageA: "./src/pageA",
        pageB: "./src/pageB",
    },
    output: {
        // 打包后的文件路径
        path: path.resolve(__dirname, "./dist"),
        // 给打包后的文件一个名称
        filename: "[name].bundle.js",
        // chunk 文件名，如果有新的 chunk 生成时需要用到
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(["dist"])
    ],

    optimization: {
        splitChunks: {
            chunks: "all",
            name: "runtime",
            minChunks: 2
        },
        runtimeChunk: true
    }
};