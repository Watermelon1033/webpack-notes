import "./css/base.scss";

import { a } from "./common/util";
console.log(a());

let app = document.getElementById("app");
let box = document.createElement("div");
box.className = "box";
app.appendChild(box);

$("div").addClass("new");
