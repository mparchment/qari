import React from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';
import { formatTitle } from '../utils/FormatTitle';
import { Home, Library, FolderOpen, User, Clock } from 'lucide-react';

const Sidebar = () => {
  const { audioTitle, currentReciter, currentCollectionTitle } = useAudio();

  const menuItems = [
    { icon: Home, text: 'Home', link: '/' },
    { icon: Library, text: 'Your Library', link: '/' },
    { icon: FolderOpen, text: 'Collections', link: '/collections' },
    { icon: User, text: 'Reciters', link: '/reciters' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-52 h-full p-6 bg-gray-100 text-gray-800 font-medium border border-gray-200">
      <h1 className="text-[2.5rem] font-bold mb-4 truncate">Qari</h1>
      <ul className="space-y-2 text-sm">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.link} className="flex items-center py-2 hover:bg-gray-200">
              <item.icon className="w-5 h-5 mr-3" color="#800020" />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
        <li>
          <p className="flex items-center py-2">
            <Clock className="w-5 h-5 mr-3" color="#800020" />
            <span className="whitespace-nowrap select-none">Recently Played</span>
          </p>
        </li>
      </ul>
      <div className="absolute bottom-6 left-6 w-64">
        {audioTitle && (
          <div className="max-w-48">
            <h2 className="text-lg font-bold mb-2 truncate text-red-900">Now Playing</h2>
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