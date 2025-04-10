import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import MyUploadsCard from '../components/MyUploadsCard';

const MyUploads = () => {
  const { loggedinuser } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
    useEffect(() => {
      if (!loggedinuser) return; // ⛔ wait until user is loaded
    
      const fetchVideos = async () => {
        try {
          const { data } = await axios.get(`http://localhost:8000/api/v1/videos?userId=${loggedinuser._id}`, {
            withCredentials: true,
          });
    
          if (Array.isArray(data.data.videos)) {
            setVideos(data.data.videos);
          } else {
            console.error("Received data does not contain an array of videos");
          }
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };
    
      fetchVideos();
    }, [loggedinuser]);
    

  const handleDelete = async (videoId) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/videos/delete/${videoId}`,{}, {
        withCredentials: true,
      });

      setVideos(prevVideos => prevVideos.filter(video => video._id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-white mb-6">My Uploads</h1>
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {videos.map(video => (
          <MyUploadsCard key={video._id} video={video} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default MyUploads;
