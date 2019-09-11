import React from 'react';
import { Howl, Howler } from 'howler';

import { ipcRenderer } from 'electron';

import PlayerView from './PlayerView';
import * as actionTypes from '../../common/actionTypes';

class Player extends React.Component {
  state = { soundTrack: null, isPlaying: false };

  componentDidMount() {
    this.activateTrack();
    const { onPrev, onNext } = this.props;

    ipcRenderer.on(actionTypes.NEXT, onNext);
    ipcRenderer.on(actionTypes.PREV, onPrev);

    ipcRenderer.on(actionTypes.PLAY_PAUSE, () => {
      const onClickPlay = this.getOnClickPlay();
      onClickPlay();
    });
  }

  componentDidUpdate(
    { activeTrack: prevActiveTrack },
    { soundTrack: prevSoundTrack },
  ) {
    const { activeTrack } = this.props;

    if (prevActiveTrack.id !== activeTrack.id) {
      if (prevSoundTrack) {
        this.onTrackUnload(prevSoundTrack);
      }

      this.activateTrack();
    }
  }

  onTrackLoad = (soundTrack) => {
    soundTrack.play();
    this.setState({ soundTrack, isPlaying: true });
  }

  onTrackUnload = () => {
    // TODO: refactor hatch
    Howler.unload();
    this.setState({ isPlaying: false });
  }

  activateTrack = () => {
    const { activeTrack, onNext } = this.props;

    const soundTrack = new Howl({
      preload: true,
      onend: onNext,
      src: activeTrack.streamUrl,
      onload: () => this.onTrackLoad(soundTrack),
    });
  }

  onPlay = () => {
    const { soundTrack } = this.state;

    if (soundTrack) {
      soundTrack.play();
      this.setState({ isPlaying: true });
    }
  };

  onPause = () => {
    const { soundTrack } = this.state;

    if (soundTrack) {
      soundTrack.pause();
      this.setState({ isPlaying: false });
    }
  };

  getOnClickPlay = () => {
    const { isPlaying } = this.state;

    const onClickPlay = isPlaying
      ? this.onPause
      : this.onPlay;

    return onClickPlay;
  }

  render() {
    const { isPlaying } = this.state;
    const { activeTrack: { artworkUrl }, onPrev, onNext } = this.props;

    // TODO: isInitialized -> true. spinner + blur + disable
    const onClickPlay = this.getOnClickPlay();

    return (
      <PlayerView
        onClickPrev={onPrev}
        onClickNext={onNext}
        isPlaying={isPlaying}
        artworkUrl={artworkUrl}
        onClickPlay={onClickPlay}
      />
    );
  }
}

export default Player;
