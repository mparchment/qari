import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReciterDetails = () => {
  const { id } = useParams();
  const [reciter, setReciter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCollections, setOpenCollections] = useState({});

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
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  if (!reciter) {
    return <div className="text-center text-gray-300">Reciter not found</div>;
  }

  const toggleCollection = (collectionName) => {
    setOpenCollections(prev => ({
      ...prev,
      [collectionName]: !prev[collectionName]
    }));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-100 pt-12 mb-8">{reciter.name}</h1>
      <p className="text-gray-400 mb-6">{reciter.bio}</p>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Collections</h2>
      {reciter.collections.map((collection, index) => (
        <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4">
          <button
            className="w-full text-left p-4 flex justify-between items-center text-gray-100 hover:bg-gray-700 transition duration-200"
            onClick={() => toggleCollection(collection.name)}
          >
            <span className="text-xl font-semibold">{collection.name.toUpperCase()}</span>
            <span>{openCollections[collection.name] ? '▲' : '▼'}</span>
          </button>
          {openCollections[collection.name] && (
            <ul className="bg-gray-700 p-4">
              {collection.audio_files.map((audio, audioIndex) => (
                <li key={audioIndex} className="text-gray-300 py-2 hover:text-gray-100">
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