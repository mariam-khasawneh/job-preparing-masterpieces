import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../Thunks/authThunks";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: Cookies.get("token") || null, // Initialize token from cookies
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token"); // Remove token from cookies
      localStorage.removeItem("user"); // إزالة المستخدم من localStorage
    },
    setUser: (state, action) => {
      state.user = action.payload; // استعادة بيانات المستخدم من localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, {
          expires: 7,
          secure: true,
        }); // Set token in cookies
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // تخزين المستخدم في localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, {
          expires: 7,
          secure: true,
        }); // Set token in cookies
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // تخزين المستخدم في localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
