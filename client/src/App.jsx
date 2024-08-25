import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Reciters from './pages/Reciters.jsx';
import ReciterDetails from './pages/ReciterDetails.jsx';

function App() {
  return (
    <div className="flex flex-col h-screen text-white">
      <Router>
        <div className="flex flex-grow">
          <div className="w-[10%] bg-black opacity-80 p-4 flex flex-col space-y-6">
            {/* Sidebar content here */}
            <div className="text-5xl font-bold mb-4">Qari</div>
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-lg font-bold hover:underline">Home</a>
              <a href="/search" className="text-lg font-bold hover:underline">Search</a>
              <a href="/search" className="text-lg font-bold hover:underline">Your Library</a>
            </div>
            <div className="text-lg">Recently Played</div>
            <div className="flex flex-col space-y-4">
              <a href="/collections" className="text-lg font-bold hover:underline">Collections</a>
              <a href="/reciters" className="text-lg font-bold hover:underline">Reciters</a>
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
        <div className="fixed bottom-0 w-full p-4 h-[10%] bg-black flex items-center justify-center">
          Player
        </div>
      </Router>
    </div>
  );
}

export default App;
