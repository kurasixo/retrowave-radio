import React from 'react';
import { Howl } from 'howler';

import { ipcRenderer } from 'electron';

import PlayerView from './PlayerView';
import * as actionTypes from '../../common/actionTypes';

class Player extends React.Component {
  state = { soundTrack: null, isPlaying: false, isLoading: false };

  componentDidMount() {
    this.activateTrack();

    ipcRenderer.on(actionTypes.NEXT, this.onNext);
    ipcRenderer.on(actionTypes.PREV, this.onPrev);
    ipcRenderer.on(actionTypes.PLAY_PAUSE, this.onPlayPause);
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
    this.setState({ soundTrack, isPlaying: true, isLoading: false });
  }

  onTrackUnload = (prevSoundTrack) => {
    prevSoundTrack.stop();
    this.setState({ isPlaying: false });
  }

  activateTrack = () => {
    const { activeTrack, onNext } = this.props;
    this.setState({ isLoading: true, isPlaying: false });

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

  onPlayPause = () => this.getOnClickPlay();

  onPrev = () => {
    const { onPrev } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return;
    }

    onPrev();
  }

  onNext = () => {
    const { onNext } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return;
    }

    onNext();
  }

  getOnClickPlay = () => {
    const { isPlaying } = this.state;

    const onClickPlay = isPlaying
      ? this.onPause
      : this.onPlay;

    return onClickPlay;
  }

  getCallbacks = () => {
    const { isLoading } = this.state;
    const { onNext, onPrev } = this.props;
    const emptyCb = () => {};

    if (isLoading) {
      return {
        onClickPrev: emptyCb,
        onClickNext: emptyCb,
        onClickPlay: emptyCb,
      };
    }

    const onClickPlay = this.getOnClickPlay();

    return {
      onClickPlay,
      onClickPrev: onPrev,
      onClickNext: onNext,
    };
  }

  render() {
    const { isPlaying } = this.state;
    const { activeTrack: { artworkUrl } } = this.props;

    const callbackProps = this.getCallbacks();

    return (
      <PlayerView
        {...callbackProps}
        isPlaying={isPlaying}
        artworkUrl={artworkUrl}
      />
    );
  }
}

export default Player;
