const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require("webpack");
const PurifyCss = require("purifycss-webpack");
const glob = require("glob-all");


module.exports = {
    mode: "none",
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "./dist/",
        filename: "[name].bundle.js"
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
                        // 自动合成雪碧图: postcss-sprites
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
                            name: "[name]-[hash:5].[ext]",
                            // limit：文件小于limit参数，url-loader将会把文件转为DataURL；文件大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。
                            limit: 100,
                            // publicPath：表示打包文件中引用文件的路径前缀，如果你的图片存放在CDN上，那么你上线时可以加上这个参数，值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了
                            publicPath: "./assets/images/sprites",
                            // outputPath：表示输出文件路径前缀。图片经过url-loader打包都会打包到指定的输出文件夹下。但是我们可以指定图片在输出文件夹下的路径。比如outputPath=img/，图片被打包时，就会在输出文件夹下新建（如果没有）一个名为img的文件夹，把图片放到里面。
                            outputPath: "",
                            // 会保存打包之前的 assets/images/*.jpg 这个路径
                            useRelativePath: true
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
        new MiniCssExtractPlugin({
            // 提取的 css 文件名
            filename: "[name].css",
        }),
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
        })
    ]

};