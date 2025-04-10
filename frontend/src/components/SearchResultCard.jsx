import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SearchResultCard = ({
  ownerid,
  videoId, // Added videoId prop
  title,
  thumbnail,
  ownerUsername,
  ownerAvatar,
  likeCount,
  dislikeCount,
  totalSubscribers,
  views,
  description,
}) => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="bg-[#1E1E2E] p-6 rounded-xl shadow-lg w-[85%] mb-6 mx-auto transition-all transform hover:scale-105 hover:shadow-2xl">
      <div className="flex gap-6">
        {/* Left Side - Thumbnail and Avatar */}
        <div className="w-2/5">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-44 object-cover rounded-lg shadow-md cursor-pointer"
            onClick={() => navigate(`/video/${videoId}`)} // Navigate on click
          />
          <div className="flex items-center gap-2 mt-3">
            <img
              src={ownerAvatar}
              alt={`${ownerUsername}'s avatar`}
              className="w-10 h-10 rounded-full border-2 border-gray-400 cursor-pointer"
              onClick={()=>navigate(`/otheruserpage/${ownerid}`)}
            />
            <span className="text-gray-300 text-sm">{ownerUsername}</span>
          </div>
        </div>

        {/* Right Side - Title, Description & Stats */}
        <div className="w-3/5 flex flex-col justify-between">
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          <p className="text-gray-300 text-lg mt-2">{description}</p>
          <div className="text-gray-400 text-base mt-4">
            <p>Likes: <span className="text-white">{likeCount}</span></p>
            <p>Dislikes: <span className="text-white">{dislikeCount}</span></p>
            <p>Subscribers: <span className="text-white">{totalSubscribers}</span></p>
            <p>Views: <span className="text-white">{views}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
