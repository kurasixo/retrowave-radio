import React from 'react';
import Player from '../Player/Player';

import * as Misc from '../Misc';

const PageView = ({
  onClickNext,
  onClickPrev,
  activeTrack,
}) => (
  <div
    id="theme"
    className="theme theme_palms"
  >
    <i
      id="theme-overlay"
      className="theme__overlay"
      style={{ backgroundImage: `url(${activeTrack.artworkUrl})` }}
    />

    <div className="theme__container">
      <h1 className="theme__logo">
          Retrowave Radio
      </h1>

      <Player
        activeTrack={activeTrack}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />

      <div className="display">
        <h2
          id="display-title"
          className="display__title"
        >
          {activeTrack.title}
        </h2>

        <Misc.Time duration={activeTrack.duration} />
        <Misc.Volume />
      </div>
    </div>
  </div>
);

export default PageView;
