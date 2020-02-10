import { LitElement, html } from "@polymer/lit-element";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import { connect } from "pwa-helpers";

import { store } from "../redux/store";
import { generateCrossword } from "../redux/actions";

class CrosswordPuzzleView extends connect(store)(LitElement) {
  static get properties() {
    return {
      words: { type: Array },
      matrixSize: { type: Number },
      crosswordData: { type: Array }
    };
  }

  constructor() {
    super();
    this.words = [];
    this.matrixSize = 20;
    this.crosswordData = [];

    this.shadowRoot.addEventListener("load", () => {
      setInterval(() => {
        this.renderGrid();
        console.log(1);
      }, 1000);
    });
  }

  render() {
    return html`
      <style>
        .crossword-puzzle-wrapper {
          width: 35rem;
          height: 35rem;
          margin: auto;
          background: var(--grey-background);
          padding: 1rem;
        }

        .crossword-puzzle {
          display: flex;
          flex-direction: column;
          background: #1676f3;
          height: 100%;
        }

        .crossword-row {
          display: flex;
          flex: 1;
        }

        .crossword-box {
          flex: 1;
          margin: 0.1rem;
          text-align: center;
          background-color: #fff;
        }
      </style>
      <div class="crossword-puzzle-wrapper">
        <div class="crossword-puzzle"></div>
      </div>
    `;
  }

  renderBoxes(selector) {
    for (let i = 0; i < this.matrixSize; i++) {
      const crosswordBox = document.createElement("div");
      crosswordBox.className = `crossword-box col-${i}`;

      this.shadowRoot.querySelector(selector).appendChild(crosswordBox);
    }
  }

  renderRows() {
    for (let i = 0; i < this.matrixSize; i++) {
      const crosswordRow = document.createElement("div");
      crosswordRow.className = `crossword-row row-${i}`;

      this.shadowRoot
        .querySelector(".crossword-puzzle")
        .appendChild(crosswordRow);

      this.renderBoxes(`.crossword-row.row-${i}`);
    }
  }

  renderGrid() {
    this.renderRows();
  }

  renderWord(str) {
    // Splitting the input word and create boxes for all chars
    str.split("").forEach(char => console.log(char));

    const crosswordBox = document.createElement("div");
    crosswordBox.className = "crossword-box";
    crosswordBox.textContent = char;

    this.shadowRoot
      .querySelector(".crossword-puzzle")
      .appendChild(crosswordBox);
  }

  generateCrossword(e) {
    store.dispatch(generateCrossword(this.words));

    // tests with fake data

    const matrixSize = 30;
    const demoPlayground = [...Array(matrixSize)].map((x, j) => {
      return Array(matrixSize).fill(crosswordBox);
    });
    console.log(demoPlayground);

    this.enrichedWords = store.getState().enrichedWords;
    const fakeData = this.enrichedWords.map(ew => {
      return {
        ...ew,
        startX: 3,
        startY: 3,
        direction: "right"
      };
    });
    demoPlayground[10][10] = 1;
    console.log(fakeData);
  }
}

customElements.define("crossword-puzzle-view", CrosswordPuzzleView);
