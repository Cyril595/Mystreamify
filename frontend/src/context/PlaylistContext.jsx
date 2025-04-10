import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

// Create Context
export const PlaylistContext = createContext();
 
// Provider Component
export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);
     const {loggedinuser}=useContext(AuthContext)
    // Fetch playlists when the component mounts
    useEffect(()=>{
        const storedplaylists = localStorage.getItem("playlists");
        if (storedplaylists) {
          setPlaylists(JSON.parse(storedplaylists)); // ✅ convert back to array
        }        
    },[])
    const fetchUserPlaylists = async (loggedInUserId) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/playlist/user/${loggedInUserId}`,
                { withCredentials: true }
            );
            setPlaylists(response.data.playlists);
            localStorage.setItem("playlists", JSON.stringify(response.data.playlists));

        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    };

    return (
        <PlaylistContext.Provider value={{ playlists, setPlaylists ,fetchUserPlaylists}}>
            {children}
        </PlaylistContext.Provider>
    );
};
