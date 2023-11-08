import { LitElement, html } from "lit-element";
import styleSheet2 from "./styles/styles.js";

export class Apartado1 extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return [styleSheet2];
  }

  render() {
    return html`
      <main>
        <aside class="aside1">
          <div class="usuarios">
            <div class="input-group flex-nowrap">
              <button class="btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="gray"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
                Usuario
              </button>
            </div>

            <div class="input-group flex-nowrap">
              <button class="btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="gray"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
                Campañas
              </button>
            </div>

            <div class="input-group flex-nowrap">
              <button type="submit" class="btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="gray"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
                Equipos
              </button>
            </div>
          </div>
        </aside>

        <div class="a2">
          <div class="user-status">
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="blue"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  /></svg
              ></span>
              <input type="text" placeholder="Usuario" />
            </div>

            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="blue"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  /></svg
              ></span>
              <input type="text" placeholder="Usuario" />
            </div>

            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="blue"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  /></svg
              ></span>
              <input type="text" placeholder="Usuario" />
            </div>
          </div>
        </div>

        <aside class="aside2">
          <section>
            <div class="buscar"></div>
          </section>
        </aside>
      </main>
    `;
  }
}

customElements.define("test", Apartado1);
