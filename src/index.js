import "./views/crossword-forms-view";
import "./views/crossword-puzzle-view";

import "./styles.css";

console.log("index.js");

window.addEventListener("load", () => {
  console.log("load event");
  initUI();
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event");
});

function initUI() {
  const element = document.createElement("div");
  element.textContent = "";

  document.querySelector("main").appendChild(element);
}
