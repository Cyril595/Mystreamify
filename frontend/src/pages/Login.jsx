import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setAccessToken,loggedinuser, getLoggedinuser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/login", formData, {
        withCredentials: true, 
      });

      const data = response.data;

      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        getLoggedinuser();
        setAccessToken(data.accessToken);
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          onChange={handleChange}
          required
        />

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white">
          Login
        </button>

        {/* Don't have an account? Navigate to Register */}
        <p className="text-gray-300 mt-4 text-center">
          Don't have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
