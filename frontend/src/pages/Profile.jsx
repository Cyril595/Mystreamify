
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Make sure to import AuthContext
import ProfileHeader from '../components/ProfileHeader'; // Profile header component
import UpdatePasswordForm from '../components/UpdatePasswordForm'; // Update password form
import UpdateAvatarForm from '../components/UpdateAvatarForm'; // Update avatar form
import UploadVideoForm from '../components/UploadVideoForm'; // Video upload form
import UpdateAccountForm from '../components/UpdateAccountForm'; // Update account form

const Profile = () => {
  const { loggedinuser } = useContext(AuthContext); // Access logged-in user from context
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!loggedinuser)//jab tak loggedinuser fetch nhi hojaata neeche math jaana
      return;
    const fetchProfile = async () => {
      if (!loggedinuser?.username) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/c/${loggedinuser._id}`, // Use loggedinuser.username
          { withCredentials: true }
        );
        setProfile(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [loggedinuser]); // Re-run effect if loggedinuser changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      {/* Profile header */}
      <ProfileHeader profile={profile} />

      {/* Option to update account details */}
      <UpdateAccountForm profile={profile} setProfile={setProfile} />

      {/* Option to update password */}
      <UpdatePasswordForm />

      {/* Option to update avatar */}
      <UpdateAvatarForm profile={profile} setProfile={setProfile} />

      {/* Option to upload a video */}
      <UploadVideoForm />
    </div>
  );
};

export default Profile;
