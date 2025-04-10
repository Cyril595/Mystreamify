import { useEffect, useState } from "react";
import HistoryCard from "../components/HistoryCard";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/history", { withCredentials: true });
        setHistory(response.data.history); // Corrected response access
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Function to remove history entry from UI after deletion
  const handleDelete = (historyId) => {
    setHistory((prev) => prev.filter((item) => item._id !== historyId));
  };

  if (loading) return <p>Loading watch history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-white mb-4">My Watch History</h1>
      <div className="mt-4 space-y-6">
        {history.length > 0 ? (
          history.map((item) => (
            item.video && (
              <HistoryCard
                key={item._id}
                historyId={item._id} // Pass history ID for deletion
                videoId={item.video._id}
                title={item.video.title}
                thumbnail={item.video.thumbnail}
                ownerUsername={item.video.owner.username}
                ownerAvatar={item.video.owner.avatar}
                likeCount={item.video.likesCount}
                dislikeCount={item.video.dislikesCount}
                totalSubscribers={item.video.subscribersCount}
                views={item.video.views}
                description={item.video.description}
                duration={item.video.duration}
                commentsCount={item.video.commentsCount}
                onDelete={handleDelete} // Pass delete handler
              />
            )
          ))
        ) : (
          <p className="text-white text-center">No history found</p>
        )}
      </div>
    </div>
  );
};

export default History;
