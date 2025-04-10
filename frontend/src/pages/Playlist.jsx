import React, { useContext, useEffect } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';
import { useNavigate } from 'react-router-dom';
const Playlist = () => {
  const { playlists } = useContext(PlaylistContext);
    const navigate=useNavigate();
    useEffect(()=>{
    if(!playlists)
      return;
    },[playlists])
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Playlist Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(playlists) && playlists.map((playlist) => (
          <div 
            key={playlist._id} 
            className="bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition"
            onClick={()=>navigate(`/playlist/${playlist._id}`)}
          >
            <h2 className="text-lg font-semibold">{playlist.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;