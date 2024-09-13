// // AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = Cookies.get("token");
//       setIsLoggedIn(!!token);
//     };

//     checkLoginStatus();
//     // Check login status every 5 minutes
//     const intervalId = setInterval(checkLoginStatus, 5 * 60 * 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const login = (token) => {
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     // Remove the token cookie
//     Cookies.remove("token");
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        // Verify the token with the backend
        const response = await axios.get(
          "http://localhost:3000/api/auth/verify",
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(response.data.isValid);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsLoggedIn(false);
        Cookies.remove("token");
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      Cookies.remove("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, checkLoginStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Custom hook for logout
export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirect to home page after logout
  };

  return handleLogout;
};
