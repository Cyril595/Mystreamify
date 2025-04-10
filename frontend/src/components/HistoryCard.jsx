import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HistoryCard = ({
  historyId,
  videoId,
  title,
  thumbnail,
  ownerUsername,
  ownerAvatar,
  likeCount,
  dislikeCount,
  totalSubscribers,
  views,
  description,
  duration, // Added video duration
  commentsCount, // Added comments count
  onDelete,
}) => {
  const navigate = useNavigate();

  // Function to delete history entry
  const handleDeleteHistory = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/history/delete",
        { historyId },
        { withCredentials: true }
      );
      onDelete(historyId); // Update UI after deletion
    } catch (error) {
      console.error("Failed to delete history:", error);
    }
  };

  return (
    <div className="bg-[#1E1E2E] p-6 rounded-xl shadow-lg w-[85%] mb-6 mx-auto transition-all transform hover:scale-105 hover:shadow-2xl">
      <div className="flex gap-6">
        {/* Left Side - Thumbnail */}
        <div className="relative w-2/5">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-44 object-cover rounded-lg shadow-md cursor-pointer"
            onClick={() => navigate(`/video/${videoId}`)}
          />
          {/* Video Duration Overlay */}
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
            {duration}
          </span>
        </div>

        {/* Right Side - Title, Description & Stats */}
        <div className="w-3/5 flex flex-col justify-between">
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          <p className="text-gray-300 text-lg mt-2">{description}</p>

          {/* Owner Info - Username & Subscriber Count */}
          <div className="flex items-center gap-2 mt-3">
            <img
              src={ownerAvatar}
              alt={`${ownerUsername}'s avatar`}
              className="w-10 h-10 rounded-full border-2 border-gray-400"
            />
            <span className="text-gray-300 text-sm">
              {ownerUsername} • <span className="text-white">{totalSubscribers} subscribers</span>
            </span>
          </div>

          {/* Video Stats */}
          <div className="text-gray-400 text-base mt-4 grid grid-cols-2 gap-4">
            <p>Likes: <span className="text-white">{likeCount}</span></p>
            <p>Dislikes: <span className="text-white">{dislikeCount}</span></p>
            <p>Views: <span className="text-white">{views}</span></p>
            <p>Comments: <span className="text-white">{commentsCount}</span></p>
          </div>

          {/* Delete History Button */}
          <button
            onClick={handleDeleteHistory}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
          >
            Delete from Watch History
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
