import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const usePatchCoachProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const patchProfile = async (formData) => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in cookies");
      }

      const response = await axios.patch(
        "http://localhost:3000/api/coaches/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update profile");
      }

      return response.data;
    } catch (err) {
      setUpdateError(
        err.message || "An error occurred while updating the profile"
      );
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return { patchProfile, isUpdating, updateError };
};

export default usePatchCoachProfile;
