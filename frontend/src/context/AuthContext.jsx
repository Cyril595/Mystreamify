import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [loggedinuser, setLoggedinuser] = useState(null);

  // Rehydrate loggedinuser from localStorage on app load/refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedinuser");
    if (storedUser) {
      setLoggedinuser(JSON.parse(storedUser));
    }
  }, []);


  // Fetch from backend if needed
  const getLoggedinuser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users`, {
        withCredentials: true,
      });
      const user = response.data;
      localStorage.setItem("loggedinuser", JSON.stringify(user));
      setLoggedinuser(user);

    } catch (error) {
      console.error("Failed to fetch logged-in user:", error);
    }
  };

  const value = {
    accessToken,
    setAccessToken,
    loggedinuser,
    setLoggedinuser,
    getLoggedinuser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
