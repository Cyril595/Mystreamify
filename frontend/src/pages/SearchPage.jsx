import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";  // Import useLocation to get URL search params
import SearchResultCard from "../components/SearchResultCard"; // Import the updated component

const SearchPage = () => {
  const location = useLocation();  // Get the location object
  const queryParams = new URLSearchParams(location.search);  // Use URLSearchParams to parse query
  const query = queryParams.get("query");  // Get the query parameter from the URL

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:8000/api/v1/videos?query=${query}`,
            { withCredentials: true }
          );
          setSearchResults(data.data.videos);  // Assuming the response is in the right format
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchSearchResults();
    }
  }, [query]);  // Dependency on 'query' so the effect runs when the query changes

  return (
    <div className="p-4">
      {/* Render SearchResultCard components */}
      <div className="mt-4 space-y-6">
        {searchResults.length > 0 ? (
          searchResults.map((video) => (
            <SearchResultCard
              key={video._id}
              videoId={video._id}
              title={video.title}
              thumbnail={video.thumbnail}
              ownerUsername={video.owner.username} // Access owner username
              ownerAvatar={video.owner.avatar} // Access owner avatar
              likeCount={video.likeCount} // Like count
              dislikeCount={video.dislikeCount} // Dislike count
              totalSubscribers={video.totalSubscribers} // Total subscribers
              views={video.views} // Views count
              description={video.description} // Description
              ownerid={video.owner._id}
            />
          ))
        ) : (
          <p className="text-white">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
