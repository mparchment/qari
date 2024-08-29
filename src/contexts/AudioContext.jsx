import React, { createContext, useState, useContext } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentCollection, setCurrentCollection] = useState([]);
  const [currentCollectionTitle, setCurrentCollectionTitle] = useState(''); // New state for collection title
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [audioTitle, setAudioTitle] = useState(null);
  const [currentReciter, setCurrentReciter] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const playAudio = async (audioPath, collection, collectionTitle, reciter, title) => {
    try {
      const audioRef = ref(storage, audioPath);
      const url = await getDownloadURL(audioRef);
  
      setCurrentAudio(url);
      setCurrentCollection(collection);
      setCurrentCollectionTitle(collectionTitle); // Set collection title
      setCurrentReciter(reciter);
      setCurrentIndex(collection.findIndex(item => item.url === url));
      setAudioTitle(title);
  
      setRecentlyPlayed(prev => [
        { audio: audioPath, collection, reciter, title },
        ...prev.slice(0, 9),
      ]);
    } catch (error) {
      console.error('Error fetching or playing audio:', error);
    }
  };

  const skipToNext = () => {
    if (currentCollection.length === 0 || currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % currentCollection.length;
    const nextAudio = currentCollection[nextIndex];

    playAudio(nextAudio.url, currentCollection, currentCollectionTitle, currentReciter, nextAudio.title);
    setCurrentIndex(nextIndex);
  };

  const skipToPrevious = () => {
    if (currentCollection.length === 0 || currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + currentCollection.length) % currentCollection.length;
    const prevAudio = currentCollection[prevIndex];

    playAudio(prevAudio.url, currentCollection, currentCollectionTitle, currentReciter, prevAudio.title);
    setCurrentIndex(prevIndex);
  };

  const stopAudio = () => {
    setCurrentAudio(null);
    setCurrentCollection([]);
    setCurrentCollectionTitle(''); // Clear collection title
    setCurrentReciter(null);
    setCurrentIndex(-1);
    setAudioTitle(null);
  };

  return (
    <AudioContext.Provider
      value={{
        currentAudio,
        currentCollection,
        currentCollectionTitle, // Provide collection title
        currentReciter,
        currentIndex,
        audioTitle,
        recentlyPlayed,
        playAudio,
        stopAudio,
        skipToNext,
        skipToPrevious
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
