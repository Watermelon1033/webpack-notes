const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: "none",
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "./dist/",
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // ▲: use 数组中的执行顺序是从后向前
                use: [
                    MiniCssExtractPlugin.loader,
                    // {
                        // 未知原因: 释放 style-loader 编译就会报错
                        // loader: "style-loader"
                    // },
                    {
                        loader: "css-loader",
                        options: {
                            // 压缩
                            // minimize: true,
                            // css-modules
                            modules: true,
                            localIdentName: "[path][name]_[local]_[hash:base64:5]",
                        }
                    },
                    { loader: "less-loader" }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 提取的 css 文件名
            filename: "[name].min.css"
        })
    ]
};