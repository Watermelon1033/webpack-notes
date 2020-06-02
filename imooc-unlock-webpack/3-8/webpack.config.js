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
        chunkFilename: "[name].chunk.js",

        // 3-7 添加: 给发布的文件添加一个路径, 动态记载的代码路径是什么，
        // 也可以是绝对地址，比如上线了是线上 CDN 的地址; 此处是 dist
        publicPath: "./dist/"
    },

    /*optimization: {
        splitChunks: {
            chunks: "async"
        },
        runtimeChunk: true
    }*/
};