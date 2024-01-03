// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', () => {
   const information = document.getElementById('username');
   const logoutBtn = document.getElementById('logoutBtn');
   const activateBtnModal = document.getElementById('activateBtnModal');
   const activateBtn = document.getElementById("activateBtn");
   const divActivateBtn = document.getElementById("divActivateBtn");
   const loadingSpinner = document.getElementById("loadingSpinner");
   const deactivateBtn = document.getElementById("deactivateBtn");
   const divDeactivateBtn = document.getElementById("divDeactivateBtn");

   obtenerYMostrarDatos(information);

   //Buttons

   logoutBtn.addEventListener('click', async () => {
      await window.api.logout();
   });
   
   activateBtnModal.addEventListener("click", async function () {
      divActivateBtn.classList.add("oculto");
      loadingSpinner.classList.remove("d-none");
      setTimeout(async function () {
         loadingSpinner.classList.add("d-none");
         await window.api.activateMonitoring();
         divDeactivateBtn.classList.remove("oculto");
      }, 5000);
      
   });
});

async function obtenerYMostrarDatos(information) {
   try {
      const user = await window.api.userData();
      information.innerText = `Hola! ${user.nombre}`;
      return user
   } catch (error) {
      console.error('Error al obtener los datos:', error);
   }
}
