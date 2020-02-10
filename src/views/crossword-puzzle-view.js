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
      matrixSize: { type: Number }
    };
  }

  constructor() {
    super();
    this.words = [];
    this.matrixSize = 30;
  }

  render() {
    return html`
      <style>
        h2 {
          color: var(--primary);
        }

        .crossword-puzzle {
          border: 1px solid purple;
        }

        .crossword-box {
          display: inline-block;
          font-size: 1.6rem;
          width: 1.6rem;
          height: 1.6rem;
          line-height: 1.6rem;
          border: 1px solid var(--dark-color);
          margin: 0.1rem;
          text-align: center;
        }
      </style>
      <h2 @click="${() => this.createBoxAndAppendIt("A")}">Crossword Puzzle</h2>
      <div class="crossword-puzzle"></div>
    `;
  }

  createBoxAndAppendIt(char) {
    for (let i = 0; i < 30; i++) {
      const crosswordBox = document.createElement("div");
      crosswordBox.className = "crossword-box";
      crosswordBox.textContent = char;

      this.shadowRoot
        .querySelector(".crossword-puzzle")
        .appendChild(crosswordBox);
    }
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
