import { LitElement, html } from "lit-element";
import styleSheetComp3 from "./styles/tercer-comp.js";
import { Router } from "@vaadin/router";
import modal from "./styles/modal.js";

export class Apartado2 extends LitElement {
  constructor() {
    super();
    this.checkingData();
    this.showPersonalInfo = false; // Initialize the flag
}

  static get styles() {
    return [styleSheetComp3, modal];
  }

  goToUsers() {
    Router.go("/primer-dashboard")
  }

  goToCampañas(){
    Router.go("/segundo-dashboard")
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

  renderCampañaData(campaignData) {
    return campaignData.map(
      (campaign) => html`
        <div>
          <p>Campaña: ${campaign.nombreCampaña}</p>
          <p>Director: ${campaign.director}</p>
          <p>Empresa: ${campaign.empresa}</p>
          <p>Team: ${campaign.team}</p>
          <p>Inicia: ${campaign.inicia}</p>
          <p>Estado: ${campaign.estado}</p>
        </div>
      `
    );
  }

  lookingData() {
    const campaignData = JSON.parse(localStorage.getItem("list-c"));
    const nombre = this.shadowRoot.querySelector("#name").value.trim();
    const numero = this.shadowRoot.querySelector("#num").value.trim();
  
    const userDataTable = this.shadowRoot.querySelector("#userDataTable2");
    const tbody = userDataTable.querySelector("tbody");
    const personalInformation = this.shadowRoot.querySelector("#personalInformation");
    tbody.innerHTML = "";
  
    if (campaignData && (nombre && numero)) {
      campaignData.forEach((campaign) => {
          this.showPersonalInfo = true;
        if (
          (nombre && campaign.director === nombre) ||
          (numero && campaign.nombreCampaña === numero)
        ) {
          // Create a new row for each property
          for (const prop in campaign) {
            const row = document.createElement('tr');
            row.innerHTML = `
              <th scope="row">${prop}:</th>
              <td>${campaign[prop]}</td>
            `;
            tbody.appendChild(row);
          }
        }
      });
    
      if (tbody.children.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">No matching campaigns found.</td></tr>';
      }
      personalInformation.style.display = "block";
    } else {
      campaignData.forEach((campaign, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${campaign.nombreCampaña}</td>
          <td>${campaign.director}</td>
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

    const nombreCampaña = this.shadowRoot.querySelector("#nombreCampaña").value.trim();
    const director = this.shadowRoot.querySelector("#director").value.trim();
    const empresa = this.shadowRoot.querySelector("#empresa").value.trim();
    const team = this.shadowRoot.querySelector("#team").value.trim();
    const inicia = this.shadowRoot.querySelector("#inicia").value.trim();
    const estado = this.shadowRoot.querySelector("#status-choice").value.trim(); // Fixed the ID name
    const teamSelect = this.shadowRoot.querySelector("#team");
    const selectedTeam = teamSelect.value;

    // Validation here if needed

    const data = JSON.parse(localStorage.getItem("list-c")) || [];

    if (data.find((dataList) => dataList.nombreCampaña === nombreCampaña)) {
      alert(`The campaign ${nombreCampaña} already exists.`);

      if(nombreCampaña == "" || nombreCampaña == undefined || nombreCampaña == null){
        alert('DEBE INGRESAR UN VALOR')
      }

    } else {
      data.push({
        nombreCampaña: nombreCampaña,
        director: director,
        empresa: empresa,
        team: selectedTeam,
        inicia: inicia,
        estado: estado,
      });
      localStorage.setItem("list-c", JSON.stringify(data));
      alert("Campaign created successfully.");
      console.log(data);
      window.location.reload();
    }
  }
  render() {
    const campaignData = JSON.parse(localStorage.getItem("list-c"));
    const teamData = JSON.parse(localStorage.getItem("teams"))

    return html`
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />        <div class="body">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <div class="popup" id="popup-1">
        <div class="overlay"></div>
        <div class="content">
    <div class="close-btn" @click=${this.popup}>&times;</div>
    <h1>Nueva Campaña</h1>

    <div class="input-groupM mt-15" style="width: 12rem;">
        <input class="form-control" id="nombreCampaña" type="text" placeholder="Nombre">
    </div>

    <div class="input-groupM mt-15" style="width: 12rem;">
        <input class="form-control" id="director" type="text" placeholder="Director">
    </div>

    <div class="input-groupM mt-15" style="width: 12rem;">
        <input class="form-control" id="empresa" type="text" placeholder="Empresa">
    </div>

    <div class="input-groupM mt-15" style="width: 12rem;">
    <p>Team</p>
    <select id="team" name="team">
      ${teamData.map(
        (team) => html`
          <option value="${team.equipo}">
            ${team.equipo}
          </option>
        `
      )}
    </select>
  </div>

  <div class="input-groupM mt-15" style="width: 12rem;">
  <input class="form-control" id="inicia" type="date" placeholder="Inicia">
</div>

  <div class="input-groupM mt-15" style="width: 12rem;">
  <input list="estado" id="status-choice" name="status-choice">

  <datalist id="estado">
    <option value="Activa"></option>
    <option value="Inactiva"></option>
</datalist>
</div>

    &nbsp;&nbsp;

    <button type="button" @click=${
      this.popup
    } id="addUser" class="mt-1 text-center" style=" width: 20rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); color: white;">
      Add Campaign
    </button>
</div>


    <div class="d-flex ">
    <div class="pt-2 d-flex justify-content-left ">
        <div class="d-flex  flex-shrink-0 p-3 ml-5" style="width: 250px; background-color: rgb(201, 205, 207); border-radius: 1rem; height: 38.5rem;">
            <hr>
            <ul class="nav nav-pills flex-column mb-auto" style="width: 25rem;">
                <li class="nav-item">
                    <button  @click=${(e) =>
                      this.goToUsers()} class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;" aria-current="page">
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
              /></svg
          >
                    </span>Usuarios
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;" aria-current="page">
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
              /></svg
          >
                        </span> Campañas
                    </button>
                </li>
                <li class="nav-item">
                <button  @click=${(e) =>
                  this.goToEquipos()} class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; width: 13.5rem; font-size: 18px;" aria-current="page">
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
              /></svg
          >
                    </span> Equipos
                    </button>
                </li>
            </ul>
            <hr>
        </div>
    </div>
    &nbsp&nbsp&nbsp
    &nbsp&nbsp&nbsp
    <!-- cajas de texto-->
    <div class="pt-2  align-items-center">
    <div class="d-flex justify-content-left ">
      &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
      <div class="row d-flex">
        <div class="row g-0 text-center pt-3 ">
          <div id="caja11" class="col-sm-5 col-md-4">

          </div>
          <div id="caja1" class="col-md-5  pt-2">
            Usuarios Conectados
          </div>
        </div>
        &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
        <div class="row g-0 text-center pt-3 ">
          <div id="caja22" class="col-sm-6 col-md-4">10</div>
          <div id="caja2" class="col-md-4  pt-2">
            Usuarios Ausentes
          </div>
        </div>
        &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
        <div class="row g-0 text-center pt-3 " id="pir">
          <div id="caja33" class="col-sm-6 col-md-4">

          </div>
          <div id="caja3" class="col-md-5  pt-2">
            Campañas Activas
          </div>
        </div>

        &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
        <div class="row g-0 text-center pt-3 " id="pir">
          <div id="caja44" class="col-sm-6 col-md-4">

          </div>
          <div id="caja4" class="col-md-5  pt-2">
            Usuarios Llamados
          </div>
        </div>
      </div>
    </div>
        <br>

        <div id="cuadro" class="container border border-dark">
            <div class="d-flex p-3" >
                <div class=" border border-dark" style="width: 14rem; height: 30rem; border-radius: 1rem;">
                    <div>
                        <div class="d-flex  flex-shrink-0 p-3" style="width: 222px; background-color: rgb(201, 205, 207); border-top-left-radius: 1rem; border-top-right-radius: 1rem; height: 11rem; ">
                            <hr>
                            <ul class="nav nav-pills flex-column mb-auto" style="width: 25rem;">
                            <div class="input-group mt-15" style="width: 12rem;">
                            <input class="form-control" id="num" font-weight-bold" type="text" placeholder="Nombre de Campaña">
                        </div>
                        <div class="input-group mt-3" style="width: 12rem;">
                            <input class="form-control" id="name" font-weight-bold" type="text" placeholder="Director">
                        </div>
                        <div class="d-flex justify-content-center">
                        <button id="btn" @click=${
                          this.lookingData
                        } class="mt-2 text-center" style=" width: 5rem; border-radius: 5px; border: rgb(250, 101, 101); color: white;">Buscar</button>
                    </div>
                            </ul>
                            <hr>
                        </div>
                    </div>
                    <div id="personalInformation" style="${this.showPersonalInfo ? '' : 'display: none;'}">
                      <h5>Información Campaign</h5>
                      ${
                        campaignData && campaignData.length > 0
                          ? html`
                              <table id="userDataTable2">
                                <tbody>
                                  ${campaignData.map(
                                    (user) => html`
                                      <tr>
                                        <th scope="row">Campaña:</th>
                                        <td>${user.nombreCampaña}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Director:</th>
                                        <td>${user.director}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Empresa:</th>
                                        <td>${user.empresa}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Team:</th>
                                        <td>${user.team}</td>
                                      </tr>
                                      <tr>
                                      <th scope="row">Inicia:</th>
                                      <td>${user.inicia}</td>
                                      </tr>
                                      <tr>
                                      <th scope="row">Status:</th>
                                      <td>${user.estado}</td>
                                      </tr>
                                    `
                                  )}
                                </tbody>
                              </table>`
                          : html`<p>No user data available.</p>`
                      }
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <br>
                      

                    </div>
                </div>
                <div>
                    <div class="d-flex justify-content-around ">
                        <div class=" ml-5">
                            <div class="row g-0 text-center pt-1 ">
                                <div class="col-sm-6 col-md-10 pt-2 border border-secondary font-weight-bold" style="width: 15rem; font-size: 20px; height: 3rem; border-radius: 7px;">Datos de llamada</div>
                            </div>       
                        </div>
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <div class="d-flex justify-content-right ml-5">
                            <button class="mt-1 id="mt-1" text-center" style=" width: 18rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); color: white;">
                            <p>10:00:00
        
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                          </svg>

                            </p>
                            </button>

                        </div>
                    </div>
                    <div class="container border border-dark mt-4 ml-4" style="border-radius: 1rem; width: 40rem; height: 25.1rem;">
                    <h1>Lista de Campañas</h1>

                    <button @click=${
                      this.popup
                    } id="newUser" class="mt-1 text-center" style=" width: 7rem; height: 50px; border-radius: 5px; border: rgb(250, 101, 101); color: white;">
                    Nuevo
                    </button>
  ${
    campaignData && campaignData.length > 0
      ? html` <table id="userDataTable" class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" id="numeros">#</th>
              <th scope="col">Campaña</th>
              <th scope="col">Director</th>
              <th scope="col">Empresa</th>
              <th scope="col">Team</th>
              <th scope="col">Inicia</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
          ${campaignData.map(
            (campaña, index) => html`
              <tr>
                <th scope="row">${index++}</th>
                <td>${campaña.nombreCampaña}</td>
                <td>${campaña.director}</td>
                <td>${campaña.empresa}</td>
                <td>${campaña.team}</td>
                <td>${campaña.inicia}</td>
                <td>${campaña.estado}</td>
              </tr>
            `
          )}
          </tbody>
        </table>`
      : html`<p>No campaña data available.</p>`
  }
</div>

<!-- <div class="top-rectangle"></div>
<div class="bottom-rectangle"></div> -->
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

customElements.define("tercer-c", Apartado2);
