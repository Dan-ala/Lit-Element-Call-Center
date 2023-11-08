import { LitElement, html } from "lit-element";
import styleSheet from "./styles/login-styles.js";
import { Router } from '@vaadin/router';

export class Login extends LitElement {
  constructor() {
    super();
    this.mensaje=""
  }

  static get properties(){
    return{
      mensaje: {
        type: String
      }
    }
  }

  static get styles() {
    return [styleSheet];
  }

  ingresarLogin(){

    let usuario = this.shadowRoot.querySelector('#usuario').value
    let password = this.shadowRoot.querySelector('#password').value
    let recordar = this.shadowRoot.querySelector("#recordar")


    if (usuario == null || usuario== "" || usuario == undefined){
      this.mensaje = 'Atención... Campo Usuario vacío.'
      return false;
    }

    if (password == null || password == "" || password == undefined){
      this.mensaje = 'Atención... Campo Password vacío.'
      return false;
    }else{
      this.mensaje=""
    }

    let data = JSON.parse(localStorage.getItem("list")) || []; // Initialize data from localStorage or create an empty array
    let dataList = {
      usuario: usuario,
      password: password,
    }

    if(usuario == dataList.usuario && password == dataList.password){
      alert(`Bienvenido ${dataList.usuario}`)
      Router.go('/primer-dashboard')
      if (recordar.checked){
        data.push(dataList)
        localStorage.setItem("list", JSON.stringify(data))
        console.log(data)
        alert(`Recordaremos tus datos`)
      }else{
        alert('No serán recordados los datos')
        Router.go('/primer-dashboard')
      }
    }else{
      alert(`Las credenciales no son correctas`)
    }
  }

  mostrarError(){
    return html`<div class="msg"> ${this.mensaje} </div>`
  }

  render() {
    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />

      <div class="body">

      <div class="principal">
        <div class="profile-img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="170"
            height="170"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 17"
          >
            <path
              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
          </svg>
        </div>

        <br><br>

        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              /></svg
          ></span>
          <input type="text" id="usuario" placeholder="Usuario" />
        </div>

        <br />

        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 448 620"
            >
              <style>
                svg {
                  fill: #ffffff;
                }
              </style>
              <path
                d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
              /></svg
          ></span>
          <input type="password" id="password" placeholder="Contraseña" />
        </div>

        <div class="checkbox">
          <div>
            <input id="recordar" type="checkbox" />
            <label for="recordar">Recordar</label>
          </div>
          <div>
            <a>Recuperar Contraseña</a>
          </div>
        </div>
      </div>

      <div class="login-button">
        <button class="btn" @click=${(e)=>this.ingresarLogin()}>LOGIN</button>
        ${this.mostrarError()}
      </div>

      </div>
    `;
  }
}

customElements.define("login-cencoe", Login);
