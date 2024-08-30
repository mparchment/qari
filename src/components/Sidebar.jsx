import React from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';
import { formatTitle } from '../utils/FormatTitle';
import { Home, Library, FolderOpen, User, Clock, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { audioTitle, currentReciter, currentCollectionTitle } = useAudio();

  const menuItems = [
    { icon: Home, text: 'Home', link: '/' },
    { icon: Library, text: 'Your Library', link: '/' },
    { icon: FolderOpen, text: 'Collections', link: '/collections' },
    { icon: User, text: 'Reciters', link: '/reciters' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998] md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <nav className={`fixed top-0 right-0 w-64 h-full p-6 bg-gray-100 text-gray-800 font-medium border-l border-gray-200 transform transition-transform duration-200 ease-in-out z-[999] ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:left-0 md:w-52 md:border-r md:border-l-0 md:z-40`}>
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h1 className="text-[2.5rem] font-bold mb-4 truncate">Qari</h1>
        <ul className="space-y-2 text-sm">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className="flex items-center py-2 hover:bg-gray-200" onClick={onClose}>
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
        <div className="absolute bottom-6 left-6 right-6">
          {audioTitle && (
            <div className="max-w-full">
              <h2 className="text-lg font-bold mb-2 truncate text-red-900">Now Playing</h2>
              <p className="text-sm mb-1 truncate">{audioTitle}</p>
              <p className="text-sm mb-1 truncate">{formatTitle(currentReciter)}</p>
              <p className="text-sm truncate">{formatTitle(currentCollectionTitle)}</p>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;