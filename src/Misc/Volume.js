import React from 'react';
import cs from 'classnames';
import { Howler } from 'howler';

const rangeStaticProps = {
  min: '0',
  step: '1',
  max: '100',
  type: 'range',
  id: 'volume-range',
};

class Volume extends React.Component {
  state = { value: 50 };

  componentDidMount() {
    const { value } = this.state;
    Howler.volume(value / 100);
  }

  onChange = (event) => {
    Howler.volume(event.target.value / 100);
    this.setState({ value: event.target.value });
  }

  mute = () => {
    Howler.volume(0);
    this.setState({ value: 0 });
  }

  render() {
    const { value } = this.state;

    return (
      <div className="volume">
        <button
          title="Mute"
          type="button"
          id="volume-mute"
          onClick={this.mute}
          className="volume__mute"
        />

        <input
          {...rangeStaticProps}
          onChange={this.onChange}
          value={value}
          className="volume__range volume__range_min"
        />

        <div
          id="volume-level"
          className={cs('volume__level', {
            volume__level_high: value > 50,
            volume__level_mute: value === 0,
          })}
        />
      </div>
    );
  }
}

export default Volume;
