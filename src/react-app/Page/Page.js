import React from 'react';
import { ipcRenderer } from 'electron';
import throttle from 'lodash/throttle';

import PageView from './PageView';

import { getTracks, createTracksMap } from '../utils/tracks';
import * as actionTypes from '../../common/actionTypes';

const initialState = {
  tracks: [],
  tracksMap: {},
  activeTrackId: null,
};

const doAddTracks = (tracks, prevTracks) => {
  let newTracks = [...prevTracks, ...tracks];

  if (newTracks.length > 200) {
    newTracks = newTracks.slice(200);
  }

  const tracksMap = createTracksMap(newTracks);
  return { tracks: newTracks, tracksMap };
};

class Page extends React.Component {
  state = initialState;

  async componentDidMount() {
    await this.getTracksAndMapToState(this.setLoadingFalse);
    this.sendNextNotification();
  }

  getTracksAndMapToState = async (setStateCallback = () => {}) => {
    const { tracks, activeTrackId } = await getTracks();

    this.setState(({ tracks: prevTracks }) => {
      return { ...doAddTracks(tracks, prevTracks), activeTrackId };
    }, setStateCallback);
  }

  getActiveTrackIndexById = () => {
    const { tracks, activeTrackId } = this.state;

    const activeTrackIndex = tracks.findIndex(({ id }) => id === activeTrackId);
    return activeTrackIndex;
  };

  getActiveTrackByIndex = (activeTrackIndex) => {
    const { tracks } = this.state;
    return tracks[activeTrackIndex].id;
  }

  getNextActiveTrackByIndex = (activeTrackIndex) => activeTrackIndex + 1;

  getPrevActiveTrackByIndex = (activeTrackIndex) => activeTrackIndex - 1;

  sendNextNotification = () => {
    ipcRenderer.send(actionTypes.NEXT, this.getActiveTrack());
  }

  sendPrevNotification = () => {
    ipcRenderer.send(actionTypes.PREV, this.getActiveTrack());
  }

  onNext = async () => {
    const { tracks } = this.state;

    const activeTrackIndex = this.getActiveTrackIndexById();
    const nextActiveTrackIndex = this.getNextActiveTrackByIndex(activeTrackIndex);

    if (nextActiveTrackIndex === tracks.length) {
      await this.getTracksAndMapToState(this.sendNextNotification);
      return;
    }

    const nextActiveTrackId = this.getActiveTrackByIndex(nextActiveTrackIndex);
    this.setState({ activeTrackId: nextActiveTrackId }, this.sendNextNotification);
  };

  onPrev = () => {
    const activeTrackIndex = this.getActiveTrackIndexById();
    const prevActiveTrackIndex = this.getPrevActiveTrackByIndex(activeTrackIndex);

    if (prevActiveTrackIndex === -1) {
      return;
    }

    const prevActiveTrackId = this.getActiveTrackByIndex(prevActiveTrackIndex);
    this.setState({ activeTrackId: prevActiveTrackId }, this.sendPrevNotification);
  };

  getActiveTrack = () => {
    const { tracksMap, activeTrackId } = this.state;

    const activeTrack = tracksMap[activeTrackId];
    return activeTrack;
  };

  throttledOnNext = throttle(this.onNext, 400);

  throttledOnPrev = throttle(this.onPrev, 400);

  render() {
    const { activeTrackId } = this.state;
    const activeTrack = this.getActiveTrack();

    if (activeTrackId === null && !activeTrack) {
      return null;
    }

    return (
      <PageView
        activeTrack={activeTrack}
        onPrev={this.throttledOnPrev}
        onNext={this.throttledOnNext}
      />
    );
  }
}

export default Page;
