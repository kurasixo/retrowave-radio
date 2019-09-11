import React from 'react';
import { Howl, Howler } from 'howler';
import throttle from 'lodash/throttle';
import { ipcRenderer } from 'electron';
import PlayerView from './PlayerView';

class Player extends React.Component {
  state = { soundTrack: null, isPlaying: false };

  componentDidMount() {
    this.activateTrack();
    const { onClickPrev, onClickNext } = this.props;

    ipcRenderer.on('TYPES/NEXT', throttle(onClickNext, 400));
    ipcRenderer.on('TYPES/PREV', throttle(onClickPrev, 400));

    ipcRenderer.on('TYPES/PLAY_PAUSE', () => {
      const onClickPlay = this.getOnClickPlay();
      onClickPlay();
    });
  }

  componentDidUpdate(
    { activeTrack: prevActiveTrack },
    { soundTrack: prevSoundTrack },
  ) {
    const { soundTrack } = this.state;
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
    const { activeTrack, onClickNext } = this.props;

    const soundTrack = new Howl({
      preload: true,
      onend: onClickNext,
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
    const { activeTrack: { artworkUrl }, onClickPrev, onClickNext } = this.props;

    // TODO: isInitialized -> true. spinner + blur + disable
    const onClickPlay = this.getOnClickPlay();

    return (
      <PlayerView
        isPlaying={isPlaying}
        artworkUrl={artworkUrl}
        onClickPlay={onClickPlay}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
    );
  }
}

export default Player;
