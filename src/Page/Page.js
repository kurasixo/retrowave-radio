import React from 'react';
import PageView from './PageView';

import { getTracks } from '../utils/tracks';

const initialState = {
  tracks: [],
  tracksMap: {},
  tracksLength: 0,
  activeTrackId: null,
};

class Page extends React.Component {
  state = initialState;

  async componentDidMount() {
    await this.getTracksAndMapToState();
  }

  getTracksAndMapToState = async () => {
    const { tracks, tracksMap, activeTrackId } = await getTracks();

    // TODO: add doAddTracks,
    this.setState((prevState) => ({
      tracks: [...prevState.tracks, ...tracks],
      tracksMap: { ...prevState.tracksMap, ...tracksMap },
      activeTrackId,
    }));
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

  onClickNext = async () => {
    const { tracks } = this.state;

    const activeTrackIndex = this.getActiveTrackIndexById();
    const nextActiveTrackIndex = this.getNextActiveTrackByIndex(activeTrackIndex);

    if (nextActiveTrackIndex === tracks.length) {
      await this.getTracksAndMapToState();
      return;
    }

    const nextActiveTrackId = this.getActiveTrackByIndex(nextActiveTrackIndex);
    this.setState({ activeTrackId: nextActiveTrackId });
  };

  onClickPrev = () => {
    const activeTrackIndex = this.getActiveTrackIndexById();
    const prevActiveTrackIndex = this.getPrevActiveTrackByIndex(activeTrackIndex);

    if (prevActiveTrackIndex === -1) {
      return;
    }

    const prevActiveTrackId = this.getActiveTrackByIndex(prevActiveTrackIndex);
    this.setState({ activeTrackId: prevActiveTrackId });
  };

  getActiveTrack = () => {
    const { tracksMap, activeTrackId } = this.state;

    const activeTrack = tracksMap[activeTrackId];
    return activeTrack;
  };

  render() {
    const { activeTrackId } = this.state;
    const activeTrack = this.getActiveTrack();

    if (activeTrackId === null && !activeTrack) {
      return null;
    }

    return (
      <PageView
        activeTrack={activeTrack}
        onClickPrev={this.onClickPrev}
        onClickNext={this.onClickNext}
      />
    );
  }
}

export default Page;
