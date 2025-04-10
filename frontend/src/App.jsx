import { Routes, Route } from "react-router-dom";  // Only import Routes and Route here
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Playlists from "./pages/History";
import Profile from "./pages/Profile";
import AuthContextProvider from "./context/AuthContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import SearchPage from "./pages/SearchPage"
import Cookies from "js-cookie";
import AuthLayout from "./components/AuthLayout";
import MainLayout from "./components/MainLayout";
import MyUploads from "./pages/MyUploads";
import MySubscriptions from "./pages/MySubscriptions";
import OtherUserPage from "./pages/OtherUserPage";
import Playlist from "./pages/Playlist";
import SpecificPlayList from "./pages/SpecificPlayList";
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Check for access token on app load
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");  // Redirect to login page if no access token
    }
    else{
      Cookies.set("accessToken", accessToken, { expires: 1, path: "/" });
    }
  }, []);  

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <AuthContextProvider>
    <PlaylistProvider>
      <Routes>
        {/* Auth Pages Without Sidebar/Navbar */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        {/* Main Pages With Sidebar/Navbar */}
        <Route
          path="/*"
          element={
            <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:id" element={<VideoPlayer />} />
                <Route path="/history" element={<Playlists />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/myuploads" element={<MyUploads />} />
                <Route path="/mysubscriptions" element={<MySubscriptions />} />
                <Route path="/otheruserpage/:id" element={<OtherUserPage />} />
                <Route path="/playlists" element={<Playlist />} />
                <Route path="/playlist/:id" element={<SpecificPlayList />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
      </PlaylistProvider>
    </AuthContextProvider>
  );
}

export default App;
