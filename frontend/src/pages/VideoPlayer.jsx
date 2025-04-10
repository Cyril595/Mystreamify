import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import SubscriptionButton from "../components/SubscriptionButton";
import LikeButton from "../components/LikeButton"; // Import the LikeButton component
import ThreeDotMenu from "../components/ThreeDotMenu";

const VideoPlayer = () => {
  const { id } = useParams(); // Get the video ID from the URL parameters
  const [video, setVideo] = useState(null); // State to store video data

  useEffect(() => {
    // Fetch video data
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/videos/${id}`, {
          withCredentials: true, // Ensure credentials are sent with the request
        });

        if (response.data.data) {
          setVideo(response.data.data); // Set the video data
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo(); // Fetch video data on component mount

  }, [id]); // Re-fetch video when videoId changes

  return (
    <div className="p-4">
      {video ? (
        <>
          <video controls className="w-full rounded-lg">
            <source src={video.videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex justify-between items-start mt-2">
  <div>
    <h1 className="text-2xl font-bold">{video.title}</h1>
    <p className="text-gray-400">{video.description}</p>
  </div>
  
  {/* ThreeDotMenu aligned to the right */}
  <ThreeDotMenu />
</div>
          {/* Channel Info Section */}
          {video.owner && (
            <div className="mt-4 flex items-center justify-between w-full">
              <SubscriptionButton
                ownerId={video.owner._id}
                channelName={video.owner.username}
                avatar={video.owner.avatar}
              />
            </div>
          )}

          {/* LikeButton */}
          <LikeButton videoId={id} />

          {/* CommentSection */}
          <CommentSection videoId={id} />
        </>
      ) : (
        <p>Loading...</p> // Show loading text until video data is fetched
      )}
    </div>
  );
};

export default VideoPlayer;
