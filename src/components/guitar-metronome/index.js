import css from "./style.css?inline";

export default class GuitarMetronome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="signature">
        <button class="signature" data-signature="3/4">
          <div>2</div>
          <div>4</div>
        </button>
        <button class="signature" data-signature="4/4">
          <div>4</div>
          <div>4</div>
        </button>
        <button class="signature" data-signature="6/8">
          <div>6</div>
          <div>8</div>
        </button>
      </div>
      <div>
        <div class="tempo">120</div>
        <div class="bpm">bpm</div>
      </div>
      <div class="beats-indicators">
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
      </div>
      <div class="controls">
        <button class="control decrement" aria-label="Decrease tempo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 12.998H5v-2h14z"/>
          </svg>
        </button>
        <button class="control increment" aria-label="Increase tempo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/>
          </svg>
        </button>
      </div>
    `;
  }
}

customElements.define("guitar-metronome", GuitarMetronome);
