import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const OtherUserPage = () => {
  const { id: userId } = useParams(); // Extract userId from URL
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/c/${userId}`, {
            withCredentials: true
          });
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Fetch user's videos
    const fetchUserVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/videos?userId=${userId}`,{
            withCredentials: true
        });
        setVideos(response.data.data.videos);
      } catch (error) {
        console.error("Error fetching user videos:", error);
      }
    };

    Promise.all([fetchUserDetails(), fetchUserVideos()]).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="text-white p-6">
      {/* User Details */}
      {user && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
          <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full mr-4 border-2 border-gray-600" />
          <div>
            <h1 className="text-2xl font-semibold">{user.username}</h1>
            <p className="text-gray-400">{user.subscribersCount} subscribers</p>
          </div>
        </div>
      )}

      {/* User's Videos */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover cursor-pointer" onClick={()=>navigate(`/video/${video._id}`)} />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-200 truncate">{video.title}</h3>
                <div className="text-gray-400 text-sm mt-2">
                  <p>Likes: {video.likeCount} | Dislikes: {video.dislikeCount}</p>
                  <p>{video.views} views</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No videos uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default OtherUserPage;
