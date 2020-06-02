## 3-15 由浅入深 webpack -- Tree-shaking - JS Tree-shaking
- JS Three Shaking (摇树: 打包项目时去除没有引用的多余代码)
    **webpack 4 不会配置，删除不掉未引用的代码**
    + 使用场景:
        - 常规优化
        - 引入第三方库的某一个功能
    + 需要的插件(webpack 自带功能): ~~Webpack.optimize.uglifyJS~~ 

## 3-16 由浅入深 webpack -- Tree-shaking - CSS Tree-shaking          
- CSS Tree Shaking 
    + Purify CSS : 他们为 webpack 开发了一个抓门的 purifycss-webpack
    + npm install purify-css --save-dev
    + npm install purifycss-webpack --save-dev
        - 配置 options: 
            + path: glob.sync([]) : 传入多个文件的路径
            + npm install glob-all --save-dev




## 创建 创建项目 
- Git Bash: touch .gitignore
- Git Bash: npm init
- 项目中创建  webpack.config.js
- Git Bash: npm install webpack webpack-cli --save-dev
- Git Bash安装 css & style loader: npm install style-loader css-loader --save-dev
- Git Bash安装 scss loader: npm install sass-loader node-sass --save-dev
- Git Bash安装提取 css 的插件:  npm install mini-css-extract-plugin --save-dev
- Git Bash安装 PostCss 插件:   npm install postcss postcss-loader autoprefixer 
    cssnano postcss-preset-env --save-dev
- 创建 postcss 需要的相关文件: postcss.config.js 和 .browserlistrc 
- 在 webpack.config.js 中配置
- Git Bash: npm install babel-loader --save-dev
- Git Bash: npm install @babel/core @babel/preset-env --save-dev    
    [注: 181206 为什么安装最新版的 babel-core 和 babel-preset-env 
    这个问题的解答详见: 3-3 文档中的 README.md 。] 
- Git Bash: npm install babel-plugin-lodash --save-dev
- 在 webpack.config.js 中配置 babel-loader
- 创建 .babelrc 添加配置 (注: 因为安装的时是最新的 babel-preset-env 所以配置也要对应)
- 配置 Tree Shaking : 在 package.json 中添加 "sideEffects": false

## 注: 截至到这一步 webpack 4 还是未能删除未使用的 js 代码

- 接着上面的配置来 Tree shaking css 
    + npm install purify-css --save-dev
    + npm install purifycss-webpack glob-all --save-dev
    + 在 webpack.config.js 中 引入 purifycss-webpack 和 glob-all
     接着在 plugins 中配置 : new PurifyCss({  })




