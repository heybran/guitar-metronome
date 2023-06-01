// @ts-check
import css from "./style.css?inline";
import BeatStart from "@sounds/beat-start.wav";
import BeatNormal from "@sounds/beat-normal.wav";

/**
 * A custom element that provides a metronome for guitar practice.
 * @extends HTMLElement
 */
export default class GuitarMetronome extends HTMLElement {
  /**
   * The beats per minute (BPM) of the metronome.
   * @type {number}
   * @private
   */
  #bpm;

  /**
   * A flag indicating whether the metronome is currently playing.
   * @type {boolean}
   * @private
   */
  #isPlaying;

  /**
   * The ID of the interval timer used to play the metronome.
   * @type {number}
   * @private
   */
  #timerId;

  /**
   * The time signature of the metronome, expressed as a string
   * in the format "X/Y"
   * @type {string}
   * @private
   */
  #signature;

  /**
   * The root element of the shadowDOM
   * @type {ShadowRoot}
   * @private
   */
  #root;

  /**
   * The screen reader text
   * @type {HTMLElement}
   * @private
   */
  #srText;

  /**
   * Creates a new instance of the GuitarMetronome class.
   */
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const bpmAttr = this.getAttribute("npm");
    if (bpmAttr !== null) {
      const bpm = parseInt(bpmAttr, 10);
      if (bpm <= 0 || isNaN(bpm)) {
        return console.error(
          `Invalid value for "bpm" attribute. Must be a number greater than 0.`,
        );
      }
      this.#bpm = bpm;
    } else {
      this.#bpm = 80;
    }

    this.render();
    this.#isPlaying = false;
    // @ts-ignore
    this.#timerId = null;
    // @ts-ignore
    this.#srText = this.shadowRoot.querySelector(".toggle-play .sr-only");
  }

  /**
   * Toggles the metronome play state.
   */
  toggle() {
    if (this.#isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * Starts the metronome.
   */
  start() {
    // if (this.#isPlaying) {
    //   return;
    // }

    /** @type {number} */
    let beatCount = 0;

    const interval = 60000 / this.#bpm;
    this.#timerId = setInterval(() => {
      // Play the metronome sound
      const audio = new Audio(beatCount % 4 === 0 ? BeatStart : BeatNormal);
      audio.play();
      beatCount++;
    }, interval);

    this.#isPlaying = true;
    this.classList.add("is-playing");
    this.#srText.textContent = "Pause metronome";
  }

  /**
   * Stops the metronome.
   */
  stop() {
    // if (!this.#isPlaying) {
    //   return;
    // }

    this.classList.remove("is-playing");
    this.#srText.textContent = "Play metronome";
    clearInterval(this.#timerId);
    this.#isPlaying = false;
    this.#timerId = null;
  }

  /**
   * Sets the BPM of the metronome.
   * @param {number} bpm - The new BPM value.
   */
  setBpm(bpm) {
    if (bpm <= 0 || isNaN(bpm)) {
      throw new Error("Invalid BPM value. Must be a number greater than 0.");
    }

    this.#bpm = bpm;
    if (this.#isPlaying) {
      this.stop();
      this.start();
    }
  }

  render() {
    this.root.innerHTML = `
      <style>${css}</style>
      <div class="container">
        <div class="signatures">
        <button class="signature" data-signature="2/4">
          <div>2</div>
          <div>4</div>
        </button>
        <button class="signature" data-signature="3/4">
          <div>3</div>
          <div>4</div>
        </button>
        <button class="signature" data-signature="4/4">
          <div>4</div>
          <div>4</div>
        </button>
        <button class="signature" data-signature="5/4">
          <div>5</div>
          <div>4</div>
        </button>
        </div>
        <div class="beats">
          <div class="beat"></div>
          <div class="beat"></div>
          <div class="beat"></div>
        </div>
        <div class="tempo-wrapper">
          <button class="tempo-control tempo-control--decrease" aria-label="Decrease tempo">
            <svg role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 12.998H5v-2h14z"/>
            </svg>
            <span class="sr-only">Decrease tempo</span>
          </button>
          <div class="tempo" data-text="bpm">${this.#bpm}</div>
          <button class="tempo-control tempo-control--increase" aria-label="Increase tempo">
            <svg role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/>
            </svg>
            <span class="sr-only">Increase tempo</span>
          </button>
        </div>
        <div class="controls">
          <button class="toggle-play" type="button" onclick="this.getRootNode().host.toggle(this)">
            <svg class="play-icon" fill="currentColor role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
            <svg class="pause-icon" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
            <span class="sr-only">Play metronome</span>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("guitar-metronome", GuitarMetronome);
