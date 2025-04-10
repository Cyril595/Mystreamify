import React from 'react';

const MyUploadsCard = ({ video, onDelete }) => {
  return (
    <div className="flex items-center bg-[#1e293b] text-white rounded-lg shadow-lg p-4 w-full max-w-2xl mx-auto">
      {/* Thumbnail */}
      <img 
        src={video.thumbnail || "https://via.placeholder.com/300"} 
        alt={video.title} 
        className="w-48 h-28 object-cover rounded-lg"
      />

      {/* Video Info */}
      <div className="flex flex-col flex-grow ml-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-100">{video.title}</h2>

        {/* Tags */}
        <p className="text-sm text-gray-400 mt-1">{video.tags?.map(tag => `#${tag}`).join(', ')}</p>

        {/* Stats (Likes, Dislikes, Subscribers, Views) */}
        <div className="text-sm text-gray-300 mt-2 flex flex-wrap gap-x-3">
          <span>👍 {video.likeCount}</span>
          <span>👎 {video.dislikeCount}</span>
          <span>👀 {video.views} Views</span>
        </div>
      </div>

      {/* Delete Button */}
      <button 
        onClick={() => onDelete(video._id)}
        className="ml-auto bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MyUploadsCard;
