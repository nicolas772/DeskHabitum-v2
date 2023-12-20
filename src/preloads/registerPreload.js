const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById("reg_email");
  const passwordInput = document.getElementById("reg_pass");
  const nombreInput = document.getElementById("reg_user");
  const apellidoInput = document.getElementById("reg_apellido");
  const regBtn = document.getElementById("reg_btn");
  const volverBtn = document.getElementById("volver_login");

  regBtn.addEventListener('click', async () => {
    const datos = {
      nombre: nombreInput.value,
      apellido: apellidoInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    try {
      await ipcRenderer.invoke("register", datos);
    } catch (error) {
      console.error('Error al intentar registrarse:', error);
    }
  });

  volverBtn.addEventListener('click', () => {
    ipcRenderer.invoke("moveToLogin");
  });
});
