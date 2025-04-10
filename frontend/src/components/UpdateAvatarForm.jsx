import { useState } from 'react';
import axios from 'axios';

const UpdateAvatarForm = ({ profile, setProfile }) => {
  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar); // Initial avatar preview from profile
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);

    // Set a preview of the new avatar
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAvatar) return;

    const formData = new FormData();
    formData.append('avatar', newAvatar);

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/avatar',
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setProfile((prevState) => ({
          ...prevState,
          avatar: response.data.data.avatar,
        }));
        setLoading(false);
        alert('Avatar updated successfully');
      } else {
        setError(response.data.error || 'Failed to update avatar');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || 'An error occurred while updating avatar');
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Update Avatar</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Avatar Preview */}
      <div className="flex justify-center mb-4">
        <img
          src={avatarPreview}
          alt="Avatar Preview"
          className="w-32 h-32 rounded-full border-4 border-white"
        />
      </div>

      {/* Avatar Input and Submit */}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleAvatarChange}
          className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Avatar'}
        </button>
      </form>
    </div>
  );
};

export default UpdateAvatarForm;
