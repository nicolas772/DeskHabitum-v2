const { ipcRenderer } = require('electron')
const authController = require('../controllers/auth.controller')

let nombre;
let apellido;
let email;
let password;
let regbtn;
let volver;

window.onload = function () {
  email = document.getElementById("reg_email")
  password = document.getElementById("reg_pass")
  nombre = document.getElementById("reg_user")
  apellido = document.getElementById("reg_apellido")
  regbtn = document.getElementById("reg_btn")
  volver = document.getElementById("volver_login")

  regbtn.onclick = async function () {
    const datos = { nombre: nombre.value, apellido: apellido.value, email: email.value, password: password.value }
    ipcRenderer.invoke("register", datos)
  }

  volver.onclick = function () {
    ipcRenderer.invoke("moveToLogin")
  }
}