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
   * Creates a new instance of the GuitarMetronome class.
   */
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const bpmAttr = this.getAttribute('npm');
    if (bpmAttr !== null) {
      const bpm = parseInt(bpmAttr, 10);
      if (bpm <= 0 || isNaN(bpm)) {
        return console.error(`Invalid value for "bpm" attribute. Must be a number greater than 0.`);
      }
      this.#bpm = bpm;
    } else {
      this.#bpm = 80;
    }

    this.#isPlaying = false;
    this.#timerId = null;

    this.render();
  }

  /**
   * Starts the metronome.
   */
  start() {
    if (this.#isPlaying) {
      return;
    }

    console.log(1)

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
  }

  /**
   * Stops the metronome.
   */
  stop() {
    if (!this.#isPlaying) {
      return;
    }

    clearInterval(this.#timerId);
    this.#timerId = null;
  }

  /**
   * Sets the BPM of the metronome.
   * @param {number} bpm - The new BPM value.
   */
  setBpm(bpm) {
    if (bpm <= 0 || isNaN(bpm)) {
      throw new Error('Invalid BPM value. Must be a number greater than 0.');
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
        <button class="control start" aira-label="Start the metronome" onclick="this.getRootNode().host.start()">Start</button>
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
