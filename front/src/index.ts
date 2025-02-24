import { app, BrowserWindow, dialog, ipcMain, session } from 'electron';
import Store from 'electron-store';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

interface StoreSchema {
  token: string;
}

const store: any = new Store<StoreSchema>();

store.set('baseUrl', 'http://localhost:8090');

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    webPreferences: {
      webSecurity: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      additionalArguments: [
        '--disable-web-security'
      ],
      contextIsolation: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  session.defaultSession.protocol.registerFileProtocol('static', (request, callback) => {
    const fileUrl = request.url.replace('static://', '');
    const filePath = path.join(app.getAppPath(), '.webpack/renderer', fileUrl);
    callback(filePath);
  });

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('getStoreValue', async (event, key) => {
  return store.get(key);
});

ipcMain.handle('setStoreValue', async (event, key, value) => {
  store.set(key, value);
});

ipcMain.handle('save-pdf', async (event, pdfUrl: string) => {
  try {
    const result = await dialog.showSaveDialog({
      title: 'Salvar PDF',
      defaultPath: "documento.pdf",
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });

    if (!result.canceled && result.filePath) {
      const savePath = result.filePath;
      await downloadFile(pdfUrl, savePath);
    }
  } catch (error) {
    console.error('Erro ao baixar ou salvar o PDF:', error);
  }
});

export async function downloadFile(fileUrl: string, savePath: string) {
  try {
    const token = await store.get('token');
    const response = await axios.get(fileUrl, { responseType: "arraybuffer", headers: { Authorization: `Bearer ${token}` } });
    fs.writeFileSync(savePath, response.data);
  } catch (error) {
    console.error('Erro ao baixar o PDF:', error);
    throw error;
  }
}