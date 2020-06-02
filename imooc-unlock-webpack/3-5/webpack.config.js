var webpack = require("webpack");
var path = require("path");
module.exports = {
    mode: "none",
    entry: {
        pageA: "./src/pageA"
    },
    output: {
        // 打包后的文件路径
        path: path.resolve(__dirname, "./dist"),
        // 给打包后的文件一个名称
        filename: "[name].bundle.js",
        // chunk 文件名，如果有新的 chunk 生成时需要用到
        chunkFilename: "[name].chunk.js"
    },
    // splitChunks 和 runtimeChunk 为提取公用 js 代码的配置
    optimization: {
        splitChunks: {
            chunks: "async"
        },
        runtimeChunk: true
    }
};