const { app, BrowserWindow, Notification, ipcMain, dialog } = require('electron')
const path = require('path')
const db = require('./models');
const authController = require('./controllers/auth.controller')
const Store = require('electron-store');
const userDataStore = new Store({ name: 'userData' });
userDataStore.set('monitoreo', 'Desactivado'); // Puedes cambiar `true` por el valor que desees

let winLogin = null
let winRegister
let winMain = null
let winSetting
let winPerfil
let winContactar

// Mantén un registro de las ventanas abiertas
const openWindows = {};

db.sequelize.sync({ alter: false }).then(() => {
  console.log('Drop and Resync Db');
});

const createLoginWindow = () => {
  winLogin = new BrowserWindow({
    width: 1100,
    height: 788,
    minWidth: 1100,
    minHeight: 786,
    webPreferences: {
      preload: path.join(__dirname, './preloads/loginPreload.js'),
    }
  })
  winLogin.loadFile('src/views/login.html')
  winLogin.on('closed', function () {
    winLogin = null;
  });
}

const createRegisterWindow = () => {
  winRegister = new BrowserWindow({
    width: 1100,
    height: 788,
    minWidth: 1100,
    minHeight: 786,
    webPreferences: {
      preload: path.join(__dirname, './preloads/registerPreload.js'),
    }
  })
  winRegister.loadFile('src/views/register.html')
}

const createHomeWindow = () => {
  winMain = new BrowserWindow({
    width: 1100,
    height: 788,
    minWidth: 1100,
    minHeight: 786,
    webPreferences: {
      preload: path.join(__dirname, './preloads/homePreload.js'),
    }
  })
  winMain.loadFile('src/views/home.html')
  winMain.on('closed', function () {
    winMain = null;
  });
}

const createSettingWindow = () => {
  // Verifica si la ventana ya está abierta
  if (!openWindows.setting) {
    winSetting = new BrowserWindow({
      width: 850,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, './preloads/homePreload.js'),
      }
    })
    winSetting.on('closed', () => {
      openWindows.setting = null;
    });

    winSetting.loadFile('src/views/configuraciones.html')

    // Registra la ventana abierta
    openWindows.setting = winSetting;
  } else {
    // Si la ventana ya está abierta, enfócala
    openWindows.setting.focus();
  }
}

const createPerfilWindow = () => {
  // Verifica si la ventana ya está abierta
  if (!openWindows.perfil) {
    winPerfil = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, './preloads/homePreload.js'),
      }
    })
    winPerfil.on('closed', () => {
      openWindows.perfil = null;
    });

    winPerfil.loadFile('src/views/perfil.html')

    // Registra la ventana abierta
    openWindows.perfil = winPerfil;
  } else {
    // Si la ventana ya está abierta, enfócala
    openWindows.perfil.focus();
  }
}

const createContactarWindow = () => {
  // Verifica si la ventana ya está abierta
  if (!openWindows.contactar) {
    winContactar = new BrowserWindow({
      width: 1000,
      height: 720,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, './preloads/homePreload.js'),
      }
    })
    winContactar.on('closed', () => {
      openWindows.contactar = null;
    });

    winContactar.loadFile('src/views/contactoProfesional.html')

    // Registra la ventana abierta
    openWindows.contactar = winContactar;
  } else {
    // Si la ventana ya está abierta, enfócala
    openWindows.contactar.focus();
  }
}

app.whenReady().then(() => {
  const storedData = userDataStore.get('userData', null);
  if (storedData) {
    createHomeWindow()
  } else {
    createLoginWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Create a new window when the app is activated (on macOS)
app.on('activate', function () {
  if (winMain === null && winLogin === null) {
    const storedData = userDataStore.get('userData', null);
    if (storedData) {
      createHomeWindow()
    } else {
      createLoginWindow()
    }
  }
});

// Handle the before-quit event
app.on('before-quit', function (event) {
  const storedData = userDataStore.get('userData', null);
  if (storedData) {
    const choice = dialog.showMessageBoxSync(winMain, {
      type: 'question',
      buttons: ['Cancelar', 'Confirmar'],
      defaultId: 1,
      title: 'Confirmación',
      message: '¿Estás seguro de que deseas cerrar la aplicación?'
    });
    if (choice === 0) {
      // Cancelar el cierre de la aplicación
      event.preventDefault();
    }
  }
});

ipcMain.handle('login', async (event, obj) => {
  const res = await authController.login(obj)
  if (res.success) {
    userDataStore.set('userData', res.data);
    createHomeWindow()
    winLogin.close()
    new Notification({
      title: "Desk Habitum",
      body: `Bienvenid@, ${res.data.nombre}!`,
      icon: path.join(__dirname, 'src/img/logo.png')
    }).show()
    return
  }
  new Notification({
    title: res.title,
    body: res.message,
    icon: path.join(__dirname, 'src/img/logo.png')
  }).show()
});

ipcMain.handle('getUserData', (event, obj) => {
  // Acceder a los datos almacenados
  const user = userDataStore.get('userData', null);
  const estadoMonitoreo = userDataStore.get('monitoreo');
  return {
    user: user,
    estadoMonitoreo: estadoMonitoreo
  };
});

ipcMain.handle('logout', (event, obj) => {
  // Acceder a los datos almacenados
  const storedData = userDataStore.get('userData', null);
  createLoginWindow()
  winMain.close()
  new Notification({
    title: "Sesión Finalizada",
    body: `Hasta pronto, ${storedData.nombre}!`,
    icon: path.join(__dirname, 'src/img/logo.png')
  }).show()
  userDataStore.set('userData', null);
});

ipcMain.handle('register', async (event, obj) => {
  const res = await authController.signup(obj)
  new Notification({
    title: res.title,
    body: res.message,
    icon: path.join(__dirname, 'src/img/logo.png')
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

ipcMain.handle('activateMonitoring', (event, obj) => {
  userDataStore.set('monitoreo', 'Activado');
  new Notification({
    title: "Monitoreo Iniciado",
    body: `El monitoreo ha comenzado. Si quieres detener el monitoreo, pulsa el botón en la pantalla inicial.`,
    icon: path.join(__dirname, 'src/img/logo.png')
  }).show()
});

ipcMain.handle('deactivateMonitoring', (event, obj) => {
  userDataStore.set('monitoreo', 'Desactivado');
  new Notification({
    title: "Monitoreo Desactivado",
    body: `El monitoreo ha sido desactivado correctamente.`,
    icon: path.join(__dirname, 'src/img/logo.png')
  }).show()
});

ipcMain.handle('openSetting', (event, obj) => {
  createSettingWindow();
});

ipcMain.handle('openPerfil', (event, obj) => {
  createPerfilWindow();
});

ipcMain.handle('openContactar', (event, obj) => {
  createContactarWindow();
});

ipcMain.handle('guardarCambiosSetting', (event, obj) => {
  winSetting.close()
  new Notification({
    title: "Configuración Guardada",
    body: `La configuración se ha almacenado correctamente.`,
    icon: path.join(__dirname, 'src/img/logo.png')
  }).show()

});

ipcMain.handle('enviarCorreoProfesional', (event, obj) => {
  winContactar.close()
  new Notification({
    title: "Contacto Profesional",
    body: `Correo enviado exitosamente. Espera la respuesta del profesional a través de tu correo electrónico.`,
    icon: path.join(__dirname, 'src/img/logo.png')
  }).show()

});

