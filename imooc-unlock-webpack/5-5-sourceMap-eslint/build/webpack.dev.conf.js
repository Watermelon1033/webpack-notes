const webpack = require("webpack");
const path = require("path");


// Tree shaking css
const PurifyCss = require("purifycss-webpack");
const glob = require("glob-all");


// 优化 webpack 把 每次运行都需要编译的 runtime.bundle.js 内链到 html 里
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

// 每次打包清楚 dist 目录下的文件
const CleanWebpackPlugin = require("clean-webpack-plugin");



module.exports = {
    devtool: "cheap-module-source-map",
    devServer: {
        // 子页面顶部显示打包状态
        inline: false,
        port: 9005,
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
        },
        // 代理远程端口
        proxy: {
            "/": {
                target: "https://m.weibo.cn",
                // 允许跨域
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    "^/comments": "/api/comments",
                },
                headers: {
                    // 取得微博的 cookie
                    "Cookie": '_T_WM=044532f80b8fabc6dc347fd417c33202; ALF=1517569014; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhQljxrwvAfCCZa_p.u8pB.5JpX5K-hUgL.Fo2cS0qRehBcSKM2dJLoI7HpqJ8XwBtt; SCF=AkQsXaaTywl0RziwnumQ0tVE_xW5udcpoGP43q7eb2tFW9lXRc4bVNOn9N5m_ZKwFc-Q2r4Hz5oMBAbVJuhI1uk.; SUB=_2A253SLARDeRhGedI7FQZ8CrKzjuIHXVUstBZrDV6PUJbktANLUXEkW1NVtAHXD7nHQtwFntsDZsmqj2nB17cClnd; SUHB=0k1zt1ckxYq3c6; H5_INDEX_TITLE=qbaty; H5_INDEX=0_all; WEIBOCN_FROM=1110006030; M_WEIBOCN_PARAMS=oid%3D4193586758833502%26luicode%3D20000061%26lfid%3D4193594443440569%26uicode%3D20000061%26fid%3D4193586758833502'
                }
            }
        },

        // 模块热更新(步骤1)
        hot: true,
        hotOnly: true,
        // eslint 在浏览器中看到错误提是
        overlay: true,
    },
    plugins: [

        // 内链 webpack 每次都需要运行的启动代码
        new ScriptExtHtmlWebpackPlugin({
            // 名称和 optimization --> runtimeChunk 中的名称保持一直
            inline: "runtime",
        }),


        // 模块热更新(步骤2)
        new webpack.HotModuleReplacementPlugin(),
        // 模块热更新(步骤3)
        new webpack.NamedModulesPlugin()
    ],

    // webpack 4 代码分割和压缩
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "common",
        },
        runtimeChunk: {
            name: "runtime",
        },
        minimize: false
    }
};