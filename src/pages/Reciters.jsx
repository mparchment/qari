import React from 'react';
import { Link } from 'react-router-dom';

const reciters = [
  { id: 1, name: 'Mishary Rashid al-Afasi', imageUrl: 'alafasy.jpg' },
  { id: 2, name: 'Mohammed Siddiq al-Minshawi', imageUrl: 'minshawi.jpg' },
  { id: 3, name: 'Maher al-Muaiqly', imageUrl: 'muaiqly.jpg' },
  // Add more reciters as needed
];

const Reciters = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Reciters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {reciters.map((reciter) => (
          <Link
            key={reciter.id}
            to={`/reciters/${reciter.id}`}
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
              <p className="text-lg font-semibold text-gray-800 truncate">{reciter.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Reciters;
