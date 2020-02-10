import { LitElement, html } from "@polymer/lit-element";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import { connect } from "pwa-helpers";

import { VisualInfoOptions } from "../redux/reducer";
import { store } from "../redux/store";
import {
  addWord,
  removeWord,
  updateFilter,
  generateCrossword
} from "../redux/actions";

class CrosswordFormsView extends connect(store)(LitElement) {
  static get properties() {
    return {
      words: { type: Array },
      filter: { type: String },
      text: { type: String }
    };
  }

  stateChanged(state) {
    this.words = state.words;
    this.filter = state.filter;
  }

  constructor() {
    super();
    this.words = [];
    this.filter = VisualInfoOptions.SHOW_ALL;
    this.text = "";
    this.enrichedWords = [];
  }

  render() {
    return html`
      <style>
        h2 {
          color: var(--primary);
        }
      </style>
      <h2>Crossword Forms</h2>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Text"
          value="${this.text}"
          @change="${this.updateText}"
        ></vaadin-text-field>
        <vaadin-button theme="primary" @click="${this.addWord}">
          Add Word
        </vaadin-button>
      </div>

      <div class="words-list">
        ${this.words.map(
          word => html`
            <div class="word-item">
              <span>${word.text}</span>
            </div>
          `
        )}
      </div>

      <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
        ${Object.values(VisualInfoOptions).map(
          filter => html`
            <vaadin-radio-button value="${filter}"
              >${filter}</vaadin-radio-button
            >
          `
        )}
      </vaadin-radio-group>
      <vaadin-button @click="${this.generateCrossword}">
        Generate Crossword
      </vaadin-button>
    `;
  }

  generateCrossword(e) {
    store.dispatch(generateCrossword(this.words));

    // tests with fake data

    const matrixSize = 30;
    const demoPlayground = [...Array(matrixSize)].map((x, j) => {
      return Array(matrixSize).fill(0);
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

  filterChanged(e) {
    const val = e.target.value;

    store.dispatch(updateFilter(val));
    this.filter = val;
  }

  removeWord(e) {
    store.dispatch(removeWord(e.target.value));
  }

  shortcutListener(e) {
    if (e.key === "Enter") {
      this.addWord(e);
    }
  }

  updateText(e) {
    this.text = e.target.value;
  }

  addWord(e) {
    console.log();
    if (this.text) {
      store.dispatch(addWord(this.text));
      this.text = "";
    }
  }
}

customElements.define("crossword-forms-view", CrosswordFormsView);
