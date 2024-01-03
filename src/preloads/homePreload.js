const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  userData: () => ipcRenderer.invoke('getUserData'),
  logout: () => ipcRenderer.invoke('logout'),
  activateMonitoring: () => ipcRenderer.invoke('activateMonitoring'),
  deactivateMonitoring: () => ipcRenderer.invoke('deactivateMonitoring'),
})
