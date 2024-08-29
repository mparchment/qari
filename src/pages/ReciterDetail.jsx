import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import { useAudio } from '../contexts/AudioContext'; // Import the custom hook

const ReciterDetail = () => {
  const { reciterName } = useParams();
  const [reciter, setReciter] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReciterDetails = async () => {
      try {
        const reciterPath = `audio/${reciterName}`;
        const listRef = ref(storage, reciterPath);

        const res = await listAll(listRef);
        const collectionList = res.prefixes.map((folderRef, index) => ({
          id: index + 1,
          name: folderRef.name,
          imageUrl: `${folderRef.name.toLowerCase()}.jpg`, // Placeholder for image URL
        }));

        setReciter({
          name: formatReciterName(reciterName),
          imageUrl: 'reciter-placeholder.jpg',
          bio: 'Reciter bio placeholder',
        });

        setCollections(collectionList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reciter details:', error);
        setError('Failed to fetch reciter details.');
        setLoading(false);
      }
    };

    fetchReciterDetails();
  }, [reciterName]);

  const formatReciterName = (name) => {
    if (!name) return '';
    const parts = name.split('-');
    return parts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!reciter) {
    return <div>Reciter not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">{reciter.name}</h1>
      <div className="flex mb-8">
        <div className="w-1/4 pr-4">
          <img
            src={reciter.imageUrl}
            alt={reciter.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div className="w-3/4 pl-4">
          <p className="text-lg">{reciter.bio}</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Collections</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={`/reciters/${reciterName}/${collection.name}`}
            className="relative bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={collection.imageUrl}
                alt={collection.name}
                className="w-full h-64 object-cover transition-opacity duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-20"></div>
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800 truncate">{collection.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReciterDetail;
