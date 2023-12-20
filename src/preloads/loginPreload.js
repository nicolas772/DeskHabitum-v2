const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login");
  const registerButton = document.getElementById("registro");

  loginButton.addEventListener('click', async () => {
    const obj = {
      email: emailInput.value,
      password: passwordInput.value
    };
    
    try {
      await ipcRenderer.invoke("login", obj);
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
    }
  });

  registerButton.addEventListener('click', () => {
    ipcRenderer.invoke("moveToReg");
  });
});
