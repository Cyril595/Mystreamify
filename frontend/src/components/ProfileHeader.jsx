const ProfileHeader = ({ profile }) => {
    return (
      <div className="text-center">
        {/* Cover Image */}
        <div className="relative">
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-48 object-cover rounded"
          />
        </div>
  
        {/* Avatar and User Info */}
        <div className="mt-4 flex justify-center items-center">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
        <h1 className="mt-2 text-2xl font-semibold">{profile.fullName}</h1>
        <p className="text-xl text-gray-500">@{profile.username}</p>
  
        {/* Subscriber Information */}
        <div className="mt-2 text-gray-600">
          <p>{profile.subscribersCount} Subscribers</p>
        </div>
      </div>
    );
  };
  
  export default ProfileHeader;
  