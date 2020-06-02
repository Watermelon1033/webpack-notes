// 使用 express 和 middleware 来搭建服务器
const express = require("express");
const webpack = require("webpack");
const opn = require("opn");

const app = express();
const port = 3100;

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const httpProxyMiddleware = require("http-proxy-middleware");
const historyApiFallback = require("connect-history-api-fallback");

// 拿到开发环境下的配置
const config = require("./webpack.common.conf")("development");

// 拿到配置后，利用 webpack 进行处理，然后拿到 compiler，作用是给 express 应用的。
const compiler = webpack(config);


// 把 proxy.js 的配置引入
const proxyTable = require("./proxy");
// 把 proxy 应用到 http proxy middleware 中
for (let context in proxyTable) {
    // 参数: key， proxyTable的value
    app.use(httpProxyMiddleware(context, proxyTable[context]))
}
app.use(historyApiFallback(require("./historyApiFallback")));

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.listen(port, function() {
    console.log("success listen to " + port);
    opn("http://localhost:" + port);
});
