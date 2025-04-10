import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Home, History, User, LogOut } from "lucide-react"; // Icons

function Sidebar() {
  const navigate = useNavigate();
  const { setLoggedinuser, setAccessToken } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/logout", {}, {
        withCredentials: true,  
      });

      if (response.data.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedinuser");
        localStorage.removeItem("playlists");
        setAccessToken(""); 
        setLoggedinuser(""); 
        navigate("/login");
      } else {
        alert(response.data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred during logout");
    }
  };

  return (
    <aside className="w-64 bg-gray-900 p-4 h-screen text-white flex flex-col">
      <nav className="flex-1 mt-10">
        <ul className="space-y-4 mt-6">
          <li>
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-3 w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <Home size={20} />
              Home
            </button>
          </li>

          <li>
            <button 
              onClick={() => navigate("/history")}
              className="flex items-center gap-3 w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <History size={20} />
              History
            </button>
          </li>

          <li>
            <button 
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <User size={20} />
              Profile
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/myuploads")}
              className="flex items-center gap-3 w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <User size={20} />
              My Uploads
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/mysubscriptions")}
              className="flex items-center gap-3 w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <User size={20} />
              My Subscriptions
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/playlists")}
              className="flex items-center gap-3 w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <User size={20} />
              My Playlists
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 w-full p-3 bg-red-600 rounded-lg hover:bg-red-500 transition mt-6"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
