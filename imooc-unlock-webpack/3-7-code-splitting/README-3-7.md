### 3-7 由浅入深 webpack -- 代码分割 和 懒加载 (1)
#### 代码分割 && 懒加载
- 在 webpack 中并不是通过配置来实现这2个功能，而是通过改变写代码的方式，当我们需要
一个模块的时候我们要告诉 webpack 这个模块是需要懒加载，或者是切分代码；在 webpack
 中可以通过 2 种方式实现: 
    + 第一是内置实现的方法 webpack methods:  
        - require.ensure()
        - require.include() 
    + 第二是 ES2015 第一种是内置实现的方法 webpack methods的规范: 
        ES 2015 Loader spec 
    
- 内置方法 webpack methods
    + 动态加载代码: require.ensure([dependencies], callback, errorCallback, chunkName)
        + dependencies  依赖项是一个数组，不会执行
        + callback  在这里执行代码
        + errorCallback  可省略
        + chunkName  打包好的代码块的名称
    + require.include(chunkName): 加载第三方的或公共的代码块，但是不执行，只是提前加载进来，等到
        有引用它的代码块出现时，可以缩短加载时间
- ES 2015 Loader Spec(specification)
    + import() 返回值是 promise
     ```javascript
     // webpack import function: import 通过注释的方式写入参数
     import(
         /* webpackChunkName: async-chunk-name */
         /* webpackMode: lazy */
         moduleName
     )
     ```
    + import().then() 进行动态加载

- 代码分割应用场景:
    + 分离 业务代码 和 第三方依赖
    + 分离 业务代码 和 业务公共代码 和 第三方依赖
    + 分离 首次加载 和 访问后加载 的代码 (用于首屏加载)


#### 创建项目:
+ .gitignore
+ npm init --yes
+ npm install webpack webpack-cli --save-dev
+ npm install lodash --save