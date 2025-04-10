import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/subscriptions/c", { withCredentials: true });
        console.log(response.data)
        if(response.data.success)
        setSubscriptions(response.data.channels);
      } catch (err) {
        setError("Failed to fetch subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (subscriptions.length === 0) return <p className="text-center text-gray-500">No subscriptions found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Subscriptions</h2>
      <div className="space-y-4" >
        {subscriptions.map((channel) => (
          <div key={channel._id} className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg shadow-md">
            <img src={channel.avatar} alt={channel.username} className="w-12 h-12 rounded-full object-cover cursor-pointer"   onClick={()=>navigate(`/otheruserpage/${channel._id}`)} />
            <p className="text-white font-medium">{channel.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySubscriptions;
