/*
import("./subPageA");
import("./subPageB");
*/

// 加载第三方的或公共的代码块，但是不执行，只是提前加载进来，等到有引用它的代码块出现时，可以缩短加载时间
require.include("./moduleA");


const page = "subPageA";
if (page === "subPageA") {
    // "/**/"内为魔法注释
    import(/* webpackChunkName: "subPageA"*/ "./subPageA").then(function(subPageA) {
        console.log(subPageA);
    })
} else if (page === "subPageB") {
    import(/* webpackChunkName: "subPageA"*/ "./subPageB").then(function(subPageB) {
        console.log(subPageB);
    })
}


require.ensure(["lodash"], function() {
    var _ = require("lodash");
    _.join([1, 2], 3);
}, "vendor");

export default function() {
    return "This is pageA file"
}