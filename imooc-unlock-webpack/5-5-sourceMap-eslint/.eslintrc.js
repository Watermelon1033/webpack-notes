module.exports = {
    root: true,
    extends: "standard",
    plugins: [ "html" ],
    env: {
        browser: true,
        node: true,
    },
    // globals 设置全局变量
    globals: {
        $: true
    },
    rules: {
        // 规则: error/warning 给出错误提是的方式
        // 4 表示4个缩进
        indent: [ "error", 4 ],
        // 文件不需要换行
        "eol-last": ["error", "never" ],
        // 引号类型 `` "" ''
        "quotes": [1, "double"],

        // 0表示不不处理，1表示警告，2表示错误并退出
        // 语句强制分号结尾 (分号 semicolon)
        "semi": [0, "always"],
    }
};