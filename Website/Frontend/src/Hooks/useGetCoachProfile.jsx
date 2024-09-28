import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useGetCoachProfile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoachProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found in cookies");
        }
        const response = await axios.get(
          "http://localhost:3000/api/coaches/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoachProfile();
  }, []);

  return { data, isLoading, error };
};

export default useGetCoachProfile;
