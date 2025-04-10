import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SubscriptionButton = ({ ownerId, channelName, avatar }) => {
  const [subscribed, setSubscribed] = useState(false); // State to track if the user is subscribed
  const [subscriberCount, setSubscriberCount] = useState(0); // State to store the number of subscribers
   const navigate=useNavigate();
  useEffect(() => {
    // Fetch the subscription status and subscriber count
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/subscriptions/check-status/${ownerId}`, {
          withCredentials: true, // Ensure credentials are sent with the request
        });

        if (response.data.success) {
          setSubscribed(response.data.subscribed); // Set subscription status
        }
      } catch (error) {
        console.error('Error fetching subscription data:', error);
      }
    };

    const fetchSubscriberCount = async () => {
      try {
        console.log(ownerId)
        const response = await axios.get(`http://localhost:8000/api/v1/subscriptions/u/${ownerId}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setSubscriberCount(response.data.subscribers.length); // Update the subscriber count
        }
      } catch (error) {
        console.error('Error fetching subscriber count:', error);
      }
    };

    fetchSubscriptionStatus(); // Fetch data when the component mounts
    fetchSubscriberCount(); // Fetch the initial subscriber count
  }, [ownerId]); // Re-fetch when ownerId changes

  const handleSubscriptionToggle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/subscriptions/c/${ownerId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setSubscribed(!subscribed); // Toggle subscription state
        // Update subscriber count
        setSubscriberCount(subscribed ? subscriberCount - 1 : subscriberCount + 1); // Adjust subscriber count
      }
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-between w-full">
      {/* Channel Info: Avatar, Name, Subscriber Count */}
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <img
          src={avatar || 'default-avatar.jpg'} // Default avatar if none is provided
          alt={channelName}
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
          onClick={()=>navigate(`/otheruserpage/${ownerId}`)}
        />
        {/* Channel Name and Subscriber Count */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{channelName}</h3>
          <p className="text-sm text-gray-500">{subscriberCount} Subscribers</p>
        </div>
      </div>

      {/* Subscribe/Unsubscribe Button */}
      <button
        onClick={handleSubscriptionToggle}
        className={`px-6 py-2 rounded-full text-white font-semibold ${subscribed ? 'bg-red-500' : 'bg-blue-500'} hover:bg-opacity-80`}
      >
        {subscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
    </div>
  );
};

export default SubscriptionButton;
