/*
import("./subPageA");
import("./subPageB");
*/

// 加载第三方的或公共的代码块，但是不执行，只是提前加载进来，等到有引用它的代码块出现时，可以缩短加载时间
require.include("./moduleA");


var page = "subPageA";
if (page === "subPageA") {
    require.ensure(["./subPageA"], function(){
        var subPageA = require("./subPageA")
    }, "subPageA")
} else if (page === "subPageB") {
    require.ensure(["./subPageB"], function() {
        var subPageB = require("./subPageB")
    }, "subPageB")
}


require.ensure(["lodash"], function() {
    var _ = require("lodash");
    _.join([1, 2], 3);
}, "vendor");

export default function() {
    return "This is pageA file"
}