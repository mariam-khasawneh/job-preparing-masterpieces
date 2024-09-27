// hooks/useGetUserProfile.js
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useGetUserProfile = () => {
  const [userData, setUserData] = useState({
    full_name: "",
    role: "",
    user_name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in cookies");
      }

      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUserData(response.data.user);
      setError(null);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { userData, setUserData, isLoading, error, fetchUserData };
};

export default useGetUserProfile;
