import axios from "axios";
import Cookies from "js-cookie";

export const availabilityApi = {
  getAvailability: async () => {
    try {
      const token = Cookies.get("token");
      console.log(token);
      if (!token) {
        throw new Error("No token found in cookies");
      }

      const response = await axios.get(
        `http://localhost:3000/api/availability/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw error.response?.data?.message || "Failed to fetch availability";
    }
  },

  createAvailability: async (availabilityData) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in cookies");
      }
      const response = await axios.post(
        "http://localhost:3000/api/availability/",
        availabilityData, // Remove the extra nesting
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Availability created:", response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to create availability";
    }
  },

  // updateAvailability: async (id, availabilityData) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3000/api/availability/${id}`,
  //       availabilityData
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data?.message || "Failed to update availability";
  //   }
  // },
  updateAvailability: async (availabilityData) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await axios.put(
        `http://localhost:3000/api/availability/`,
        availabilityData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update availability";
      throw new Error(errorMessage);
    }
  },
};
