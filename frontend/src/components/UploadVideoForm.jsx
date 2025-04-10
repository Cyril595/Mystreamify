import { useState } from 'react';
import axios from 'axios';

const UploadVideoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle video file change
  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle thumbnail file change
  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !description || !videoFile || !thumbnail) {
      setError('Please fill in all fields and upload both a video and a thumbnail.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnail);

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/videos/upload-video', formData, {
        withCredentials: true,
      });

      if (response.data.message === 'Video uploaded successfully') {
        setSuccess(true);
        setTitle('');
        setDescription('');
        setVideoFile(null);
        setThumbnail(null);
        alert('Video uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading video', error);
      setError(error.response?.data?.error || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Upload Video</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Video uploaded successfully!</p>}

      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-white">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-700 rounded text-white"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-white">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-700 rounded text-white"
            required
          />
        </div>

        {/* Video File Input */}
        <div className="mb-4">
          <label htmlFor="videoFile" className="block text-white">Video File</label>
          <input
            type="file"
            id="videoFile"
            onChange={handleVideoChange}
            className="w-full p-2 mt-2 bg-gray-700 text-white"
            accept="video/*"
            required
          />
        </div>

        {/* Thumbnail File Input */}
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-white">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            onChange={handleThumbnailChange}
            className="w-full p-2 mt-2 bg-gray-700 text-white"
            accept="image/*"
            required
          />
        </div>

        {/* Thumbnail Preview */}
        {thumbnail && (
          <div className="mb-4">
            <h4 className="text-white">Thumbnail Preview:</h4>
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail Preview"
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default UploadVideoForm;
