import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const usePatchUserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const patchUserProfile = async (formData) => {
    setIsLoading(true);
    setIsUpdating(true);
    const updateToast = toast.loading("Updating profile...");

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in cookies");
      }

      const response = await axios.patch(
        "http://localhost:3000/api/users/profile",
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

      // Success toast
      toast.success("Profile updated successfully!", { id: updateToast });
      return response.data;
    } catch (err) {
      setUpdateError(
        err.message || "An error occurred while updating the profile"
      );
      // Error toast
      toast.error("Failed to update profile. Please try again.", {
        id: updateToast,
      });
      return null;
    } finally {
      setIsLoading(false);
      setIsUpdating(false);
    }
  };

  return { patchUserProfile, isUpdating, updateError, isLoading };
};

export default usePatchUserProfile;
