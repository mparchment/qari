import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; // Import styles

import { useAudio } from '../contexts/AudioContext'; // Import the custom hook

const Player = () => {
  const {
    currentAudio,
    skipToNext,
    skipToPrevious
  } = useAudio();

  return (
    <div className={`player-container ${currentAudio ? 'visible' : ''}`}>
      {currentAudio && (
        <div className="player-content">
          <AudioPlayer
            autoPlay
            src={currentAudio}
            onPlay={e => console.log("onPlay")}
            showSkipControls={true}
            showFilledProgress={true}
            onClickNext={skipToNext} // Attach skip to next function
            onClickPrevious={skipToPrevious} // Attach skip to previous function
          />
        </div>
      )}
    </div>
  );
};

export default Player;
