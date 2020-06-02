### 5-2 开发环境 - Webpack Dev Server - 本地 rewrite 规则
- webpack-dev-server: webpack 官方提供给我们的开发服务器，通过开发服务器可以继承非常
    多的功能，例如文件发生变化时，浏览器中打开的网页自动刷新，或者时编译完文件之后，webpack
    帮我们打开浏览器，帮我们做远程接口的请求，等等。。。
    + npm install webpack-dev-server --save-dev
    + 功能: 
        - live reloading
        - 路径重定向
        - https
        - 浏览器种显示编译错误
        - 接口代理
        - 模块热更新
    + devServer
        - inline: true/false
        - contentBase (提供内容的路径)
        - port (热更新的端口)
        - historyApiFallback (H5)
        - https 
        - proxy (远程接口的代理)
        - open: true 
        - hot (模块热更新 hot module reloading)
        - openpage (初始页面的位置，最先打开的是哪个页面)
        - lazy () 
        - overlay : 在打开的页面中给出一个遮罩，显示错误
    + historyApiFallback
    ```javascript
        module.exports = {  
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
                }      
            }
        }
   ```
    
- express/koa + webpack-dev-middleware: 让开发者更自由的配置自己的服务

 
### 5-3 开发环境 - 代理远程接口请求 (webpack 内部继承，不需要 npm 安装)
- http-proxy-middleware 
   + options:
        - target: 
        - changeOrigin
        - headers
        + logLevel
        + pathRewrite
- 通过 devServer: { proxy:  } 中设置        


### 5-4 开发环境 - 模块热更新 (Module Hot Reloading)
- 优点:
    + 保持应用的数据状态
    + 节省调试时间
    + 样式调试更快
- 设置:     
    + 在 devServer 中设置 hot: true,
    + 在 plugins 中设置 webpack.HotModuleReplacementPlugin
    + 在 plugins 中设置 webpack.NamedModulesPlugin 
- module.hot
- module.hot.accept     

### 5-5 开发环境 - 开启调试 SourceMap
- css SourceMap 还是没有成功，找不到原因

### 5-6 开发环境 - 设置 ESLint 检查代码格式
- Git Bash 安装
    + npm install eslint eslint-loader eslint-plugin-html 
        eslint-friendly-formatter --save-dev
- 配置 ESLint
    + webpack.config.js 中配置 eslint loader
    ```javascript
        module.exports = {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        { loader: "babel-loader" },
                        { 
                            loader: "eslint-loader",
                            options: {
                                formatter: require("eslint-friendly-formatter"),
                            }
                        }
                    ],
                    exclude: "/node_modules"
                }
            ]
        }
    ```    
    + 新建 .eslintrc-配置文档.js 些 eslint 相关配置
    ```javascript
        module.exports = {
            root: true,
            extends: "standard",
            plugins: [ "html" ],
            env: {
                browser: true,
                node: true,
            },
            // globals 设置全局变量
            globals: {
                $: true
            },
            rules: {
                // 规则: error/warning 给出错误提是的方式
                // 4 表示4个缩进
                indent: [ "error", 4 ],
                // 文件不需要换行
                "eol-last": ["error", "never" ]
            }
        };
    ```
- Javascript Standard Style (https://standardjs.com/) 安装 ESLint 配置
    + npm install eslint-config-standard eslint-plugin-promise --save-dev
    + npm install  eslint-plugin-standard eslint-plugin-import 
      eslint-plugin-node --save-dev
- eslint-loader 配置参数
    + options.failOnWarning
    + options.failOnError
    + options.formatter
    + options.outputReport
- devServer.overlay 在浏览器中看到错误提示 


### 5-7 开发环境 - 区分开发环境 和 生产环境 (1)
### 5-8 开发环境 - 区分开发环境 和 生产环境 (2)
- 开发环境
    + 模块热更新
    + sourceMap
    + 接口代理
    + 代码规范检查
- 生产环境
    + 提取公用代码
    + 压缩混淆
    + 文件压缩 或者是 Base64 编码
    + 去除无用的代码
- 共同点
    + 同样的入口
    + 同样的代码处理 (loader 处理)   
    + 同样的解析配置
- 如何做？
    + npm install webpack-merge -save-dev
    + 新建 build 文件夹，建立下面几个文件
        - webpack.dev.conf.js
        - webpack.prod.conf.js
        - webpack.common.conf.js
- package.json 配置
    ```json
       {
        "scripts": {
            "server": "webpack-dev-server --env development --open --conf build/webpack.common.conf.js",
            "build": "webpack --env production --config build/webpack.common.conf.js",
            "test": "echo \"Error: no test specified\" && exit 1"
          }
       }
    ```    
   

### 5-9 开发环境 - 使用 middleware 来搭建开发环境
- 如何搭建开发环境？ 首先是开发依赖
    + Express / Koa
        - npm install express --save-dev
    + npm模块之opn
        - npm install opn --save-dev
    + webpack-dev-middleware
        - npm install webpack-dev-middleware --save-dev 
    + webpack-hot-middleware
        - npm install webpack-hot-middleware --save-dev
    + http-proxy-middleware
        - npm install http-proxy-middleware --save-dev
    + connect-history-api-fallback
        - npm install connect-history-api-fallback --save--dev
    + open 自动打开
            





## 项目创建 (在 5-5文档的基础上增加)
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

- 配合场景优化 html : (把打包生成的 runtime.bundle.js 内链到我们的 index.html 中)
    + npm install script-ext-html-webpack-plugin --save-dev
    + 再 plugins 下配置 
    ```javascript
        new ScriptExtHtmlWebpackPlugin({
            inline: "runtime"
        })
    ```

- webpack watch mode (webpack 观察模式)
    + ~~Git Bash: webpack --watch (缩写: webpack -w):~~
        - ~~在 watch 后添加进度编译等参数: webpack --watch --progress --display-reasons --color~~
    + npm install clean-webpack-plugin --save-dev : 每次打包 dist 目录下的文件重新生成
    + 位置 clean-webpack-plugin 在 webpack.config.js 中: 
        - ```javascript
              const CleanWebpackPlugin = 
              new CleanWebpackPlugin(["dist"])
          ```    
- webpack-dev-server 
    + 在 webpack.config.js 中配置 devServer: 
    ```javascript
        module.exports = {
            // ...other code
            devServer: {
                port: 9001,
            }
        }
    ```
    + npm install webpack-dev-server --save-dev
    + 在 package.json 中配置，以后就可以通过: npm run server 这个配置启动运行了。
    ```json
        {
          "scripts": {
              "server": "webpack-dev-server --open"
          }
        } 
    ```
    + 在 Git Bash 中运行: npm run server
    // + 修改 webpack.config.js 中的 output 配置中的....