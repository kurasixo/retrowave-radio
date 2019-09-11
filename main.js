const path = require('path');
// eslint-disable-next-line
const { app, BrowserWindow, globalShortcut } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, '/assets/icon.png'),
  });

  globalShortcut.register('Fn+F8', () => {
    win.webContents.send('TYPES/PLAY_PAUSE', null);
  });

  globalShortcut.register('Fn+F7', () => {
    win.webContents.send('TYPES/PREV', null);
  });

  globalShortcut.register('Fn+F9', () => {
    win.webContents.send('TYPES/NEXT', null);
  });

  win.maximize();
  win.webContents.loadFile(path.join(__dirname, '/build/index.html'));
};

app.on('ready', createWindow);
