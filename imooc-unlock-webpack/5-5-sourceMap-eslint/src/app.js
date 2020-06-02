import "./css/base.scss";

import { a } from "./common/util";
console.log(a());

let app = document.getElementById("app");
let box = document.createElement("div");
box.className = "box";
app.appendChild(box);

$("div").addClass("new");

// 远端接口请求: 借用微博接口

$.get("/comments/show", {
    id: "4193586758833502",
    page: 1
}, function (data) {
    console.log(data);
});

$.get(
    "/msg/index",
    {
        format: "cards"
    },
    function (data) {
        console.log(data);
    }
);