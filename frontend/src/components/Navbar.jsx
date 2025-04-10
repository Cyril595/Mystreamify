import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gray-900 p-4 w-full flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-100 drop-shadow-lg">
  STREAMIFY
</h1>

      {/* Search Bar */}
      {location.pathname === "/" && (
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 shadow-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder-gray-400 w-64 px-2"
          />
          <button
            onClick={handleSearchSubmit}
            className="text-white hover:text-blue-400 transition duration-200"
          >
            <FaSearch size={18} />
          </button>
        </div>
      )}

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-800 flex items-center space-x-2 px-4 py-2 rounded-full text-white hover:bg-gray-700 transition duration-200 shadow-md"
      >
        {darkMode ? <FaSun size={18} className="text-yellow-400" /> : <FaMoon size={18} />}
        <span>{darkMode ? "Light" : "Dark"} Mode</span>
      </button>
    </nav>
  );
}

export default Navbar;
