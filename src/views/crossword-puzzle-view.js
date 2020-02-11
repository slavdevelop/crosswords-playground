import { LitElement, html } from "@polymer/lit-element";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import nanoid from "nanoid";
import { connect } from "pwa-helpers";

import { store } from "../redux/store";

class CrosswordPuzzleView extends connect(store)(LitElement) {
  static get properties() {
    return {
      words: { type: Array },
      rowNumber: { type: Number },
      colNumber: { type: Number },
      crosswordData: { type: Object }
    };
  }

  constructor() {
    super();
    this.words = [];
    this.rowNumber = 20;
    this.colNumber = 20;
    this.crosswordData = [];
  }

  connectedCallback() {
    console.log("connected 1");
    store.subscribe(() => {
      const inputData = store.getState().enrichedWords;

      if (inputData.length > 0) {
        this.renderCrossword(inputData);
      }
    });
  }

  renderCrossword(inputData) {
    console.log(inputData, "asd");

    this.createGrid();
  }

  createGrid() {
    let div = document.createElement("div");
    div.style = "display: flex; flex: 1";
    let span = document.createElement("span");
    span.style =
      "flex: 1; margin: 0.1rem; text-align: center; background-color: #fff; font-size: 1rem; line-hight: 1rem;";

    let crosswordPuzzle = document.createElement("div");
    crosswordPuzzle.className = "crossword-puzzle";
    crosswordPuzzle.style =
      "display: flex; flex-direction: column; background: #1676f3; height: 100%;";

    let crosswordPuzzleWrapper = document.createElement("div");
    crosswordPuzzleWrapper.className = "crossword-puzzle-wrapper";
    crosswordPuzzleWrapper.style =
      "max-width: 80%; max-height: 80%; margin: auto; background: #1a39601a; padding: 1rem;";

    for (let row = 0; row < this.rowNumber; row++) {
      const rowId = nanoid();
      let rowCloned = div.cloneNode(true);
      rowCloned.className = `crossword-row row-${row}`;
      rowCloned.setAttribute("id", rowId);

      this.crosswordData[row] = Array(this.rowNumber);

      for (let col = 0; col < this.colNumber; col++) {
        const colId = nanoid();
        let colCloned = span.cloneNode(true);
        colCloned.textContent = "S";
        colCloned.className = `crossword-col col-${col}`;
        colCloned.setAttribute("id", colId);

        rowCloned.appendChild(colCloned);

        this.crosswordData[row][col] = { id: colId, row: row, col: col };
      }

      crosswordPuzzle.appendChild(rowCloned);
    }

    crosswordPuzzleWrapper.appendChild(crosswordPuzzle);

    document
      .querySelector("crossword-puzzle-view")
      .shadowRoot.appendChild(crosswordPuzzleWrapper);
  }

  renderBoxes(selector) {
    for (let i = 0; i < this.matrixSize; i++) {
      const crosswordBox = document.createElement("div");
      crosswordBox.className = `crossword-box col-${i}`;

      this.shadowRoot.querySelector(selector).appendChild(crosswordBox);
    }
  }
}

customElements.define("crossword-puzzle-view", CrosswordPuzzleView);
