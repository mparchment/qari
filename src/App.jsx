import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Reciters from './pages/Reciters.jsx';
import ReciterDetail from './pages/ReciterDetail.jsx';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6"> {/* Added shadow-lg class */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reciters" element={<Reciters />} />
            <Route path="/reciters/:id" element={<ReciterDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
