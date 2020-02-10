import { LitElement, html } from "@polymer/lit-element";

class WordView extends LitElement {
  render() {
    return html`
      <p>word-brq</p>
    `;
  }
}

customElements.define("word-view", WordView);
