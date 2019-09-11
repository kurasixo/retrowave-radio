import React from 'react';
import cs from 'classnames';

const PlayerView = ({
  isPlaying,
  artworkUrl,
  onClickPrev,
  onClickNext,
  onClickPlay,
}) => (
  <div
    id="player"
    className={cs('player player_cassette', { player_paused: !isPlaying })}
  >
    <i className="cassette">
      <i
        id="player-cover"
        className="cassette__cover"
        style={{ backgroundImage: `url(${artworkUrl})` }}
      />

      <i
        className="cassette__reel cassette__reel_left"
        style={{ boxShadow: '0 0 0 40px', animationDuration: '3s' }}
      />

      <i
        className="cassette__reel cassette__reel_right"
        style={{ boxShadow: '0 0 0 0', animationDuration: '1.5s' }}
      />

      <i className="cassette__body" />
    </i>

    <div className="player__controls">
      <button
        type="button"
        id="player-prev"
        onClick={onClickPrev}
        className="player__controls__button player__controls__button_prev"
      />

      <button
        type="button"
        id="player-play"
        onClick={onClickPlay}
        className={cs('player__controls__button player__controls__button_play', {
          player__controls__button_pause: isPlaying,
        })}
      />

      <button
        type="button"
        id="player-next"
        onClick={onClickNext}
        className="player__controls__button player__controls__button_next"
      />
    </div>
  </div>
);

export default PlayerView;
