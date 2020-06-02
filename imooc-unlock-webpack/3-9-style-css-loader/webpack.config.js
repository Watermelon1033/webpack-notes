const path = require("path");
module.exports = {
    mode: "none",
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.css$/,

                // ▲: use 数组中的执行顺序是从后往前执行的
                use: [
                    {
                        loader: "style-loader",
                        options: {

                            // 把 css 样式插入到 id = "app" 的元素下
                            // insertInto: "#app",

                            // 把 app 中导入的多个 css 合并到一个 style 中
                            // singleton: true,
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // 压缩
                            // minimize: true,

                            // css-modules: 要配合在 base.css 中的 compose 配置一起使用
                            modules: true,
                            /*
                             * 自定义 webpack 打包后的 class 名 (ident == identity)
                             * + path: 指引用的 css 路径
                             * + name: 指应用的 css 名
                             * + local: 本地样式名称(就是你要自定义的 class 名)
                             * + hash: 哈希就是制定编码方式，生成一长串编码
                             */
                            localIdentName: "[path][name]_[local]_[hash:base64:5]",
                        }
                    }
                ]
            }
        ]
    }
};