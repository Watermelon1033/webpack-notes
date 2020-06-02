## 3-14 由浅入深 webpack -- 处理 CSS - PostCSS-in-webpack 
**PostCSS: A tool for transforming CSS with JavaScript 
    (使用 javascript 转换 CSS 的工具)**
- 需要安装
    + postcss
    + postcss-loader
    + Autoprefixer     加浏览器前缀
    + postcss-cssnano  优化/压缩 css 
    + ~~postcss-cssnext : 被 webpack 4 弃用，~~ 改为使用postcss-preset-env
     ~~postcss-cssnext  可以使用新的 css 语法像 
             - CSS Variables (css 变量)
             - custom selectors (自定义选择器)
             - calc(动态计算)
             - 这个插件中包含了 autoprefixer~~
     + postcss-preset-env: 使用 postcss-preset-env 
        - (1).Git bash 安装: npm install postcss-preset-env --save-dev
        - (2).在项目根目录下添加 .browserlistrc 文件，并添加如下配置
        ```javascript
           // 这里的配置根据项目自由选择
           1% in CN
           android >= 4.4
           ios >= 8
           not ie <= 11
        ```
        - (3).配置 postcss.config.js
        ```javascript
           module.exports = {
               loader: "postcss-loader",
               plugins: {
                   "postcss-preset-env": {},
               }
           }
        ```
        - (4).配置 webpack.config.js
        ```javascript
           module.exports = {
            mode: "none",
            entry: {},
            output: {},
            module: {
                rules: [
                    {
                        test: /\.scss$/,
                        // ▲: use 数组中的执行顺序是从后向前
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true,
                                    importLoaders: 1
                                }
                            },
                            "postcss-loader",
                            // 注意此处: scss/less 必须先用对应的 loader转化成 css 才能用 postcss-loader处理
                            "sass-loader"
                        ]
                    },
                    {
                        test: /\.css$/,
                        // ▲: use 数组中的执行顺序是从后向前
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    minimize: true,
                                    importLoaders: 1
                                }
                            },
                            "postcss-loader",
                        ]
                    },
                    
                ]
            }
           }
        ```
 
 

## ~~~~~~~~~~~~~~~~~~~~~~
### 创建项目
- Git Bash: touch .gitignore
- Git Bash: npm init
- Git Bash: npm install webpack webpack-cli --save-dev
- Git Bash: npm install style-loader css-loader --save-dev
- Git Bash: npm install less-loader less --save-dev
_ Git Bash: npm install sass-loader node-sass --save-dev
- 项目中创建  webpack.config.js
- npm install mini-css-extract-plugin --save-dev
- Git Bash: npm install postcss postcss-loader autoprefixer cssnano postcss-preset-env --save-dev
- 创建 postcss 需要的相关文件: postcss.config.js 和 .browserlistrc 