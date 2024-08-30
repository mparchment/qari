import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Reciters from './pages/Reciters.jsx';
import ReciterDetail from './pages/ReciterDetail.jsx';
import CollectionDetail from './pages/CollectionDetail.jsx';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import { AudioProvider } from './contexts/AudioContext.jsx';
import { Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <AudioProvider>
        <div className="flex flex-col h-screen">
          {/* Mobile Header */}
          <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-100 flex items-center justify-between px-4 z-20">
            <h1 className="text-2xl font-bold">Qari</h1>
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
          </header>

          <div className="flex flex-1 pt-16 md:pt-0">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-1 md:ml-52 py-10 px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reciters" element={<Reciters />} />
                <Route path="/reciters/:reciterName" element={<ReciterDetail />} />
                <Route path="/reciters/:reciterName/:collectionName" element={<CollectionDetail />} />
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