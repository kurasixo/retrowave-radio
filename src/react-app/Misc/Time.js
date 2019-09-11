import React from 'react';
import { Howler } from 'howler';

const TICK_TIME = 200;

const processSeconds = (seconds) => {
  if (seconds.toString().length === 1) {
    if (seconds < 10) {
      return `0${seconds}`;
    }

    return `${seconds}0`;
  }

  return seconds;
};

const millesecondsToMinutes = (seconds) => {
  const visualMinutes = Math.floor(seconds / 60);
  const visualSeconds = processSeconds(seconds % 60);

  return `${visualMinutes}:${visualSeconds}`;
};

class Time extends React.Component {
  tickCountingInterval = null;

  state = { currentTime: millesecondsToMinutes(0) };

  componentDidMount() {
    this.startTickCounting();
  }

  startTickCounting = () => {
    const { duration } = this.props;

    let currentTick = 0;
    let prevSoundId = null;
    let prevIsPlaying = true;

    this.tickCountingInterval = setInterval(() => {
      const currentSound = Howler._howls[0];
      const isPlaying = currentSound.playing();

      const tickInSeconds = currentTick / 1000;
      if (
        prevIsPlaying !== isPlaying &&
        prevSoundId !== currentSound._src
      ) {
        currentTick = 0;

        if (isPlaying === false) {
          this.setState({ currentTime: millesecondsToMinutes(0) });
        }
      }

      if (isPlaying) {
        currentTick += TICK_TIME;

        if (currentTick < duration && Number.isInteger(tickInSeconds)) {
          prevIsPlaying = isPlaying;
          prevSoundId = currentSound._src;
          this.setState({ currentTime: millesecondsToMinutes(tickInSeconds) });
        }
      }
    }, TICK_TIME);
  };

  render() {
    const { duration } = this.props;
    const { currentTime } = this.state;

    return (
      <div className="display__time">
        <span
          id="display-time-elapsed"
          className="display__time__elapsed"
        >
          {currentTime}
        </span>
        <span className="display__time__total">
          /&nbsp;
          <span id="display-time-total">
            {millesecondsToMinutes(duration / 1000)}
          </span>
        </span>
      </div>
    );
  }
}

export default Time;
