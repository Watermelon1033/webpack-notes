import base from "./css/base.less";
import common from "./css/common.less";

/*import a from "./todo-components/a.js";*/

let app = document.getElementById("app");
app.innerHTML = '<div class="'+ base.box + '"></div>';

import(/* webpackChunkName: "a" */ "./components/a").then(function(a) {
    console.log(a);
});