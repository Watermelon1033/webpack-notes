### 4-5 html in webpack (1) - 生成 HTML 
- HtmlWebpackPlugin
    + npm install html-webpack-plugin --save-dev
    + options:
        - template
        - filename
        - minify
        - chunks
            
### 4-6 html in webpack (2) - HTML 中引入图片
- html-loader
    + npm install html-loader --save-dev
    + options: 
        - attrs: [img: src]
### 4-7 html in webpack (3) - 配合优化
- 提前载入 webpack 的加载代码
    + // inline-manifest-webpack-plugin (把 webpack 生成的代码插入到 html 中 )
    + // html-webpack-inline-chunk-plugin (把各种 chunk(文件) 的内容直接插入 html 中)
    + script-ext-html-webpack-plugin  (把打包生成的 runtime.bundle.js 内链到我们的 index.html 中)





## 项目创建 (在 4-1~4 文档的基础上增加 htmlWebpackPlugin)
- Git Bash: touch .gitignore
- Git Bash: npm init --yes
- Git Bash: npm install webpack webpack-cli --save-dev
- 文件内创建: webpack.config.js 并添加配置
- 文件内创建项目结构并添加内容
- 安装 style/css/scss loader
    + Git Bash: npm install style-loader css-loader --save-dev
    + Git Bash: npm install sass-loader node-sass --save-dev
- 安装 mini-css-extract-plugin 来提取 css
    + npm install mini-css-extract-plugin --save-dev
    + 在 webpack.config.js 中配置 mini-css-extract-plugin
    ```javascript
      const MiniCssExtractPlugin = require("mini-css-extract-plugin");
      new MiniCssExtractPlugin({
          // 提取的 css 文件名
          filename: "[name].min.css"
      })
    ```
- 安装 postscss 插件来 "优化/添加前缀/压缩css"
    + npm install postcss postcss-loader autoprefixer cssnano 
    postcss-preset-env --save-dev
    + 创建 postcss 需要的相关文件: postcss.config.js 和 .browserlistrc


- 添加 loadsh 并利用 babe-loader 来 JS Tree Shaking
    + Git Bash: npm install babel-loader --save-dev
    + Git Bash: npm install @babel/core @babel/preset-env --save-dev 
    + webpack.config.js 中配置 babel-loader
    + 创建 .babelrc 并添加配置
    + Git Bash: npm install babel-plugin-lodash --save-dev
    + 在 package.json 中添加 "sideEffects":false; 来配置 Tree Shaking

- 安装 purify-css 来 Tree shaking CSS
    + npm install purify-css purifycss-webpack glob-all --save-dev
    + 在 webpack.config.js 中配置
    ```javascript
        const PurifyCSS = require("purifycss-webpack");
        const glob = require('glob-all');
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, "./index.html"),
                path.join(__dirname, "./src/*.js")
            ])
        })
    ```

- 安装图片相关的 loader
    + npm install file-loader url-loader img-loader postcss-sprites 
      --save-dev
    + npm install imagemin --save-dev (img-loader 压缩图片的依赖)
    + npm install imagemin-pngquant --save-dev 
    + 再 图片对应的loader 中配置 imgemin-pngquant
- 配置雪碧图: (自动合成雪碧图 postcss-sprites) 配置写在对应的 sass-loader 内。

- 处理字体文件 (和 base64 一样使用 url-loader)
    + 配置见 module --> rules --> { test: /\.(eot|woff2?|ttf|svg)/, ...... }
    
- 引入第三方 js 库

- 生成 html 文件
    + npm install html-webpack-plugin --save-dev
    + 配置 plugins: 
    ```javascript
        const htmlWebpackPlugin = require("html-webpack-plugin");
        module.exports = {
            // ... other coder
            plugs: [
                new htmlWebpackPlugin({
                    // 编译生成后的 html 文件也可以指定 hash (哈希)
                    filename: "index.html",
                    // 模板文件
                    template: "./index.html",
                    // 指定把编译后的 js/css 放在 "head"||"body"||false 标签中
                    inject: "body",
                    // 上线压缩 : 这些配置可以去 github 的 html-webpack-plugin 库中查看
                    minify: {
                        removeComments: false,
                        // 删除空格
                        collapseWhitespace: false,
                    }
                })
            ]
        }
    ```
     
- html 中引入图片
    + npm install html-loader --save-dev
    + 配置 rules --> loader

- 配合场景优化 html : 
    + npm install script-ext-html-webpack-plugin --save-dev
    + 再 plugins 下配置 
    ```javascript
        new ScriptExtHtmlWebpackPlugin({
            inline: "runtime"
        })
    ```
    
