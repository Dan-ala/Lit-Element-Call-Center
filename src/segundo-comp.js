import { LitElement, html } from "lit-element";
import styleSheet3 from "./styles/styles3.js";
import modal from "./styles/modal.js";
import { Router } from "@vaadin/router";

export class Apartado1 extends LitElement {
  constructor() {
    super();
    this.checkingData();
    this.showPersonalInfo = false;
    this.usersLlamados = parseInt(localStorage.getItem('usersLlamados')) || 0;
    this.usersDeclined = parseInt(localStorage.getItem('usersDeclined')) || 0;
  }

  static get styles() {
    return [styleSheet3, modal];
  }

  goToCampañas() {
    Router.go("/segundo-dashboard");
  }

  goToEquipos() {
    Router.go("/equipos");
  }

  checkingData() {
    const userData = JSON.parse(localStorage.getItem("list"));

    if (!userData || userData.length === 0) {
      alert("Debe haber iniciado sesión para poder ver los datos");
      Router.go("/");
    }
  }

  renderUserData(userData) {
    return userData.map(
      (user) => html`
        <div>
          <p>Usuario: ${user.usuario}</p>
          <p>Password: ${user.password}</p>
        </div>
      `
    );
  }

  lookingData() {
    const userData = JSON.parse(localStorage.getItem("list"))
    const nombre = this.shadowRoot.querySelector("#name").value.trim();
    const numero = this.shadowRoot.querySelector("#num").value.trim();
    const userDataTable = this.shadowRoot.querySelector("#userDataTable2");
    const tbody = userDataTable.querySelector("tbody");
    const personalInformation = this.shadowRoot.querySelector(
      "#personalInformation"
    );
    tbody.innerHTML = "";

    if (userData && nombre && numero) {
      userData.forEach((user) => {
        this.showPersonalInfo = true;
        if (
          (nombre && user.usuario === nombre) ||
          (numero && user.password === numero)
        ) {
          // Create a new row for each property
          for (const prop in user) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <th scope="row">${prop}:</th>
                <td>${user[prop]}</td>
              `;
            tbody.appendChild(row);
          }
        }
      });

      if (tbody.children.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="3">No matching users found.</td></tr>';
      }
      personalInformation.style.display = "block";
    } else {
      userData.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${user.usuario}</td>
          <td>${user.password}</td>
        `;
        tbody.appendChild(row);
      });
      personalInformation.style.display = "none";
    }
  }

  popup() {
    const popupElement = this.shadowRoot.querySelector("#popup-1");
    if (popupElement) {
      popupElement.classList.toggle("active");
    }
    
    this.shadowRoot.querySelector("#addUserButton").addEventListener("click", () => this.popup());


    let usuario = this.shadowRoot.querySelector("#usuario").value.trim();
    let password = this.shadowRoot.querySelector("#password").value.trim();
    let email = this.shadowRoot.querySelector("#email").value.trim();
    let phNumber = this.shadowRoot.querySelector("#phone-number").value.trim();
    const campaignSelect = this.shadowRoot.querySelector("#campaign");
    const selectedCampaign = campaignSelect.value;

    let data = JSON.parse(localStorage.getItem("list")) || []; // Initialize data from localStorage or create an empty array

    if (data.find((dataList) => dataList.email === email)) {
      alert(`El usuario ${data.email} ya existe`);
    } else {
      data.push({
        usuario: usuario,
        password: password,
        email: email,
        celular: phNumber,
        campaña: selectedCampaign,
      });

      localStorage.setItem("list", JSON.stringify(data));
      alert("Usuario creado exitosamente");
      console.log(data);
      window.location.reload();
    }
  }

  callingPopup(open) {
    const call = this.shadowRoot.querySelector("#call");
    if (call) {
      if (open) {
        call.classList.add("active"); // Abre el modal
      } else {
        call.classList.remove("active"); // Cierra el modal
      }
    }

    if (open) {
      this.usersLlamados++;
    }else{
      this.usersDeclined++;
    }

  // Guarda los valores en el almacenamiento local
  localStorage.setItem('usersLlamados', this.usersLlamados);
  localStorage.setItem('usersDeclined', this.usersDeclined);

  this.requestUpdate();
  }

  render() {
    const userData = JSON.parse(localStorage.getItem("list"));
    const campaignData = JSON.parse(localStorage.getItem("list-c"))

    const activeCampaigns = campaignData.filter((campaign) => {
      return campaign.estado === "Activa";
    });

    return html`
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div class="body">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />

        <div class="popup" id="popup-1">
          <div class="overlay"></div>
          <div class="content">
            <div class="close-btn" @click=${this.popup}>&times;</div>
            <h1>Nuevo Usuario</h1>

            <div class="input-groupM mt-15" style="width: 12rem;">
              <input
                class="form-control"
                id="usuario"
                type="text"
                placeholder="Usuario"
              />
            </div>

            <div class="input-groupM mt-15" style="width: 12rem;">
              <input
                class="form-control"
                id="password"
                type="text"
                placeholder="Password"
              />
            </div>

            <div class="input-groupM mt-15" style="width: 12rem;">
              <input
                class="form-control"
                id="email"
                type="text"
                placeholder="Email"
              />
            </div>

            <div class="input-groupM mt-15" style="width: 12rem;">
              <input
                class="form-control"
                id="phone-number"
                type="number"
                placeholder="Phone number"
              />
            </div>

            <div class="input-groupM mt-15" style="width: 12rem;">
              <select id="campaign" name="campaign">
                ${activeCampaigns.map(
                  (campaign) => html`
                    <option value="${campaign.nombreCampaña}">
                      ${campaign.nombreCampaña}
                    </option>
                  `
                )}
              </select>
            </div>

            &nbsp;&nbsp;

            <button
              type="button"
              @click=${this.popup}
              id="addUserButton"
              class="mt-1 text-center"
              style=" width: 7rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); color: white;"
            >
              Add User
            </button>
          </div>

          <div class="popup" id="call">
            <div class="overlay"></div>
            <div class="content">
              <div class="close-btn" @click=${() => this.callingPopup(false)}>
                &times;
              </div>
              <h1>Hello!!</h1>

              &nbsp;&nbsp;

              <button
                type="button"
                @click=${() => this.callingPopup(false)}
                id="callUserButton"
                class="mt-1 text-center"
                style=" width: 7rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); color: white;"
              >
                Decline
              </button>
            </div>

            <div class="d-flex ">
              <div class="pt-2 d-flex justify-content-left ">
                <div
                  class="d-flex  flex-shrink-0 p-3 ml-5"
                  style="width: 250px; background-color: rgb(201, 205, 207); border-radius: 1rem; height: 38.9rem;"
                >
                  <hr />
                  <ul
                    class="nav nav-pills flex-column mb-auto"
                    style="width: 25rem;"
                  >
                    <li class="nav-item">
                      <button
                        class="nav-link active bg-light pt-2 font-weight-bold"
                        style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;"
                        aria-current="page"
                      >
                        <span class="material-symbols-outlined" id="p">
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
                          </svg> </span
                        >Usuarios
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        @click=${(e) => this.goToCampañas()}
                        class="nav-link active bg-light pt-2 font-weight-bold"
                        style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;"
                        aria-current="page"
                      >
                        <span class="material-symbols-outlined" id="p">
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
                        </span>
                        Campañas
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        @click=${(e) => this.goToEquipos()}
                        class="nav-link active bg-light pt-2 font-weight-bold"
                        style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;"
                        aria-current="page"
                      >
                        <span class="material-symbols-outlined" id="p">
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
                        </span>
                        Equipos
                      </button>
                    </li>
                  </ul>
                  <hr />
                </div>
              </div>
              &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
              <!-- cajas de texto-->
              <div class="pt-2  align-items-center">
                <div class="d-flex justify-content-left ">
                  &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
                  <div class="row d-flex">
                    <div class="row g-0 text-center pt-3 ">
                      <div id="caja11" class="col-sm-5 col-md-4">
                        ${userData.length}
                      </div>
                      <div id="caja1" class="col-md-5  pt-2">
                        Usuarios Conectados
                      </div>
                    </div>
                    &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
                    <div class="row g-0 text-center pt-3 ">
                      <div id="caja22" class="col-sm-6 col-md-4">${this.usersDeclined}</div>
                      <div id="caja2" class="col-md-4  pt-2">
                        Usuarios Ausentes
                      </div>
                    </div>
                    &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
                    <div class="row g-0 text-center pt-3 " id="pir">
                      <div id="caja33" class="col-sm-6 col-md-4">
                        ${campaignData.length}
                      </div>
                      <div id="caja3" class="col-md-5  pt-2">
                        Campañas Activas
                      </div>
                    </div>

                    &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
                    <div class="row g-0 text-center pt-3 " id="pir">
                      <div id="caja44" class="col-sm-6 col-md-4">
                        ${this.usersLlamados}
                      </div>
                      <div id="caja4" class="col-md-5  pt-2">
                        Usuarios Llamados
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                <div id="cuadro" class="container border border-dark">
                  <div class="d-flex p-3">
                    <div
                      class=" border border-dark"
                      style="width: 14rem; height: 30rem; border-radius: 1rem;"
                    >
                      <div>
                        <div
                          class="d-flex flex-shrink-0 p-3"
                          style="width: 222px; background-color: rgb(201, 205, 207); border-top-left-radius: 1rem; border-top-right-radius: 1rem; height: 11rem; "
                        >
                          <hr />
                          <ul
                            class="nav nav-pills flex-column mb-auto"
                            style="width: 25rem;"
                          >
                            <div
                              class="input-group mt-15"
                              style="width: 12rem;"
                            >
                              <input class="form-control" id="num"
                              font-weight-bold" type="text"
                              placeholder="Número">
                            </div>
                            <div class="input-group mt-3" style="width: 12rem;">
                              <input class="form-control" id="name"
                              font-weight-bold" type="text"
                              placeholder="Nombre">
                            </div>

                            <div class="d-flex justify-content-center">
                              <button
                                id="btn"
                                @click=${this.lookingData}
                                class="mt-2 text-center"
                                style=" width: 5rem; border-radius: 5px; border: rgb(250, 101, 101); color: white;"
                              >
                                Buscar
                              </button>
                            </div>
                          </ul>
                          <hr />
                        </div>
                      </div>

                      <div
                        id="personalInformation"
                        style="${this.showPersonalInfo ? "" : "display: none;"}"
                      >
                        <h5>Información Personal 2023</h5>
                        ${userData && userData.length > 0
                          ? html` <table id="userDataTable2">
                              <tbody>
                                ${userData.map(
                                  (user) => html`
                                    <tr>
                                      <th scope="row">Nombre:</th>
                                      <td>${user.usuario}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Password:</th>
                                      <td>${user.password}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Email:</th>
                                      <td>${user.email}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Celular:</th>
                                      <td>${user.celular}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Campaña:</th>
                                      <td>${user.campaña}</td>
                                    </tr>
                                  `
                                )}
                              </tbody>
                            </table>`
                          : html`<p>No user data available.</p>`}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br />

                        <button
                          type="button"
                          @click=${() => this.callingPopup(true)}

                          id="calling" class="mt-1 text-center" style=" width: 7rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); color: black;">
                      Llamar
                        </button>
                      </div>
                    </div>

                    <div>
                      <div class="d-flex justify-content-around ">
                        <div class=" ml-5">
                          <div class="row g-0 text-center pt-1 ">
                            <div
                              class="col-sm-6 col-md-4 pt-2 border border-secondary font-weight-bold"
                              style="width: 25rem; font-size: 20px; height: 3rem; border-radius: 7px;"
                            >
                              Básico
                            </div>
                            <div
                              class="col-sm-6 col-md-4 pt-2 border border-secondary font-weight-bold"
                              style="width: 25rem; font-size: 20px; height: 3rem; border-radius: 7px; margin-left:5px;"
                            >
                              Avanzado
                            </div>
                          </div>
                        </div>
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <div class="d-flex justify-content-right ml-5">
                          <button
                            @click=${this.popup}
                            id="newUser"
                            class="mt-1 text-center"
                            style=" width: 7rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); color: white;"
                          >
                            Nuevo
                          </button>
                        </div>
                      </div>
                      <div
                        class="container border border-dark mt-4 ml-4"
                        style="border-radius: 1rem; width: 40rem; height: 22.5rem;"
                      >
                        <h1>Lista de Usuarios</h1>
                        ${activeCampaigns.length > 0
                          ? html`
                              <table
                                id="userDataTable"
                                class="table table-bordered"
                              >
                                <thead>
                                  <tr>
                                    <th scope="col" id="numeros">#</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Celular</th>
                                    <th scope="col">Campaña</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  ${userData.map((user, index) => {
                                    return html`
                                      <tr>
                                        <td>${index + 1}</td>
                                        <td>${user.usuario}</td>
                                        <td>${user.password}</td>
                                        <td>${user.email}</td>
                                        <td>${user.celular}</td>
                                        <td>${user.campaña}</td>
                                      </tr>
                                    `;
                                  })}
                                </tbody>
                              </table>
                            `
                          : html`<p>No user data available...</p>`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("segundo-c", Apartado1);
