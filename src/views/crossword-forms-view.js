import { LitElement, html } from "@polymer/lit-element";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";

const PropsVisibilityFilters = {
  SHOW_ALL: "All",
  SHOW_MAIN: "Main",
  SHOW_STATS: "Stats"
};

class CrosswordFormsView extends LitElement {
  static get properties() {
    return {
      words: { type: Array },
      filter: { type: String },
      text: { type: String }
    };
  }

  constructor() {
    super();
    this.words = [];
    this.filter = PropsVisibilityFilters.SHOW_ALL;
    this.text = "";
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
              <span @click="${this.removeWord}">${word.text}</span>
            </div>
          `
        )}
      </div>

      <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
        ${Object.values(PropsVisibilityFilters).map(
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
    console.log(e.target);
  }

  filterChanged(e) {
    this.filter = e.target.value;
  }

  removeWord(e) {
    this.words = [...this.words.filter(word => word.text === e.target.value)];
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
    console.log(e);
    if (this.text) {
      this.words = [
        ...this.words,
        {
          text: this.text
        }
      ];
      this.text = "";
    }
  }
}

customElements.define("crossword-forms-view", CrosswordFormsView);
