const productionConfig = require("./webpack.prod.conf");
const developmentConfig = require("./webpack.dev.conf");

const path = require("path");
const webpack = require("webpack");

// 使用 js 转换 css 的工具 : "优化/添加前缀/压缩css"
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 生成 html 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// merge 插件，合并生产环境和开发环境
const merge = require("webpack-merge");

const generateConfig = function (env) {

    // 提取 loader
    const scriptLoader = [
        {
            loader: 'babel-loader',
        }
    ].concat(env === "production"
        ? [] : [
            {
                loader: "eslint-loader",
                options: {
                    formatter: require("eslint-friendly-formatter"),
                }
            }
        ]
    );

    const sassLoader = [
        { loader: MiniCssExtractPlugin.loader },
        {
            loader: "css-loader",
            options: {
                sourceMap: env === "development",
            }
        },
        {
            loader: "postcss-loader",
            options: {
                ident: "postcss",
                // css SourceMap
                sourceMap: env === "development",
                plugins: [
                   env === "production"
                       ? require("postcss-sprites")({
                           // 生成的雪碧图路径
                           spritePath: "dist/assets/images/sprites"
                       })
                       : [],
                ]
            }
        },
        {
            loader: "sass-loader",
            options: {
                sourceMap: env === "development",
            }
        }
    ];

    const cssLoader = [
        { loader: "style-loader", },
        { loader: "css-loader", },
        {
            // 使用 js 转换 css 的工具 : "优化/添加前缀/压缩css"
            loader: "postcss-loader",
            options: {
                ident: "postcss",
                // css SourceMap
                sourceMap: env === "development",
                plugins: [
                    env === "production"
                        ? require("postcss-sprites")({
                            // 生成的雪碧图路径
                            spritePath: "dist/assets/images/sprites"
                        })
                        : [],
                ]
            }
        }
    ];

    const fileLoader =  function (path) {
        return env === "development"
        ? [{
            loader: 'file-loader',
            options: {
                name: "[name]-[hash:5].[ext]",
                outputPath: path,
            }
        }]
        : [{
            loader: "url-loader",
            options: {
                name: "[name]-[hash:5].[ext]",
                limit: 1000,
                outputPath: path
            }
        }]
    };

    return {
        entry: {
            app: "./src/app.js"
        },
        output: {
            path: path.resolve(__dirname, "../dist"),
            // publicPath: "/",
            filename: "[name].bundle-[hash:5].js",
            // chunkFilename: "[chunkhash].js"
        },

        // 第三方库在本地配置 resole
        resolve: {
            // alias 别名
            alias: {
                jquery$: path.resolve(__dirname, "../src/libs/jquery.min.js"),
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, "../src")],
                    exclude: [path.resolve(__dirname, "../src/libs")],
                    use: scriptLoader
                },

                {
                    test: /\.css$/,
                    use: cssLoader,
                },

                {
                    test: /\.scss$/,
                    use: sassLoader,
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
                    use: fileLoader("assets/images/").concat(
                        env === "production"
                        ? {
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
                        : []
                    )
                },
                {
                    // 字体文件
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: fileLoader("assets/images/")
                }
            ]
        },

        plugins: [
            // 提取 css
            new MiniCssExtractPlugin({
                filename: "[name]-bundle-[hash:5].css",
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
        ],

    };
};

module.exports = function (env) {
    let config = env === "production"
        ? productionConfig
        : developmentConfig;
    // 把上面的 generateConfig 和 我们的
    // productionConfig / developmentConfig 文件合并
    return merge(generateConfig(env), config)
};