const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require("webpack");
const PurifyCss = require("purifycss-webpack");
const glob = require("glob-all");


const HtmlWebpackPlugin = require("html-webpack-plugin");

const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = {
    mode: "none",
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        /*publicPath: "./dist/",*/
        filename: "[name].bundle-[hash:5].js",
        /*chunkFilename: "[chunkhash].js"*/
    },
    module: {
        rules: [
            {
                test: /\.css$/,
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
                    { loader: "css-loader" },
                    {
                        // 把图片合成一张图 (自动合成雪碧图: postcss-sprites)
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("postcss-sprites")({
                                    // 给出生成的雪碧图路径
                                    spritePath: "dist/assets/images/sprites"
                                }),
                            ]
                        }
                    },
                    { loader: "sass-loader" },
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
                        //  background 中加载图片的 loader
                        loader: "file-loader",
                        options: {
                            // 公共路径为空的意思: 把下面 outputPath 中的配置覆盖，使 html 中加载正常
                            publicPath: "",
                            // 输出路径，即输出到哪个文件夹下
                            outputPath: "dist/",
                            // 相对路径是: 保存 css 文件所在的相对路径
                            useRelativePath: true,
                        }
                    },*/
                    {
                        // 把图片转成 base64 编码，直接保存在 css 文件中
                        loader: "url-loader",
                        options: {
                            // 自定义生成的图片名
                            name: "sprites/[name]-[hash:5].[ext]",
                            // limit：文件小于limit参数，url-loader将会把文件转为DataURL；文件大于limit，url-loader会调用
                            // file-loader进行处理，参数也会直接传给file-loader。
                            limit: 1000,

                            // publicPath：表示打包文件中引用文件的路径前缀，如果你的图片存放在CDN上，那么你上线时可以加上这个参数，
                            // 值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了
                            // publicPath: "",

                            // outputPath：表示输出文件路径前缀。图片经过url-loader打包都会打包到指定的输出文件夹下。但是
                            // 我们可以指定图片在输出文件夹下的路径。比如outputPath=img/，图片被打包时，就会在输出文件夹
                            // 下新建（如果没有）一个名为img的文件夹，把图片放到里面。
                            outputPath: "./assets/images/",
                            // 会保存打包之前的 assets/images/*.jpg 这个路径
                            // useRelativePath: true
                        }
                    },
                    {
                        // 图片压缩
                        loader: "img-loader",
                        options: {
                            plugins: [
                                require("imagemin-pngquant")({
                                    // 设置压缩图片的质量
                                    quality: 80
                                })
                            ]
                        }
                    },
                ]
            },

            {
                // 字体文件
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // 并未生成字体文件，
                            name: "[name]-[hash:5].[ext]",
                            publicPath: "./assets/fonts",
                            outputPath: "",
                            useRelativePath: true
                        }
                    }
                ]
            },
        ]
    },

    // resolve 解析
    resolve: {
        // alias 别名
        alias: {
            // 指定本地 jquery 的路径, jquery$ 和下面的 webpack.ProvidePlugin 中的配置相对应
            jquery$: path.resolve(__dirname, "src/libs/jquery.min.js")
        }
    },

    plugins: [
        // 提取 css
        new MiniCssExtractPlugin({
            // 提取的 css 文件名
            filename: "[name]-bundle-[hash:5].css",
        }),

        // Tree shaking CSS
        new PurifyCss({
            paths: glob.sync([
                path.join(__dirname, "./index.html"),
                path.join(__dirname, "./src/*.js")
            ])
        }),

        /**
         * webpack.ProvidePlugin 引入第三方库分2种情况:
         * (1) 如果第三方库(e.g: jquery)是 npm install xxx --save 安装到
         *      node_modules 中的，按照下面这种 ($: "jquery") 配置就可以了。
         * (2) 如果第三方库在自己本地目录(eg: libs --> jquery.min.js)中，
         *      下面这里配置好，还要配置上面的 resolve (解析本地路径)
         * */
        new webpack.ProvidePlugin({
            // 配置完毕之后 js 中就不需要用 import 导入了
            $: "jquery"
        }),


        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
            // 当值为 false 时不允许生成的 css & js 插入到 index.html 中，(注:
            // 这里的前提是我们在 template 已经自己写了 css 和 js 的引用)
            /*inject: true,*/
            // chunks: "index",
            minify: {
                collapseWhitespace: false,
            }
        }),

        /**
         * 注意一定要在 html-webpack-plugin 之后引用, 只有 module --> rules -->
         * 下的 loader 解析顺序是从后向前，其他皆是从前向后 )
         * script-extension for html webpack plugin :  to add `async`, `defer` or
         * `module` attributes to your <script> elements, or even inline them (添
         * 加 async, defer 或 module 属性到 <scripts> 元素，甚至内联他们
         * */
        new ScriptExtHtmlWebpackPlugin({
            // 名称和 runtimeChunk 中的 name 保持一致，
            inline: "runtime"
        }),
    ],

    optimization: {
        // splitChunks 和 runtimeChunk 为提取公共 js 代码的配置
        splitChunks: {
            // 默认 Webpack 4 只会对按需加载的代码做分割。如果我们需要配置初始加载的代码也加入到代码分割(code splitting)中，
            // 可以设置 splitChunks.chunks 为 'all'。
            chunks: "all",
            // 不知道为什么，打包后的 dist 目录里没有 common.bundle.js 文件 ??
            name: "common"
        },
        /**
         * RuntimeChunk (manifest)
         *   webpack 4 提供了 runtimeChunk 让我们方便的提取 manifest(清单),它的作用
         * 是将包含 chunks 映射关系的 list 单独从 app.js 里提取出来，因为每一个 chunk
         * 的 id 基本都是基于内容 hash 出来的，所以你每次改动都会影响它，如果不将它提取
         * 出来的话，等于 app.js 每次都会改变。缓存就会失效。
         *   单独抽离 runtimeChunk 之后，每次打包都会生成一个 runtimeChunk.xxx.js
         * (默认名，可自行修改)
         * */
        runtimeChunk: {
            name: "runtime",
        },
        // 告诉 webpack 是否开启代码最小化压缩
        minimize: false
    }

};