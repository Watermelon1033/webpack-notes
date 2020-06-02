## 3-4 由浅入深 webpack -- 编译 typescript [TS-loader]

- 在 webpack 中使用 TypeScript 需要 Typescript-loader
    + 官方推荐的 npm:  npm install typescript ts-loader --save-dev
    + 第三方的 loader: npm install typescript awesome-typescript-loader --save-dev
- 创建并配置: tsconfig.json
    + 配置选项: 官网/docs/handbook/compiler-options.html
    + 常用选项: 
        - compilerOptions  编译选项
        - include  告诉编译器需要编译的路径
        - exclude  不需要编译的路径   
- 项目创建过程
    + npm init --yes  创建 package.json
    + npm install webpack webpack-cli --save-dev
    + npm install lodash --save
    + npm install typescript ts-loader awesome-typescript-loader --save-dev 
