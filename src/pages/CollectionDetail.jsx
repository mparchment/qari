import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useAudio } from '../contexts/AudioContext';
import { formatTitle } from '../utils/FormatTitle';

const CollectionDetail = () => {
  const { reciterName, collectionName } = useParams();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { playAudio } = useAudio();

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const collectionPath = `audio/${reciterName}/${collectionName}`;
        const listRef = ref(storage, collectionPath);

        const res = await listAll(listRef);
        const audioList = await Promise.all(
          res.items.map(async (itemRef) => {
            try {
              const url = await getDownloadURL(itemRef);
              return {
                name: itemRef.name,
                url,
                title: itemRef.name.split('.')[0]
              };
            } catch (urlError) {
              console.error('Error fetching download URL:', urlError);
              return null;
            }
          })
        );

        setCollection(audioList.filter(item => item !== null));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collection details:', error);
        setError('Failed to fetch collection details.');
        setLoading(false);
      }
    };

    fetchCollectionDetails();
  }, [reciterName, collectionName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">{formatTitle(collectionName)} Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {collection.map((audio, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <p className="text-lg font-semibold text-gray-800 truncate">{audio.name}</p>
            <button
              onClick={() => playAudio(audio.url, collection, collectionName, reciterName, audio.title)} // Pass collectionName
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetail;
