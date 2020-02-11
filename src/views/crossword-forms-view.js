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
        .cw-forms-wrapper {
          display: flex;
          flex-direction: column;
          height: 80%;
          justify-content: space-around;
        }

        h2 {
          text-align: center;
          color: var(--dark-color);
        }

        .input-layout {
          display: flex;
          justify-content: space-between;
        }

        .input-layout vaadin-text-field {
          width: 60%;
        }

        .input-layout vaadin-button {
          width: 35%;
        }

        .words-list {
          min-height: 5rem;
          background-color: var(--grey-background);
          padding: 0.5rem;
        }

        .word-item {
          display: inline-block;
          line-height: 1.6rem;
          padding: 0.1rem 0.3rem;
          margin-right: 0.4rem;
          margin-bottom: 0.5rem;
          border-radius: 0.3rem;
          background-color: var(--base-color);
          color: var(--blue-color);
        }

        .radio-buttons {
          text-align: center;
        }

        .generate-button {
          text-align: center;
        }

        vaadin-button:hover {
          cursor: pointer;
        }
      </style>
      <div class="cw-forms-wrapper">
        <h2>Add Words Here</h2>
        <div class="input-layout" @keyup="${this.shortcutListener}">
          <vaadin-text-field
            placeholder="Something"
            value="${this.text}"
            @change="${this.updateText}"
          ></vaadin-text-field>
          <vaadin-button theme="primary" @click="${this.addWord}">
            Add
          </vaadin-button>
        </div>

        <div class="words-list">
          ${this.words.map(
            word => html`
              <div class="word-item">
                ${word.text}
              </div>
            `
          )}
        </div>

        <div class="radio-buttons">
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
        </div>

        <div class="generate-button">
          <vaadin-button @click="${this.generateCrossword}">
            Generate Crossword
          </vaadin-button>
        </div>
      </div>
    `;
  }

  generateCrossword(e) {
    if (this.words.length > 1) {
      store.dispatch(generateCrossword(this.words));
      this.words = [];
    }
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
    if (this.text && this.text.length > 1) {
      store.dispatch(addWord(this.text));
      this.text = "";
    }
  }
}

customElements.define("crossword-forms-view", CrosswordFormsView);
