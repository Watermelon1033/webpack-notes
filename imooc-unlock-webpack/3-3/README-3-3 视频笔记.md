## 3-3 由浅入深 webpack -- 编译 ES6 [Babel config]

 - 第一步，利用 npm init 命令生成 package.json 文件
 - 安装 Babel:
    + 安装最新版命令: npm install babel-loader@8.0.0-beta.0 @babel/core [注: @8.0.0 是录制视频的当前最新版，自己在项目中安装最新版请自行查看版本]
    + 正常安装命令:  npm install --save-dev babel-loader babel-core 
    + 注: 运行上面的命令报错的，把 npm 的镜像从淘宝切回: npm set registry https://registry.npmjs.org/ 
    
 - Babel Presets (babel 预设规范): 
    + ES2015
    + ES2016
    + es2017
    + env
    + babel-preset-react
    + babel-preset-stage 0 - 3
 
    + 安装 presets 的命令:
        - 如果上面安装的时最新版本的 babel-loader 就可以使用这种方式安装: 
        npm install @babel/preset-env --save-dev
        - 普通安装: npm install babel-preset-env --save-dev
        
 - Babel 的 2 个插件: (实现像 Generator、Set、Map、Array.from、Array.prototype.includes 这些还不支持的函数和方法)
    + Babel Polyfill : 是全局垫片，一旦引入能在全局范围内进行调用，但是会产生对全局变量的污染，所以说是为"应用准备的"
        - 安装: npm install babel-polyfill --save 
        - 应用 import "babel-polyfill"
    + Babel Runtime Transform (运行时变换) : 局部垫片，不会污染全局变量，为 "开发框架准备的"
        - 安装: 
            + 对应上面 babel 和 presets 都是安装最新版本的方法:  
                - npm install @babel/plugin-transform-runtime --save-dev
                - npm install @babel/runtime --save
            + 普通按安装命令: 
                - npm install babel-plugin-transform-runtime --save-dev
                - npm install babel-runtime --save
        - 使用: 项目根目录新建 .babelrc 文件，配置 plugin
        