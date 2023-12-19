const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('path')
const db = require('./models');
const authController = require('./controllers/auth.controller')

let winLogin
let winRegister

const createLoginWindow = () => {
  winLogin = new BrowserWindow({
    width: 1000,
    height: 700,
    minHeight: 400,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preloads/loginPreload.js'),
      enableRemoteModule: true
    }
  })
  winLogin.loadFile('src/views/login.html')
}

const createRegisterWindow = () => {
  winRegister = new BrowserWindow({
    width: 1000,
    height: 700,
    minHeight: 400,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preloads/registerPreload.js'),
      enableRemoteModule: true
    }
  })
  winRegister.loadFile('src/views/register.html')
}

db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Db');
});

app.whenReady().then(() => {
  createLoginWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('login', (event, obj) => {
  console.log(obj)
});

ipcMain.handle('register', async (event, obj) => {
  const res = await authController.signup(obj) 
  new Notification({
    title: res.title,
    body: res.message,
  }).show()
});

//Movimiento entre vistas login/registro
ipcMain.handle('moveToReg', (event, obj) => {
  createRegisterWindow();
  winLogin.close();
});

ipcMain.handle('moveToLogin', (event, obj) => {
  createLoginWindow()
  winRegister.close();
});