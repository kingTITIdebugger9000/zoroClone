import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Trending = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('https://api.consumet.org/anime/gogoanime/top-airing');
        const data = await res.json();
        setAnimes(data.results || []);
      } catch (err) {
        console.error('Error fetching trending anime:', err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <section className="trending-section py-8 bg-gray-900">
      <h2 className="text-2xl font-bold text-white mb-4 px-4">Trending Anime</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {animes.map((anime) => (
          <Link 
            key={anime.id} 
            to={`/watch/${anime.id}`} 
            className="block group relative overflow-hidden rounded-lg"
          >
            <img 
              src={anime.image} 
              alt={anime.title} 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="font-bold text-sm line-clamp-2">{anime.title}</h3>
              <p className="text-xs">Episodes: {anime.totalEpisodes || 'Ongoing'}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Trending;
