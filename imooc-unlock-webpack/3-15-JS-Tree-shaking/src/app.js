import "./css/base.scss";

let app = document.getElementById("app");
let bigBox = document.createElement("div");
bigBox.className = "big-box";
app.appendChild(bigBox);

import { a } from "./common/util";
console.log(a());

import { chunk } from "lodash";
console.log(chunk([1,2,3,4,4,5,6]), 2);