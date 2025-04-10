import React, { useState, useEffect } from 'react'; // Import React and useState, useEffect
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Import React Icons
import axios from 'axios';

const LikeButton = ({ videoId }) => {
  const [isLiked, setIsLiked] = useState(false); // Initially assume it's not liked
  const [isDisliked, setIsDisliked] = useState(false); // Initially assume it's not disliked
  const [likeCount, setLikeCount] = useState(0); // Store like count
  const [dislikeCount, setDislikeCount] = useState(0); // Store dislike count

  // Fetch like/dislike status and counts when the component mounts
  useEffect(() => {
    const fetchStatusAndCounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/likes/check/v/${videoId}`, {
          withCredentials: true,
        });

        setIsLiked(response.data.liked);
        setIsDisliked(response.data.disliked);

        // Fetch the like/dislike counts
        const countsResponse = await axios.get(`http://localhost:8000/api/v1/likes/count/v/${videoId}`, {
          withCredentials: true,
        });
        setLikeCount(countsResponse.data.likes);
        setDislikeCount(countsResponse.data.dislikes);

      } catch (error) {
        console.error("Error fetching like/dislike status or counts:", error);
      }
    };

    fetchStatusAndCounts();
  }, [videoId]); // Re-fetch status and counts when videoId changes

  const handleLikeClick = async () => {
    try {
      const status = 'like'; // Always send "like" to the server

      const response = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/v/${videoId}`,
        { status }, // Send the like status in the request body
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Update states based on the new status after toggling
          setIsLiked(true); 
          setLikeCount(likeCount + 1);
          if(isDisliked) 
          {
            setDislikeCount(dislikeCount - 1)
            setIsDisliked(false); 
          }
    
      }
      if(response.status==204)
      {
        setIsLiked(false)
        setIsDisliked(false)
        setLikeCount(likeCount-1)
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDislikeClick = async () => {
    try {
      const status = 'dislike'; // Always send "dislike" to the server

      const response = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/v/${videoId}`,
        { status }, // Send the dislike status in the request body
        { withCredentials: true }
      );

      if (response.status === 200) {
          setIsDisliked(true); // Add dislike
          setDislikeCount(dislikeCount + 1); // Increase dislike count
          if (isLiked) {
            setIsLiked(false); // Remove like if it's there
            setLikeCount(likeCount - 1); // Decrease like count
          }
        
      }
      if(response.status==204)
        {
          setIsLiked(false)
          setIsDisliked(false)
          setDislikeCount(dislikeCount - 1)
        }
    } catch (error) {
      console.error("Error toggling dislike:", error);
    }
  };


  return (
    <div className="mt-5">
      <div className="flex items-center space-x-4">
        {/* Like button */}
        <button
          onClick={handleLikeClick}
          className={`px-4 py-2 rounded-md border ${isLiked ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-gray-300'} bg-white hover:bg-gray-100 transition-all duration-200 flex items-center justify-center`}
        >
          <FaThumbsUp size={20} className="mr-2" />
          Like
        </button>

        {/* Dislike button */}
        <button
          onClick={handleDislikeClick}
          className={`px-4 py-2 rounded-md border ${isDisliked ? 'text-red-500 border-red-500' : 'text-gray-500 border-gray-300'} bg-white hover:bg-gray-100 transition-all duration-200 flex items-center justify-center`}
        >
          <FaThumbsDown size={20} className="mr-2" />
          Dislike
        </button>
      </div>

      <div className="mt-4 flex justify-between">
        <span>{likeCount} Likes</span>
        <span>{dislikeCount} Dislikes</span>
      </div>
    </div>
  );
};

export default LikeButton;
