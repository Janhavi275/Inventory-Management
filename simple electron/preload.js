const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  login: (email, password, role) => ipcRenderer.invoke('login', { email, password, role }),
  navigate: (page) => ipcRenderer.send('navigate', page)
});