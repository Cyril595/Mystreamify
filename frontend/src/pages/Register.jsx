import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null, // Added cover image
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "avatar" || e.target.name === "coverImage") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key]));

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        body: formDataObj,
      });
      const data = await res.json();
      if (data.success) {
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Register</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />
        
        {/* Avatar Upload */}
        <label className="text-gray-400">Upload Avatar</label>
        <input
          type="file"
          name="avatar"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />

        {/* Cover Image Upload */}
        <label className="text-gray-400">Upload Cover Image</label>
        <input
          type="file"
          name="coverImage"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white">
          Register
        </button>

        {/* Already have an account? */}
        <p className="text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
