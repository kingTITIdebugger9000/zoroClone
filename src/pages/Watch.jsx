import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Watch = () => {
  const { animeName } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://api.consumet.org/anime/gogoanime/info/${animeName}`);
        if (!res.ok) throw new Error('Anime not found');
        const data = await res.json();
        setAnime(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [animeName]);

  if (loading) return <div className="text-center py-20 text-white text-2xl">Loading anime...</div>;
  if (error) return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <img src={anime.image} alt={anime.title} className="w-64 rounded-lg shadow-xl" />
        <div>
          <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
          <p className="text-gray-300 mb-6">{anime.description || 'No description available.'}</p>
          <div className="flex gap-4 text-sm">
            <span>Status: {anime.status}</span>
            <span>Type: {anime.type}</span>
            <span>Episodes: {anime.totalEpisodes}</span>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-6">Episodes</h2>
      <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-12 gap-3">
        {anime.episodes?.map((ep) => (
          <div 
            key={ep.number} 
            className="bg-gray-800 hover:bg-blue-600 text-center py-3 rounded cursor-pointer transition-colors"
          >
            {ep.number}
          </div>
        )) || <p>No episodes available.</p>}
      </div>
    </div>
  );
};

export default Watch;
