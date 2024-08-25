import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reciters = () => {
  const [reciters, setReciters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReciters = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reciters'); // Replace with your backend URL
        setReciters(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reciters:', error);
        setLoading(false);
      }
    };

    fetchReciters();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  const handleReciterClick = (id) => {
    navigate(`/reciter/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Reciters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reciters.map((reciter) => (
          <div
            key={reciter.id}
            className="rounded-lg shadow-md p-4 hover:bg-gray-700 transition duration-200 cursor-pointer"
            onClick={() => handleReciterClick(reciter.id)}
          >
            <h2 className="text-xl font-semibold text-gray-100">{reciter.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reciters;
