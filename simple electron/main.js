const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://127.0.0.1:27017/electronApp';
const DB_NAME = 'electronApp';
const COLLECTION_NAME = 'users';

let dbClient;

async function connectToDB() {
  dbClient = new MongoClient(MONGO_URI);
  await dbClient.connect();
  console.log('Connected to MongoDB');
}

let mainWindow;

function createWindow(file = 'index.html') {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 350,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile(file);
}

app.whenReady().then(async () => {
  try {
    await connectToDB();
    createWindow();

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    app.quit();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    if (dbClient) dbClient.close();
    app.quit();
  }
});

// Handle login requests from renderer
ipcMain.handle('login', async (event, { email, password, role }) => {
  try {
    const db = dbClient.db(DB_NAME);
    const users = db.collection(COLLECTION_NAME);

    // Find user by email and role
    const user = await users.findOne({ email: email, role: role });

    if (!user) {
      return { success: false, message: 'User  not found or role mismatch.' };
    }

    // For simplicity, plaintext password check (replace with hashed in prod)
    if (user.password === password) {
      return { success: true, message: 'Login successful!' };
    } else {
      return { success: false, message: 'Incorrect password.' };
    }
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, message: 'Internal error during login.' };
  }
});

// Handle navigation requests from renderer
ipcMain.on('navigate', (event, page) => {
  if (page === 'admin-login') {
    mainWindow.loadFile('admin.html');
  } else if (page === 'employee-login') {
    mainWindow.loadFile('employee.html');
  } else if (page === 'index') {
    mainWindow.loadFile('index.html');
  }
});