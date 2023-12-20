const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  userData: () => ipcRenderer.invoke('getUserData'),
  logout: () => ipcRenderer.invoke('logout'),
})
