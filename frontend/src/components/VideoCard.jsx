import { useNavigate } from "react-router-dom";
import ThreeDotMenu from "./ThreeDotMenu";
const VideoCard = ({ 
  title, 
  videoId,
  thumbnail, 
  likeCount, 
  dislikeCount, 
  totalSubscribers, 
  ownerUsername, 
  ownerAvatar, 
  views,
  description,
  duration,
  owner,
  onClick 
}) => {
  const navigate=useNavigate()
  return (
    <div className="bg-gray-800 overflow-visible rounded-lg shadow-lg">
      {/* Video Thumbnail with Hover Effect */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover cursor-pointer group-hover:opacity-80 transition duration-300"
          onClick={onClick} // Trigger the onClick passed from Home
        />
         
        {/* Video Duration */}
        {duration && (
          <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full opacity-80">
            {duration}
          </div>
        )}
        {/* Video Views */}
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full opacity-80">
          {views} views
        </div>
      </div>

      {/* Video Information */}
      <div className="p-4 text-white">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-200 truncate">{title}</h3>

        {/* Owner Info with Subscribers */}
        <div className="flex items-center mt-2 justify-between">
    <div className="flex items-center">
        <img
            src={ownerAvatar}
            alt={ownerUsername}
            className="w-10 h-10 rounded-full mr-3 border-2 border-gray-600 cursor-pointer"
            onClick={() => navigate(`/otheruserpage/${owner._id}`)}
        />
        <div>
            <span className="text-sm text-gray-300 font-medium">{ownerUsername}</span>
            <p className="text-xs text-gray-400">{totalSubscribers} subscribers</p>
        </div>
    </div>

    {/* Three-Dot Menu at the End */}
    <ThreeDotMenu videoId={videoId} />
</div>

        {/* Stats */}
        <div className="mt-3 flex justify-between text-sm text-gray-400">
          <div>Likes: {likeCount}</div>
          <div>Dislikes: {dislikeCount}</div>
        </div>

        {/* Video Description (optional) */}
        {description && (
          <div className="mt-3 text-sm text-gray-400">
            <p className="line-clamp-3">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
