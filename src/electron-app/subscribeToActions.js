import { ipcMain, Notification } from 'electron';

import * as actionTypes from '../common/actionTypes';

const normalizeSongName = (songName) => {
  return songName
    .split('–')
    .map((item) => item.trim());
};

const actionHadler = (_, { title: songName }) => {
  if (Notification.isSupported()) {
    const [title, subtitle] = normalizeSongName(songName);

    // TODO: add icon!
    const notification = new Notification({
      title,
      subtitle,
      silent: true,
    });

    notification.show();
  }
};

export const subscribeToActions = () => {
  ipcMain.on(actionTypes.NEXT, actionHadler);
  ipcMain.on(actionTypes.PREV, actionHadler);
};
