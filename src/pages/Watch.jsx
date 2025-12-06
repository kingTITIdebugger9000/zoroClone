import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { animeName } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      if (!animeName) {
        setError("No anime name provided");
        setLoading(false);
        return;
      }

      try {
        // Encode slug for safe API call (minor fix for slugs with spaces/special chars)
        const encodedName = encodeURIComponent(animeName);
        const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${encodedName}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setAnime(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [animeName]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading anime details...</div>;
  }

  if (error || !anime) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Error: {error || "Failed to load anime"}. Try refreshing or check console.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
        <img 
          src={anime.image} 
          alt={anime.title} 
          className="w-48 h-64 object-cover rounded mb-4"
        />
        <p className="text-gray-700">{anime.description || "No synopsis available."}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
        {anime.episodes && anime.episodes.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {anime.episodes.map((episode) => (
              <li key={episode.id} className="bg-gray-100 p-4 rounded cursor-pointer hover:bg-gray-200">
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Load player here (e.g., set current episode state and fetch servers)
                    console.log("Play episode:", episode.number);
                    // Example: window.open(`/player/${episode.id}`, '_blank'); or embed iframe
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Episode {episode.number}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No episodes available.</p>
        )}
      </div>
    </div>
  );
};

export default Watch;
