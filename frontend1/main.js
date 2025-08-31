// frontend/main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // If running React dev server
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, "index.html")}`;

  if (startUrl.startsWith("http")) {
    mainWindow.loadURL(startUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, "index.html"));  // ✅ fixed path
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => { 
  if (process.platform !== "darwin") app.quit(); 
});
app.on("activate", () => { 
  if (BrowserWindow.getAllWindows().length === 0) createWindow(); 
});
