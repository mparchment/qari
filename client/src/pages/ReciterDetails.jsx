import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';

const ReciterDetails = () => {
  const { id } = useParams();
  const [reciter, setReciter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCollections, setOpenCollections] = useState({});
  const { handleAudioChange } = useAudio(); // Use the audio context

  useEffect(() => {
    const fetchReciterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/reciters/${id}`);
        setReciter(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reciter details:', error);
        setLoading(false);
      }
    };

    fetchReciterDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!reciter) {
    return <div className="text-center">Reciter not found</div>;
  }

  

  const toggleCollection = (collectionName) => {
    setOpenCollections(prev => ({
      ...prev,
      [collectionName]: !prev[collectionName]
    }));
  };

  const handleAudioClick = (audioUrl) => {
    handleAudioChange(audioUrl);  // Use the full URL directly
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold pt-12 mb-8">{reciter.name}</h1>
      <p className="mb-6">{reciter.bio}</p>
      <h2 className="text-2xl font-bold mb-6">Collections</h2>
      {reciter.collections.map((collection, index) => (
        <div key={index} className="rounded-lg shadow-md overflow-hidden mb-4">
          <button
            className="w-full text-left p-4 flex justify-between items-center transition duration-200"
            onClick={() => toggleCollection(collection.name)}
          >
            <span className="text-xl font-semibold">{collection.name}</span>
            <span>{openCollections[collection.name] ? '▲' : '▼'}</span>
          </button>
          {openCollections[collection.name] && (
            <ul className="p-4">
              {collection.audio_files.map((audio, audioIndex) => (
                <li 
                  key={audioIndex} 
                  className="py-2 cursor-pointer hover:text-blue-500"
                  onClick={() => handleAudioClick(audio.file_path)}  // Pass the file_path directly
                >
                  {audio.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReciterDetails;