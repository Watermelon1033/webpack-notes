module.exports = {
    mode: "development",
    entry: {
        app: "./app.js"
    },
    output: {
        filename: "[name].[hash:5].js"
    }
};