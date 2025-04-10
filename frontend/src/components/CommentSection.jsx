import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Import like and dislike icons

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]); // State to store comments for the video
  const [newComment, setNewComment] = useState(""); // State to store the new comment content
  const { loggedinuser } = useContext(AuthContext); // Get logged-in user data

  // Function to fetch comments for the video
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/comments/${videoId}`, {
        withCredentials: true, // Ensure credentials are sent with the request
      });

      if (response.data.comments) {
        const commentsWithReactions = await Promise.all(
          response.data.comments.map(async (comment) => {
            // Check if the user has already liked or disliked the comment
            const reactionResponse = await axios.get(
              `http://localhost:8000/api/v1/likes/check/c/${comment._id}`,
              { withCredentials: true } // Include credentials here
            );
            return {
              ...comment,
              isLiked: reactionResponse.data.liked,
              isDisliked: reactionResponse.data.disliked,
              likeCount: await countReactions(comment._id, 'like'),
              dislikeCount: await countReactions(comment._id, 'dislike')
            };
          })
        );

        setComments(commentsWithReactions); // Set the fetched comments
      }
    } catch (error) {
      console.error("Error fetching comments:", error); // Handle error if the API request fails
    }
  };

  // Function to count reactions (likes or dislikes) for a comment
  const countReactions = async (commentId, type) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/likes/count/c/${commentId}`,
        { withCredentials: true }
      );
      return type === 'like' ? response.data.likes : response.data.dislikes;
    } catch (error) {
      console.error("Error counting reactions:", error);
      return 0;
    }
  };

  // Fetch comments when the component mounts or videoId changes
  useEffect(() => {
    fetchComments();
  }, [videoId]); // Re-fetch when videoId changes

  // Handle form submission to add a new comment
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!newComment.trim()) return; // Avoid submitting empty comments

    try {
      // Send POST request to add the new comment
    
      const response = await axios.post(
        `http://localhost:8000/api/v1/comments/${videoId}`,
        { content: newComment, owner: loggedinuser._id }, // Send loggedinuser's ID as the comment owner
        { withCredentials: true }
      );

      if (response.data.success) {
        fetchComments(); // Refetch comments after successfully adding a new one
        setNewComment(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error adding comment:", error); // Handle error if the API request fails
    }
  };

  // Handle like on comments
  const handleCommentLike = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/c/${commentId}`,
        { status: "like" },
        { withCredentials: true }
      );

      if (response.status===200) {
        // Update the like count directly in the frontend
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  isLiked: true,
                  isDisliked: false,
                  likeCount: comment.likeCount + 1,
                  dislikeCount:comment.isDisliked?comment.dislikeCount - 1:comment.dislikeCount
                }
              : comment
          )
        );
      }
      else if(response.status===204){
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  isLiked: false,
                  likeCount: comment.isLiked-1,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("Error toggling like on comment:", error);
    }
  };

  // Handle dislike on comments
  const handleCommentDislike = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/c/${commentId}`,
        { status: "dislike" },
        { withCredentials: true }
      );

      if (response.status===200) {
        // Update the dislike count directly in the frontend
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  isDisliked: true,
                  isLiked:false,
                  dislikeCount:comment.dislikeCount + 1,
                  likeCount:comment.isLiked?comment.likeCount-1:comment.likeCount,
                }
              : comment
          )
        );
      }
     else if (response.status===204) {
        // Update the dislike count directly in the frontend
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  isDisliked: false,
                  dislikeCount:comment.dislikeCount - 1,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("Error toggling dislike on comment:", error);
    }
  };

  return (
    <div className="mt-4">
      {/* Display total number of comments */}
      <h2 className="text-xl font-bold mb-2">Total Comments: {comments.length}</h2>
    {/* Add a new comment */}
    <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-3 bg-gray-800 p-3 rounded-lg shadow-md">
  <input
    type="text"
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Add a comment..."
  />
  
  <button
    type="submit"
    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
  >
    Comment
  </button>
</form>
  <br />
      {/* List all comments */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="border-b pb-4">
            {/* Display comment owner with more styling */}
            <div className="flex items-center space-x-2">
              {/* Avatar */}
              {comment.owner && comment.owner.avatar ? (
                <img
                  src={comment.owner.avatar}
                  alt={comment.owner.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                  {comment.owner?.username?.[0]?.toUpperCase()}
                </div>
              )}
              {/* Display "You" if the logged-in user is the owner of the comment */}
              {comment.owner && comment.owner.username ? (
                <p className="font-bold text-lg text-blue-500">
                  {loggedinuser._id === comment.owner._id ? "You" : comment.owner.username}
                </p>
              ) : (
                <p className="font-bold text-lg text-gray-500">Anonymous</p>
              )}
            </div>

            {/* Display comment content */}
            <p className="mt-2 text-white">{comment.content}</p>

            {/* Display Like/Dislike buttons */}
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => handleCommentLike(comment._id)}
                className={`flex items-center space-x-1 ${comment.isLiked ? "text-blue-500" : "text-gray-500"} hover:text-blue-500`}
              >
                <FaThumbsUp size={16} />
                <span>Like</span>
              </button>
              <button
                onClick={() => handleCommentDislike(comment._id)}
                className={`flex items-center space-x-1 ${comment.isDisliked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
              >
                <FaThumbsDown size={16} />
                <span>Dislike</span>
              </button>
              <div className="ml-4 text-sm">
                <span>{comment.likeCount} Likes</span> | <span>{comment.dislikeCount} Dislikes</span>
              </div>
            </div>
          </div>
        ))}
      </div>

     

    </div>
  );
};

export default CommentSection;
