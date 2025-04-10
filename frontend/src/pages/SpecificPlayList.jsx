import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PlaylistContext } from "../context/PlaylistContext";

const SpecificPlayList = () => {
  const { id: playlistId } = useParams(); // Renamed `id` to `playlistId`
  const navigate = useNavigate();
  const { playlists, setPlaylists } = useContext(PlaylistContext); // Use Context
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/playlist/${playlistId}`, {
          withCredentials: true,
        });
        setPlaylist(response.data.playlist);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  // Function to remove a video from the playlist
  const handleRemoveVideo = async (videoId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/v1/playlist/remove/${videoId}/${playlistId}`,
        {},
        { withCredentials: true }
      );

      setPlaylist((prev) => ({
        ...prev,
        video: prev.video.filter((video) => video._id !== videoId),
      }));
    } catch (err) {
      console.error("Error removing video:", err);
    }
  };

  // Function to delete the entire playlist
  const handleDeletePlaylist = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/playlist/${playlistId}`, {
        withCredentials: true,
      });

      // Remove deleted playlist from the context state
      setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));

      // Redirect to playlists page
      navigate("/playlists");
    } catch (err) {
      console.error("Error deleting playlist:", err);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {/* Header with Playlist Name & Delete Button at Opposite Ends */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{playlist?.name}</h1>
        <button 
          onClick={handleDeletePlaylist} 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Playlist
        </button>
      </div>

      {playlist?.video.length === 0 ? (
        <p>No videos in this playlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlist.video.map((video) => (
            <div key={video._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md relative">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{video.title}</h2>
              <p className="text-sm text-gray-300">Views: {video.views}</p>
              
              {/* Remove Video Button */}
              <button 
                onClick={() => handleRemoveVideo(video._id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
              >
                Remove Video
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecificPlayList;
