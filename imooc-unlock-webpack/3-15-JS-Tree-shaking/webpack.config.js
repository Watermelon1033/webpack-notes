const path = require("path");
const Webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PurifyCSS = require("purifycss-webpack");
const glob = require('glob-all');

module.exports = {
    mode: "production",
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        // publicPath: "./dist/",
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.join(__dirname, "./postcss.config.js")
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader",
                        // css tree shaking 不能和 css modules 一起使用，如果想一起使用
                        // 需要设置 purifyCSS 的 options, 但是目前还不会设置
                       /* options: {
                            minimize: false,
                            modules: true,
                            localIdentName: "[path][name]_[local]_[hash:base64:5]",
                        }*/
                    },
                    // 这里是 sass-loader 不是 scss-loader 切记
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {loader: "babel-loader",}
                ],
                exclude: "/node_modules/",
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 提取的 css 文件名
            filename: "[name].css"
        }),
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, "./index.html"),
                path.join(__dirname, "./src/*.js")
            ])
        })
    ],

    optimization: {
        // splitChunks 和 runtimeChunk 为提取公用 js 代码的配置
        splitChunks: {
            chunks: "all",
            name: "common"
        },
        runtimeChunk: {
            name: "runtime",
        },
        // 告诉 webpack 是否开启代码最小化压缩
        minimize: false,
    }

};