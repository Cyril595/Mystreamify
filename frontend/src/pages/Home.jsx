import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { AuthContext } from "../context/AuthContext";
import { PlaylistContext } from "../context/PlaylistContext";
const Home = () => {
  const [videos, setVideos] = useState([]); // State to store video data
  const navigate = useNavigate(); // Hook to navigate between pages
 const {loggedinuser,getLoggedinuser}=useContext(AuthContext)
 const {playlists,fetchUserPlaylists}=useContext(PlaylistContext)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Send GET request to fetch videos from the backend
        const { data } = await axios.get("http://localhost:8000/api/v1/videos?home=home", {
          withCredentials: true, // Ensure cookies or authentication tokens are sent
        });

        // Ensure the response contains a 'videos' array
        if (Array.isArray(data.data.videos)) {
          setVideos(data.data.videos); // Set the videos in the state
        } else {
          console.error("Received data does not contain an array of videos");
        }
      } catch (error) {
        console.error("Error:", error); // Handle error if request fails
      }
    };
    if(!loggedinuser)
    getLoggedinuser()
    fetchVideos(); // Call the fetchVideos function to load the videos
  }, []); // Ensure the effect runs when the user is logged in

   // Fetch playlists when loggedinuser is available
   

// Fetch playlists when loggedinuser is available
useEffect(() => {
  if (loggedinuser) {
    fetchUserPlaylists(loggedinuser._id);
  }
}, [playlists]); // Runs when loggedinuser is updated so that new playlist is also visible in the three dot menu

  // Navigate to the video page when a thumbnail is clicked
  const handleVideo = (videoId) => {
    navigate(`/video/${videoId}`); // This will navigate to the VideoPlayer page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-10 overflow-visible">
        {videos.length > 0 ? (
          videos.map((video) => {
            return (
              <VideoCard
                key={video._id}
                videoId={video._id}
                title={video.title}
                thumbnail={video.thumbnail}
                likeCount={video.likeCount}
                dislikeCount={video.dislikeCount}
                totalSubscribers={video.totalSubscribers}
                ownerUsername={video.owner.username} // Access owner username
                ownerAvatar={video.owner.avatar} // Access owner avatar
                views={video.views}
                description={video.description}
                duration={video.duration}
                owner={video.owner}
                onClick={() => handleVideo(video._id)} // Pass the video ID to the handler
              />
            );
          })
        ) : (
          <p>No videos available</p> // If no videos are available, show this message
        )}
      </div>
    </div>
  );
};

export default Home;
