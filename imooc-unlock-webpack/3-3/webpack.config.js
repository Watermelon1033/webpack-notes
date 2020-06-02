module.exports = {
    // 想让打包后的代码不压缩，mode 设置为 none
    // 半压缩 mode 设置为 development
    mode: "none",
    entry: {
        app: "./app.js"
    },
    output: {
        filename: "[name].[hash:8].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 建立了 .babelrc 之后 presets 里的配置都移入进去
                        /*presets: [
                            ["@babel/preset-env", {
                                targets: {
                                    browsers: ["> 1%", "last 2 versions"]
                                }
                            }]
                        ]*/
                    }
                },
                exclude: "/node_modules/",
            }
        ]

    },
}