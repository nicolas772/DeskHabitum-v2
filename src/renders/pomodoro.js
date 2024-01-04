// En tu archivo de renderizado
document.addEventListener('DOMContentLoaded', async () => {
   const name = document.getElementById('username');
   const statusMonitoring = document.getElementById('statusMonitoring')
   const logoutBtn = document.getElementById('logoutBtn');
   const setting = document.getElementById('setting');
   const perfil = document.getElementById('perfil');

   obtenerYMostrarDatos(name, statusMonitoring);

   //Buttons

   logoutBtn.addEventListener('click', async () => {
      await window.api.logout();
   });
   setting.addEventListener('click', async () => {
      await window.api.openSetting();
   });

   perfil.addEventListener('click', async () => {
      await window.api.openPerfil();
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
