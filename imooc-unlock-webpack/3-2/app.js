// ES6 Module
import sum from "./sum.js";

// Common.js
var minus = require("./minus");

// amd: 是异步加载规范, 所以添加了这个导入之后, 在 cmd 中输入:
// ``webpack app.js -o bundle.js`` 打包之后会生成 bundle.js && 1.bundle.js
require(["./multi"], function(multi) {
    console.log("multi(2, 3): ", multi(2, 3));
});

console.log("sum(num1, num2): ", sum(24, 25));
console.log("minus(n1, n2): ", minus(25, 24));