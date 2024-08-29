import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import biographies from '../biographies.json'; // Adjust the path as necessary
import { ChevronRight } from 'lucide-react'; // Import the chevron icon
import { formatTitle } from '../utils/FormatTitle';

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
          imageUrl: `/qari/${folderRef.name}.jpg`, 
        }));

        setReciter({
          name: formatReciterName(reciterName),
          imageUrl: `/qari/${reciterName}.jpg`,
          bio: biographies[reciterName], 
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
    <div>
      <div className="flex">
        <div className="w-1/6 pr-8 pb-8">
          <img
            src={reciter.imageUrl}
            alt={reciter.name}
            className="w-auto h-auto object-cover rounded-md shadow-md"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{reciter.name}</h1>
          <p className="text-lg max-w-screen-lg">{reciter.bio}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Collections</h2>
      <div className="max-w-64 rounded-lg overflow-hidden">
        <ul>
          {collections.map((collection, index) => (
            <li
              key={collection.id}
              className={`${index !== 0 ? 'border-t border-gray-200' : ''}`}
            >
              <Link
                to={`/reciters/${reciterName}/${collection.name}`}
                className="flex items-center py-3 group"
              >
                <ChevronRight
                  size={20}
                  className="text-gray-400 mr-2 transition-colors group-hover:text-red-900"
                />
                <span className="text-lg text-gray-800 font-medium transition-colors group-hover:text-red-900">
                  {formatTitle(collection.name)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReciterDetail;
