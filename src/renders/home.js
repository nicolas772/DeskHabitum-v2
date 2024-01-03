// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
   const name = document.getElementById('username');
   const statusMonitoring = document.getElementById('statusMonitoring')
   const logoutBtn = document.getElementById('logoutBtn');
   const activateBtnModal = document.getElementById('activateBtnModal');
   const activateBtn = document.getElementById("activateBtn");
   const divActivateBtn = document.getElementById("divActivateBtn");
   const loadingSpinner = document.getElementById("loadingSpinner");
   const deactivateBtn = document.getElementById("deactivateBtn");
   const divDeactivateBtn = document.getElementById("divDeactivateBtn");
   const deactivateBtnModal = document.getElementById('deactivateBtnModal');

   obtenerYMostrarDatos(name, statusMonitoring);

   //Buttons

   const data = await window.api.userData();
   const status = data.estadoMonitoreo

   if (status === "Desactivado"){
      divActivateBtn.classList.remove("oculto");
      divDeactivateBtn.classList.add("oculto");
   }else {
      divDeactivateBtn.classList.remove("oculto");
      divActivateBtn.classList.add("oculto");
   }

   logoutBtn.addEventListener('click', async () => {
      await window.api.logout();
   });
   
   activateBtnModal.addEventListener("click", async function () {
      divActivateBtn.classList.add("oculto");
      loadingSpinner.classList.remove("d-none");
      setTimeout(async function () {
         loadingSpinner.classList.add("d-none");
         await window.api.activateMonitoring();
         const data = await window.api.userData();
         statusMonitoring.innerText = `${data.estadoMonitoreo}`;
         divDeactivateBtn.classList.remove("oculto");
      }, 5000);
   });

   deactivateBtnModal.addEventListener("click", async function () {
      divDeactivateBtn.classList.add("oculto");
      loadingSpinner.classList.remove("d-none");
      setTimeout(async function () {
         loadingSpinner.classList.add("d-none");
         await window.api.deactivateMonitoring();
         const data = await window.api.userData();
         statusMonitoring.innerText = `${data.estadoMonitoreo}`;
         divActivateBtn.classList.remove("oculto");
      }, 3000);
   });
});

async function obtenerYMostrarDatos(name, statusMonitoring) {
   try {
      const data = await window.api.userData();
      name.innerText = `Hola! ${data.user.nombre}`;
      statusMonitoring.innerText = `${data.estadoMonitoreo}`;
      return data
   } catch (error) {
      console.error('Error al obtener los datos:', error);
   }
}
