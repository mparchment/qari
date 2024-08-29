import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import { formatTitle } from '../utils/FormatTitle';

const formatUrlName = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-'); // Format for URL
};

const Reciters = () => {
  const [reciters, setReciters] = useState([]);

  useEffect(() => {
    const fetchReciters = async () => {
      try {
        const listRef = ref(storage, 'audio/');
        const res = await listAll(listRef);

        const reciterList = res.prefixes.map((folderRef) => ({
          name: formatTitle(folderRef.name),
          imageUrl: `/qari/${folderRef.name}.jpg`, // Placeholder for image URL
        }));

        setReciters(reciterList);
      } catch (error) {
        console.error('Error fetching reciters:', error);
      }
    };

    fetchReciters();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Reciters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {reciters.map((reciter, index) => (
          <Link
            key={index}
            to={`/reciters/${formatUrlName(reciter.name)}`} // Format name to match URL structure
            className="relative bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={reciter.imageUrl}
                alt={reciter.name}
                className="w-full h-64 object-cover transition-opacity duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-20"></div>
            </div>
            <div className="p-4">
              <p className="text-md font-semibold text-gray-800 truncate">{reciter.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Reciters;
