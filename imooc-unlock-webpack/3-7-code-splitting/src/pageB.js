import("./subPageA");
import("./subPageB");

// import * as _ from "lodash"
require.ensure(["lodash"], function() {
    var _ = require("lodash");
    _.join([1, 2], 3);
}, "vendor");

export default function() {
    return "This is pageB file"
}