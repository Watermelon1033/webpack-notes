### 4-1 文件处理 (1) - 图片处理 - CSS 中引入图片， Base64 编码 [webpack watch]
- CSS 中引入的图片: file-loader
- 自动合成雪碧图: postcss-sprites
- 压缩图片: img-loader
- Base64 编码: url-loader


### 4-2 文件处理 (2) - 图片处理 - 压缩图片、自动合成雪碧图 sprite、retina 处理 [Webpack-dev-server historyApiFallback]
### 4-3 文件处理 (3) - 处理字体文件 [Webpack-dev-server proxy]
### 4-4 文件处理 (4) - 处理第三方 JS 库 (providePlugin、 imports-loader) [模块热更新]
- 如何处理第三方的 js 库？ 
    - 第一种方式，插件实现: webpack.providePlugin
        + 如果通过 npm install jquery --save 这样引入第三方库的配置:
            - 配置 webpack.config.js 中的 plugins 
            ```javascript
               module.exports = {
                   plugins: [
                      //...
                      new webpack.ProvidePlugin({
                          // 配置完毕之后 js 中就不需要用 import 导入了
                          $: "jquery"
                      })
                   ]
               }
            ```
        + 如果是引入本地文件夹中的第三方库，例如 libs --> jquery.min.js
            - 上面的 plugins 引入，再 添加 resolve 配置在 webpack.config.js 中
              ```javascript
                  module.exports = {
                      resolve: {
                          // alias 别名
                          alias: {
                              // 指定本地 jquery 的路径, jquery$ 和下面的 webpack.ProvidePlugin 中的配置相对应
                              jquery$: path.resolve(__dirname, "src/libs/jquery.min.js")
                          }
                      }
                  }    
              ```  
    - 第二种方式: imports-loader
        + npm install imports-loader --save-dev
        ```javascript
        module.exports = {
              module: {
                  // resolve 解析
                  resolve: {
                      // alias 别名
                      alias: {
                          // 指定本地 jquery 的路径, jquery$ 和下面的 imports-loader 中的配置相对应
                          jquery$: path.resolve(__dirname, "src/libs/jquery.min.js")
                      }
                  },
                  rules: [
                      //... other coder
                      {
                          // 明确指定针对哪个模块
                          test: path.resolve(__dirname, "src/app.js"),
                          use: [
                              {
                                  loader: "imports-loader",
                                  options: {
                                      // 此处配置和 webpack.ProvidePlugin 配置相同: 首先会解析 resolve 
                                      // 中是否配置了 jquery, 如果没有在检查 node_modules 中
                                      // 是否全局安装了jquery (npm install jquery --save)
                                      $: "jquery"
                                  }
                              }
                          ]
                      }
                  ]
              }
        }
        ```
    - 直接使用 window 对象





## 创建项目
- Git Bash: touch .gitignore
- Git Bash: npm init --yes
- Git Bash: npm install webpack webpack-cli --save-dev
- 文件内创建: webpack.config.js 并添加配置

- 文件内创建项目结构并添加内容
```base
    |- node_modules
    |- src
        |- assets
            |- fonts
                |- 
            |- imgs
                |- 1@2x.png
                |- 2@2x.png
                |- 3@2x.png
                |- 4@2x.png
                |- elephant.png
        |- common
            |- utils.js
        |- components
            |- a.js
        |- css
            |- components
                |- a.scss
            |- base.scss
            |- common.scss
        |- libs
            |- jquery.min.js
        |- app.js
    |- .gitignore
    |- index.html
    |- package.json
    |- package-lock.json
    |- README-4-1.MD
    |- webpack.config.js
```

- 安装 style/css/scss loader
    + Git Bash: npm install style-loader css-loader --save-dev
    + Git Bash: npm install sass-loader node-sass --save-dev
- 安装 mini-cs-extract-plugin 来提取 css
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
    + 见上面 