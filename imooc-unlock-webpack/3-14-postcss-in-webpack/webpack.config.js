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
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // ▲: use 数组中的执行顺序是从后向前
                use: [
                    MiniCssExtractPlugin.loader,
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
                    "postcss-loader",
                    "less-loader",
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