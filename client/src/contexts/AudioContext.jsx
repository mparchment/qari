// AudioContext.js
import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioSrc, setAudioSrc] = useState("http://example.com/audio.mp3");
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleAudioChange = (newSrc) => {
    setAudioSrc(newSrc);
    setIsPlaying(true);
  };

  return (
    <AudioContext.Provider value={{ audioSrc, isPlaying, handlePlay, handlePause, handleAudioChange }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);