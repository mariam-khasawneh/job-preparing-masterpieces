import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api/auth";

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This allows the API to set cookies
});

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/signup", userData);
      Cookies.set("token", response.data.token, { expires: 7, secure: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", loginData);
      console.log("Login response:", response.data);
      Cookies.set("token", response.data.token, { expires: 7, secure: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/logout");
      Cookies.remove("token");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch user profile thunk
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token; // Get the token from the Redux store

    const response = await axios.get(
      "http://localhost:3000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.user; // Return the user object
  }
);
