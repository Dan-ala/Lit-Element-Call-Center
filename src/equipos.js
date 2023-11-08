import { LitElement, html } from "lit-element";
import styleSheet4 from "./styles/styles4.js";
import modal from "./styles/modal.js";
import { Router } from "@vaadin/router";

export class Equipos extends LitElement {
  constructor() {
    super();
    this.checkingData();
    this.showPersonalInfo = false; // Initialize the flag
  }

  static get styles() {
    return [styleSheet4, modal];
  }

  goToUsers() {
    Router.go("/primer-dashboard");
  }

  goToCampañas() {
    Router.go("/segundo-dashboard");
  }

  checkingData() {
    const userData = JSON.parse(localStorage.getItem("list"));

    if (!userData || userData.length === 0) {
      alert("Debe haber iniciado sesión para poder ver los datos");
      Router.go("/");
    }
  }

  renderUserData(teamData) {
    return teamData.map(
      (team) => html`
        <div>
          <p>Team: ${team.equipo}</p>
          <p>Estado: ${team.estado}</p>
        </div>
      `
    );
  }

  lookingData() {
    const teamData = JSON.parse(localStorage.getItem("teams"))
    const nombre = this.shadowRoot.querySelector("#name").value.trim();
    const numero = this.shadowRoot.querySelector("#num").value.trim();
    const userDataTable = this.shadowRoot.querySelector("#userDataTable2");
    const tbody = userDataTable.querySelector("tbody");
    const personalInformation = this.shadowRoot.querySelector(
      "#personalInformation"
    );
    tbody.innerHTML = "";

    if (teamData && nombre && numero) {
      teamData.forEach((team) => {
        this.showPersonalInfo = true;
        if (
          nombre && team.equipo === nombre &&
          numero && team.estado === numero
        ) {
          // Create a new row for each property
          for (const prop in team) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <th scope="row">${prop}:</th>
                <td>${team[prop]}</td>
              `;
            tbody.appendChild(row);
          }
        }
      });

      if (tbody.children.length === 0) {
        tbody.innerHTML =
          '<tr><td colspan="3">No matching teams found.</td></tr>';
      }
      personalInformation.style.display = "block";
    } else {
      teamData.forEach((team, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${team.equipo}</td>
          <td>${team.estado}</td>
        `;
        tbody.appendChild(row);
      });
      personalInformation.style.display = "none";
    }
  }

  popup() {
    const popupElement = this.shadowRoot.querySelector("#popup-3");
    if (popupElement) {
      popupElement.classList.toggle("active");
    }

    let equipo = this.shadowRoot.querySelector("#equipo").value.trim();
    let estado = this.shadowRoot.querySelector("#status-choice").value.trim();
    

    let data = JSON.parse(localStorage.getItem("teams")) || []; // Initialize data from localStorage or create an empty array

    if (data.find((dataList) => dataList.equipo === equipo)) {
      alert(`El equipo ${data.equipo} ya existe`);
    } else {
      data.push({
        equipo: equipo,
        estado: estado,
      });

      localStorage.setItem("teams", JSON.stringify(data));
      alert("Equipo creado exitosamente");
      console.log(data);
      window.location.reload();
    }
  }

  render() {
    const teamData = JSON.parse(localStorage.getItem("teams"));

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

        <div class="popup" id="popup-3">
          <div class="overlay"></div>
          <div class="content">
            <div class="close-btn" @click=${this.popup}>&times;</div>
            <h1>Nuevo Equipo</h1>

            <div class="input-groupM mt-15" style="width: 12rem;">
              <input
                class="form-control"
                id="equipo"
                type="text"
                placeholder="Equipo"
              />
            </div>


            <div class="input-groupM mt-15" style="width: 12rem;">
            <input list="estado" id="status-choice" name="status-choice">
      
            <datalist id="estado">
              <option value="Activa"></option>
              <option value="Inactiva"></option>
          </datalist>
          </div>

            &nbsp;&nbsp;

            <button
              type="button"
              @click=${this.popup}
              id="addUser"
              class="mt-1 text-center"
              style=" width: 7rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); color: white;"
            >
              Add Team
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
                  @click=${(e) => this.goToUsers()}
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
                    </div>
                    <div id="caja1" class="col-md-5  pt-2">
                      Equipos disponibles
                    </div>
                  </div>
                  &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
                  <div class="row g-0 text-center pt-3 ">
                    <div id="caja22" class="col-sm-6 col-md-4">10</div>
                    <div id="caja2" class="col-md-4  pt-2">
                    Equipos Ausentes
                    </div>
                  </div>
                  &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
                  <div class="row g-0 text-center pt-3 " id="pir">
                    <div id="caja33" class="col-sm-6 col-md-4">10</div>
                    <div id="caja3" class="col-md-5  pt-2">
                      Equipos Activas
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
                          <div class="input-group mt-15" style="width: 12rem;">
                            <input class="form-control" id="num"
                            font-weight-bold" type="text" placeholder="Estado">
                          </div>
                          <div class="input-group mt-3" style="width: 12rem;">
                            <input class="form-control" id="name"
                            font-weight-bold" type="text" placeholder="Equipo">
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
                      <h5>Información - Equipo</h5>
                      ${teamData && teamData.length > 0
                        ? html` <table id="userDataTable2">
                            <tbody>
                              ${teamData.map(
                                (team) => html`
                                  <tr>
                                    <th scope="row">Equipo:</th>
                                    <td>${team.equipo}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Estado:</th>
                                    <td>${team.estado}</td>
                                  </tr>
                                
                                `
                              )}
                            </tbody>
                          </table>`
                        : html`<p>No team data available.</p>`}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <br />
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
                    <h1>Lista de Equipos</h1>
                    ${teamData && teamData.length > 0
                      ? html`
                          <table id="userDataTable" class="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col" id="numeros">#</th>
                                <th scope="col">Equipo</th>
                                <th scope="col">Estado</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${teamData.map((team, index) => {
                                return html`
                                  <tr>
                                    <td>${index ++}</td>
                                    <td>${team.equipo}</td>
                                    <td>${team.estado}</td>
                                  </tr>
                                `;
                              })}
                            </tbody>
                          </table>
                        `
                      : html`<p>No team data available...</p>`}
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

customElements.define("team-s", Equipos);
