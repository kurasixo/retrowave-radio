import React from 'react';
import Player from '../Player/Player';

import * as Misc from '../Misc';

const PageView = ({
  onNext,
  onPrev,
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
        onPrev={onPrev}
        onNext={onNext}
        activeTrack={activeTrack}
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
