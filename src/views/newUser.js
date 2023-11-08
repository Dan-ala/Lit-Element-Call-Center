import { LitElement, html } from "lit-element";
import modal from "../styles/modal.js"

export class NewUser extends LitElement{
  constructor() {
    super();
  }

  static get styles() {
    return [modal];
  }

    render(){
        return html
        `
        <div class="popup" id="popup-1">
        <div class="overlay"></div>
        <div class="content">
            <div class="close-btn">&times;</div>
            <h1>Nuevo Usuario</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt corrupti quia libero ut rem facilis fuga neque in debitis rerum vitae quidem doloremque obcaecati dolor cupiditate, eum corporis quae. Ipsam!</p>
        </div>
    </div>
        `
    }
}

customElements.define("modal-to-a-new-user", NewUser)