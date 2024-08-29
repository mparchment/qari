import React from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext'; // Import the custom hook
import { formatTitle } from '../utils/FormatTitle';

const Sidebar = () => {
  const { audioTitle, currentReciter, currentCollectionTitle } = useAudio();

  return (
    <nav className="fixed top-0 left-0 w-64 h-full p-8 bg-red-800 text-white font-semibold shadow-lg">
      <h1 className="text-[3rem] font-bold mb-4 truncate">Qari</h1>
      <ul className="space-y-2">
        <li><Link to="/" className="block py-2 px-4 hover:bg-red-900">Home</Link></li>
        <li><Link to="/" className="block py-2 px-4 hover:bg-red-900">Your Library</Link></li>
        <li><Link to="/collections" className="block py-2 px-4 hover:bg-red-900">Collections</Link></li>
        <li><Link to="/reciters" className="block py-2 px-4 hover:bg-red-900">Reciters</Link></li>
        <li><p className="block py-2 px-4 select-none">Recently Played</p></li>
      </ul>
      {/* Audio information at the bottom of the sidebar */}
      <div className="absolute bottom-8 left-8 w-64 text-white">
        {audioTitle && (
          <div className="max-w-48">
            <h2 className="text-lg font-bold mb-2 truncate">Now Playing</h2>
            <p className="text-sm mb-1 truncate">
              {audioTitle}
            </p>
            <p className="text-sm mb-1 truncate">
              {formatTitle(currentReciter)}
            </p>
            <p className="text-sm truncate">
              {formatTitle(currentCollectionTitle)}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
