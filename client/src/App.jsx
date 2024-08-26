// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Reciters from './pages/Reciters.jsx';
import ReciterDetails from './pages/ReciterDetails.jsx';
import AudioPlayerComponent from './components/AudioPlayerComponent';
import { AudioProvider } from './contexts/AudioContext.jsx';

function App() {
  return (
    <AudioProvider>
      <div className="flex flex-col h-screen">
        <Router>
          <div className="flex flex-grow pb-[5%]">
            <div className="w-[10%] opacity-80 p-8 flex flex-col space-y-6">
              {/* Sidebar content here */}
              <div className="text-5xl font-bold mb-4 text-blue-600"><Link to="/">Qari</Link></div>
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-lg font-bold hover:underline">Home</Link>
                <Link to="/search" className="text-lg font-bold hover:underline">Search</Link>
                <Link to="/search" className="text-lg font-bold hover:underline">Your Library</Link>
              </div>
              <div className="text-lg">Recently Played</div>
              <div className="flex flex-col space-y-4">
                <Link to="/collections" className="text-lg font-bold hover:underline">Collections</Link>
                <Link to="/reciters" className="text-lg font-bold hover:underline">Reciters</Link>
              </div>
            </div>
            <div className="flex-grow p-4 overflow-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reciters" element={<Reciters />} />
                <Route path="/reciter/:id" element={<ReciterDetails />} />
              </Routes>
            </div>
          </div>
        </Router>
        <AudioPlayerComponent />
      </div>
    </AudioProvider>
  );
}

export default App;