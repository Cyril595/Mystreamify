// UpdateAccountForm.jsx
import { useState } from "react";
import axios from "axios";

const UpdateAccountForm = ({ profile, setProfile }) => {
  const [fullName, setFullName] = useState(profile.fullName || "");
  const [email, setEmail] = useState(profile.email || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/update-account",
        { fullName, email },
        { withCredentials: true }
      );

      setProfile(response.data.data); // Update profile in parent component
      setLoading(false);
      alert("Account details updated successfully!");
    } catch (error) {
      setError("Failed to update account.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-2">
        <label htmlFor="fullName" className="block text-white">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded text-white"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="block text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 p-2 rounded text-white"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Account"}
      </button>
    </form>
  );
};

export default UpdateAccountForm;
