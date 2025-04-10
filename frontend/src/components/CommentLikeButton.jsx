import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";

const CommentLikeButton = ({ commentId, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/c/${commentId}`,
        {},
        { withCredentials: true }
      );

      setLiked(response.data.liked); // Update like status
    } catch (error) {
      console.error("Error toggling comment like:", error);
    }
  };

  return (
    <div className="flex space-x-4">
      <button onClick={handleLikeClick}>
        {liked ? <FaThumbsDown /> : <FaThumbsUp />}
        {liked ? "Unlike" : "Like"}
      </button>
    </div>
  );
};

export default CommentLikeButton;
