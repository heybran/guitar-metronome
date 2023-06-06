class LongPressButton extends HTMLElement {
  /**
   * the ID of button press timer
   * @type {number}
   * @private
   */
  #timerId;

  /**
   * the count of interval trigger
   * @type {number}
   * @private
   */
  #triggerCount = 0;

  /**
   * press trigger interval
   * @return {number}
   */
  get rate() {
    return Math.max(400 - Math.log(this.#triggerCount + 1) * 100, 40);
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<slot></slot>`;

    this.addEventListener("mousedown", this.handleMouseDown);
    this.addEventListener("mouseup", this.handleMouseUp);
    this.addEventListener("mouseleave", this.handleMouseUp);
    this.addEventListener("touchstart", this.handleMouseDown);
    this.addEventListener("touchend", this.handleMouseUp);
    this.addEventListener("touchmove", this.handleMouseUp);
  }

  handleMouseDown() {
    clearTimeout(this.#timerId);

    this.#timerId = setTimeout(() => {
      // trigger click event
      this.dispatchEvent(new Event("click"));
      ++this.#triggerCount;

      // reset timer
      this.handleMouseDown();
    }, this.rate);
  }

  handleMouseUp() {
    clearTimeout(this.#timerId);
  }

  disconnectedCallback() {
    clearTimeout(this.#timerId);

    this.#triggerCount = 0;
    this.removeEventListener("mousedown", this.handleMouseDown);
    this.removeEventListener("mouseup", this.handleMouseUp);
    this.removeEventListener("mouseleave", this.handleMouseUp);
    this.removeEventListener("touchstart", this.handleMouseDown);
    this.removeEventListener("touchend", this.handleMouseUp);
    this.removeEventListener("touchmove", this.handleMouseUp);
  }
}

customElements.define("long-press-button", LongPressButton);
