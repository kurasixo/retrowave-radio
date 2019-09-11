import { globalShortcut } from 'electron';
import * as actionTypes from '../common/actionTypes';

export const registerShortcuts = (win) => {
  globalShortcut.register('F8', () => {
    win.webContents.send(actionTypes.PLAY_PAUSE);
  });

  globalShortcut.register('F7', () => {
    win.webContents.send(actionTypes.PREV);
  });

  globalShortcut.register('F9', () => {
    win.webContents.send(actionTypes.NEXT);
  });
};
