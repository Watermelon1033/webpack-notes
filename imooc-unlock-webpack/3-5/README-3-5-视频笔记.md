## 3-5 由浅入深 webpack -- 打包公共代码(1) [提取公共代码]
- Webpack 3 的 commonschunk hash 问题非常的不雅，使用复杂， Webpack 4 直接将 
    CommonsChunkPlugin 插件改为 optimization.splitChunks 和 optimization.runtimeChunk
    两个配置 <br>
   **webpack 3**  <br>
   ```javascript
      plugins: [
          new webpack.optimize.CommonsChunkPlugin({ names: "common" }),
          new webpack.optimize.CommonsChunkPlugin({ name: "runtime", chunks: ["common"] })
    ]
   ```
   **webpack 4** 
   ```javascript
      optimization: {
          splitChunks: {
              chunks: "all",
              name: "common"
          },
          runtimeChunk: {
            name: "runtime"
          }
      }
   ```
    
    
- 创建项目:
    + 创建 .gitignore 添加配置，用于上传时哪些文件需要排除在外
    + npm init --yes  创建 package.json
    + npm install webpack webpack-cli --save-dev  
    + 创建 webpack.config.js 并添加配置项
    + 创建 src 文件夹添加源文件
    + npm install lodash --save

    
    
### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
- **optimize  /ˈɔptəˌmaɪz/**  vt.使最优化  vi.优化
    + --> optimize structure 优化结构
    + --> optimize DB 优化数据库
- **optimization  /ˌɔptimai'zeiʃən/**  n.优化
    + --> code optimization  代码优化
- **minimize  /ˈminimaiz/** vi.最小化