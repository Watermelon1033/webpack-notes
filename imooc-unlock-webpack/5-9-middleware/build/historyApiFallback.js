// 把 webpack.dev.conf.js 中 devServer 下的 historyApiFallback 配置单独拿出来
module.exports = {
    //
    htmlAcceptHeaders: ["text/html", "application/xhtml + xml"],
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
};