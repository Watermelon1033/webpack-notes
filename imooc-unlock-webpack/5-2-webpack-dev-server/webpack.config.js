const path = require("path");

const webpack = require("webpack");

// 使用 js 转换 css 的工具 : "优化/添加前缀/压缩css"
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Tree shaking css
const PurifyCss = require("purifycss-webpack");
const glob = require("glob-all");

// 生成 html 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 优化 webpack 把 每次运行都需要编译的 runtime.bundle.js 内链到 html 里
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

// 每次打包清楚 dist 目录下的文件
const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = {
    mode: "development",
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/",
        filename: "[name].bundle-[hash:5].js",
        // chunkFilename: "[chunkhash].js"
    },

    devtool: "cheap-module-source-map",
    devServer: {
        // 子页面顶部显示打包状态
        inline: false,
        port: 9004,
        overlay: true,
        open: true,
        historyApiFallback: {
            rewrites: [
                {
                    // \/? : /出现0次或1次
                    from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
                    // context 上下文为 webpack 提供
                    to: function(context){
                        // http://localhost:9004/webpack-dev-server/pages/new
                        // http://localhost:9004/webpack-dev-server/pages/b
                        // http://localhost:9004/webpack-dev-server/pages/a
                        return "/" + context.match[1] + context.match[2] + ".html";
                    }
                }
            ]
        },
        // 代理远程端口
        proxy: {
            "/": {
                target: "https://m.weibo.cn",
                // 允许跨域
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    "^/comments": "/api/comments",
                },
                headers: {
                    // 取得微博的 cookie
                    "Cookie": '_T_WM=044532f80b8fabc6dc347fd417c33202; ALF=1517569014; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhQljxrwvAfCCZa_p.u8pB.5JpX5K-hUgL.Fo2cS0qRehBcSKM2dJLoI7HpqJ8XwBtt; SCF=AkQsXaaTywl0RziwnumQ0tVE_xW5udcpoGP43q7eb2tFW9lXRc4bVNOn9N5m_ZKwFc-Q2r4Hz5oMBAbVJuhI1uk.; SUB=_2A253SLARDeRhGedI7FQZ8CrKzjuIHXVUstBZrDV6PUJbktANLUXEkW1NVtAHXD7nHQtwFntsDZsmqj2nB17cClnd; SUHB=0k1zt1ckxYq3c6; H5_INDEX_TITLE=qbaty; H5_INDEX=0_all; WEIBOCN_FROM=1110006030; M_WEIBOCN_PARAMS=oid%3D4193586758833502%26luicode%3D20000061%26lfid%3D4193594443440569%26uicode%3D20000061%26fid%3D4193586758833502'
                }
            }
        },

        // 模块热更新(步骤1)
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        // 使用 js 转换 css 的工具 : "优化/添加前缀/压缩css"
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
                test: /\.scss/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader" },
                    {
                        // scss 文件中也需要引入 postcss-loader 主要有2点:
                        // 1. 引入 postcss-sprites 合成雪碧图
                        // 2. 合成雪碧图之后 css 的 background-image 会变化，
                        // 而且需要添加 background-position
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("postcss-sprites")({
                                    // 生成的雪碧图路径
                                    spritePath: "dist/assets/images/sprites"
                                })
                            ]
                        }
                    },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    { loader: "babel-loader" },
                ],
                exclude: "/node_modules"
            },
            {
                // html-loader 解决 html 页面中引入图片的 loader
                // 注: 因为页面中 img 的路径是和 url-loader 配置中的路径公用的，
                // 所以要先执行 url-loader 在执行此 loader
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "img:data-src"]
                        }
                    }
                ]
            },
            {
                // 配置图片相关的 loader
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    /*{
                        loader: 'file-loader',
                        options: {
                            publicPath: "",
                            outputPath: "dist/",
                            useRelativePath: true,
                        }
                    },*/
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].[ext]",
                            limit: 1000,
                            // 外部引入时的路径前缀
                            // publicPath: "",
                            // 导出时的指定路径
                            outputPath: "assets/images/"
                        }
                    },
                    {
                        // 图片压缩
                        loader: "img-loader",
                        options: {
                            plugins: [
                                require("imagemin-pngquant")({
                                    quality: 80
                                })
                            ]
                        }
                    }
                ]
            },
            {
                // 字体文件
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].[ext]",
                            // publicPath: "",
                            outputPath: "./assets/fonts",
                            useRelativePath: true,
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // 提取 css
        new MiniCssExtractPlugin({
            filename: "[name]-bundle-[hash:5].css",
        }),

        // Tree shaking css
        new PurifyCss({
            paths: glob.sync([
                path.join(__dirname, "./index.html"),
                path.join(__dirname, "./src/*.js"),
            ])
        }),

        // 引入第三方库, 如果 library 在本地文件夹还需要配置 resolve
        new webpack.ProvidePlugin({
            $: "jquery",
        }),

        // 生成 html 文件
        new HtmlWebpackPlugin({
            // 生成的 html 文件名
            filename: "index.html",
            template: "./index.html",
            minify: {
                collapseWhitespace: false,
            }
        }),

        // 内链 webpack 每次都需要运行的启动代码
        new ScriptExtHtmlWebpackPlugin({
            // 名称和 optimization --> runtimeChunk 中的名称保持一直
            inline: "runtime",
        }),

        // 每次打包清楚 dist 目录下的文件
        new CleanWebpackPlugin(["dist"]),

        // 模块热更新(步骤2)
        new webpack.HotModuleReplacementPlugin(),
        // 模块热更新(步骤3)
        new webpack.NamedModulesPlugin()
    ],

    // 第三方库在本地配置 resole
    resolve: {
        // alias 别名
        alias: {
            jquery$: path.resolve(__dirname, "src/libs/jquery.min.js"),
        }
    },

    // webpack 4 代码分割和压缩
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "common",
        },
        runtimeChunk: {
            name: "runtime",
        },
        minimize: false
    }
};