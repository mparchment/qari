import React from 'react';
import { useParams } from 'react-router-dom';

const reciters = [
  { id: 1, name: 'Mishary Rashid al-Afasi', imageUrl: 'alafasy.jpg', bio: 'Bio of Mishary Rashid al-Afasi' },
  { id: 2, name: 'Mohammed Siddiq al-Minshawi', imageUrl: 'minshawi.jpg', bio: 'Bio of Mohammed Siddiq al-Minshawi' },
  { id: 3, name: 'Maher al-Muaiqly', imageUrl: 'muaiqly.jpg', bio: 'Bio of Maher al-Muaiqly' },
  // Add more reciters as needed
];

const ReciterDetail = () => {
  const { id } = useParams();
  const reciter = reciters.find(r => r.id === parseInt(id, 10));

  if (!reciter) {
    return <div>Reciter not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">{reciter.name}</h1>
      <div className="flex">
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
    </div>
  );
};

export default ReciterDetail;