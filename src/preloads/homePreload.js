const { contextBridge, ipcRenderer } = require('electron')

const getUserData = () => {
  let respuesta = ipcRenderer.invoke('getUserData');
  return respuesta
}

contextBridge.exposeInMainWorld('api', {
  userData: getUserData,
})

