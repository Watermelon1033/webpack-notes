### 6-1 Webpack 实战场景 -- 分析打包结果
- 2个工具
    + Official Analyse Tool (官方分析工具)
        - 1.生成 stats.json 文件, Git Bash 下输出命令: webpack --profile --json > stats.json
        - 2.进入到 http://webpack.github.io/analyse/ 把生成的 stats.json 传入 
    + webpack-bundle-analyzer
        - 第一种用法: 安装插件: BundleAnalyzerPlugin: npm install webpack-bundle-analyzer --save-dev
        - 第二种用法: Git Bash: webpack-bundle-analyzer stats.json



## 项目代码
- 使用 3-7(代码分割) 项目的代码