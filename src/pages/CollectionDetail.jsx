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
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">{formatTitle(reciterName)} — {formatTitle(collectionName)}</h1>
      <div className="bg-white rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collection.map((audio, index) => (
            <div
              key={index}
              className="p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => playAudio(audio.url, collection, collectionName, reciterName, audio.title)}
            >
              <p className="text-lg font-semibold text-gray-800 truncate">{audio.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
