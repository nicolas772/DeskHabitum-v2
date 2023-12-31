const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('path')
const db = require('./models');
const authController = require('./controllers/auth.controller')
const Store = require('electron-store');
const userDataStore = new Store({ name: 'userData' });

let winLogin
let winRegister
let winMain

db.sequelize.sync({ alter:false }).then(() => {
  console.log('Drop and Resync Db');
});

const createLoginWindow = () => {
  winLogin = new BrowserWindow({
    width: 1300,
    height: 900,
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

const createHomeWindow = () => {
  winMain = new BrowserWindow({
    width: 1000,
    height: 700,
    minHeight: 400,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preloads/homePreload.js'),
      enableRemoteModule: true
    }
  })
  winMain.loadFile('src/views/home.html')
}

app.whenReady().then(() => {
  const storedData = userDataStore.get('userData', null);
  if (storedData){
    createHomeWindow()
  } else{
    createLoginWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('login', async (event, obj) => {
  const res = await authController.login(obj)
  if (res.success) {
    userDataStore.set('userData', res.data);
    createHomeWindow()
    winLogin.close()
    new Notification({
      title: "Desk Habitum",
      body: `Bienvenid@, ${res.data.nombre}!`,
    }).show()
    return
  }
  new Notification({
    title: res.title,
    body: res.message,
  }).show()
});

ipcMain.handle('getUserData', (event, obj) => {
  // Acceder a los datos almacenados
  const storedData = userDataStore.get('userData', null);
  return storedData;
});

ipcMain.handle('logout', (event, obj) => {
  // Acceder a los datos almacenados
  const storedData = userDataStore.get('userData', null);
  createLoginWindow()
  winMain.close()
  new Notification({
    title: "Sesión Finalizada",
    body: `Hasta pronto, ${storedData.nombre}!`,
  }).show()
  userDataStore.set('userData', null);
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