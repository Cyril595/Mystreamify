import { useState, useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import axios from "axios";

const ThreeDotMenu = ({ videoId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPlaylists, setShowPlaylists] = useState(false);
    const [creatingPlaylist, setCreatingPlaylist] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const { playlists, fetchUserPlaylists } = useContext(PlaylistContext);

    // Toggle menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setShowPlaylists(false);
        setCreatingPlaylist(false);
    };

    // Share Video Functionality
    const handleShare = () => {
        const videoURL = `${window.location.origin}/video/${videoId}`;
        navigator.clipboard.writeText(videoURL)
            .then(() => alert("Video link copied to clipboard!"))
            .catch(() => alert("Failed to copy link"));
    };

    // Add video to an existing playlist
    const handleAddToPlaylist = async (playlistId) => {
        try {
            await axios.post(
                `http://localhost:8000/api/v1/playlist/add/${videoId}/${playlistId}`,
                {},
                { withCredentials: true }
            );
            alert("Video added to playlist!");
        } catch (error) {
            console.error("Error adding video:", error);
            alert("Failed to add video.");
        }
    };

    // Create a new playlist
    const handleCreatePlaylist = async () => {
        if (!newPlaylistName.trim()) return alert("Enter a playlist name");

        try {
            await axios.post(
                `http://localhost:8000/api/v1/playlist`,
                { name: newPlaylistName },
                { withCredentials: true }
            );
            alert("Playlist created!");
            setNewPlaylistName("");
            setCreatingPlaylist(false);
            fetchUserPlaylists();
        } catch (error) {
            console.error("Error creating playlist:", error);
            alert("Failed to create playlist.");
        }
    };

    return (
        <div className="relative z-50" >
            {/* Three Dot Button */}
            <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-300">
                ⋮
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-gray-800 text-white border border-gray-700 rounded shadow-lg p-2 ">
                    {/* Share Video */}
                    <button
                        onClick={handleShare}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded"
                    >
                        📤 Share
                    </button>

                    {/* Save to Playlist */}
                    <button
                        onClick={() => setShowPlaylists(true)}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded"
                    >
                        📁 Save to Playlist
                    </button>

                    {/* Show Playlists If "Save to Playlist" is Clicked */}
                    {showPlaylists && (
                        <div className="mt-2 border-t border-gray-600 pt-2">
                            <p className="text-sm font-semibold text-gray-400 mb-1">Select a Playlist</p>

                            {/* List Existing Playlists */}
                            {playlists.length > 0 ? (
                                playlists.map((playlist) => (
                                    <button
                                        key={playlist._id}
                                        onClick={() => handleAddToPlaylist(playlist._id)}
                                        className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded"
                                    >
                                        {playlist.name}
                                    </button>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400">No playlists found</p>
                            )}

                            {/* Create New Playlist */}
                            <button
                                onClick={() => setCreatingPlaylist(true)}
                                className="block w-full text-left px-3 py-2 mt-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                            >
                                + Create New Playlist
                            </button>

                            {/* New Playlist Input */}
                            {creatingPlaylist && (
                                <div className="mt-2 p-2 border border-gray-600 rounded bg-gray-900">
                                    <input
                                        type="text"
                                        value={newPlaylistName}
                                        onChange={(e) => setNewPlaylistName(e.target.value)}
                                        placeholder="Enter playlist name"
                                        className="w-full p-1 border border-gray-600 rounded mb-2 bg-gray-800 text-white"
                                    />
                                    <button
                                        onClick={handleCreatePlaylist}
                                        className="w-full bg-gray-700 text-white p-1 rounded hover:bg-gray-600"
                                    >
                                        Create
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ThreeDotMenu;
