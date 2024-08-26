// AudioPlayerComponent.js
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useAudio } from '../contexts/AudioContext';

const customStyles = `
  .rhap_container {
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
`;

const AudioPlayerComponent = () => {
  const { audioSrc, isPlaying, handlePlay, handlePause } = useAudio();

  return (
    <div className="fixed bottom-0 w-full p-4 bg-white h-[12%] flex border-t border-black items-center justify-center">
      <div className="w-full max-w-lg">
        <style>{customStyles}</style>
        <AudioPlayer
          autoPlay={isPlaying}
          src={audioSrc}
          onPlay={handlePlay}
          onPause={handlePause}
          // other props here
        />
      </div>
    </div>
  );
};

export default AudioPlayerComponent;