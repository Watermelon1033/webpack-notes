### 6-2 Webpack 实战场景 -- 优化打包速度(1)
- 优化打包速度的方法:
    - 分开第三方代码(vendor)和业务代码(app)
    - 不打包第三方代码的插件: 
        + DllPlugin: 通过打包第三方文件会生成一个 map 的映射关系
        + DllReferencePlugin 
### 6-3 Webpack 实战场景 -- 优化打包速度(2)