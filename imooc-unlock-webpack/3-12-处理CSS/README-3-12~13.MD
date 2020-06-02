## 3-12 由浅入深 webpack -- 处理 CSS - 配置 Less-Sass
- 安装 less / sass
    + npm install less-loader less --save-dev
    + npm install sass-loader node-sass --save-dev
- webpack.config.js 中 配置匹配 less 的正则，和下面的 loader 加载器 
- 其他配置项见 src 下的对应文件



## 3-13 由浅入深 webpack -- 处理 CSS - 提取 CSS
- 提取 CSS 的两种方法
    + --> extract-loader
    + --> mini-css-extract-plugin (将CSS提取为独立的文件的插件，对每个包含css的js
        文件都会创建一个CSS文件，支持按需加载css和sourceMap)
        - npm install mini-css-extract-plugin --save-dev
- 配置 mini-css-extract-plugin 见 webpack.config.js 文件




### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#### 创建项目:
+ touch .gitignore
+ npm init --yes
+ npm install webpack webpack-cli --save-dev
+ npm install style-loader css-loader --save-dev
+ npm install less-loader less --save-dev
+ npm install sass-loader node-sass --save-dev
+ 文件中创建 webpack.config.js
+ npm install mini-css-extract-plugin --save-dev
