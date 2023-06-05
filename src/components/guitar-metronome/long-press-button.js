class LongPressButton extends HTMLElement {
  /**
   * the ID of button press timer
   * @type {number}
   * @private
   */
  #timerId;

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<slot></slot>`;

    // 添加事件监听器
    this.addEventListener("mousedown", this.handleMouseDown);
    this.addEventListener("mouseup", this.handleMouseUp);
    this.addEventListener("mouseleave", this.handleMouseUp);
  }

  handleMouseDown() {
    clearTimeout(this.#timerId);

    this.#timerId = setTimeout(() => {
      // trigger click event
      this.dispatchEvent(new Event("click"));

      // reset timer
      this.handleMouseDown();
    }, 300);
  }

  handleMouseUp() {
    clearTimeout(this.#timerId);
  }

  disconnectedCallback() {
    clearTimeout(this.#timerId);

    this.removeEventListener("mousedown", this.handleMouseDown);
    this.removeEventListener("mouseup", this.handleMouseUp);
    this.removeEventListener("mouseleave", this.handleMouseUp);
  }
}

// 定义新的HTML元素
customElements.define("long-press-button", LongPressButton);
