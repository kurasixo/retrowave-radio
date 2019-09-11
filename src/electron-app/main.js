import 'babel-polyfill';
import path from 'path';
import { app, BrowserWindow } from 'electron';

import { registerShortcuts } from './registerShortcuts';
import { subscribeToActions } from './subscribeToActions';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, '/assets/icon.png'),
  });

  subscribeToActions();
  registerShortcuts(win);

  win.maximize();
  win.webContents.loadFile(path.join(__dirname, 'index.html'));
};

app.on('ready', createWindow);
