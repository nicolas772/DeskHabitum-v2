// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', () => {
   const information = document.getElementById('info-home');
   const logoutBtn = document.getElementById('logoutBtn');

   async function obtenerYMostrarDatos() {
      try {
         const user = await window.api.userData();
         information.innerText = `Bienvenid@ ${user.nombre}`;
         return user
      } catch (error) {
         console.error('Error al obtener los datos:', error);
      }
   }

   obtenerYMostrarDatos();

   logoutBtn.addEventListener('click', async () => {
      await window.api.logout();
   });
});
