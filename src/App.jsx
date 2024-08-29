import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Reciters from './pages/Reciters.jsx';
import ReciterDetail from './pages/ReciterDetail.jsx';
import CollectionDetail from './pages/CollectionDetail.jsx'; // New component for collection detail
import Sidebar from './components/Sidebar';
import Player from './components/Player'; // Import the Player component
import { AudioProvider } from './contexts/AudioContext.jsx'; // Import the AudioProvider

function App() {
  return (
    <Router>
      <AudioProvider> {/* Wrap the app with the AudioProvider */}
        <div className="flex flex-col h-screen">
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 ml-64 py-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reciters" element={<Reciters />} />
                <Route path="/reciters/:reciterName" element={<ReciterDetail />} />
                <Route path="/reciters/:reciterName/:collectionName" element={<CollectionDetail />} /> {/* New route */}
              </Routes>
            </main>
          </div>
          <Player />
        </div>
      </AudioProvider>
    </Router>
  );
}

export default App;
