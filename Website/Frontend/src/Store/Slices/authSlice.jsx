import { registerUser, loginUser, logoutUser } from "../Thunks/authThunks";
import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthState: (state) => {
      const token = Cookies.get("token");
      console.log("Token from cookie:", token);
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      } else {
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
      }
      console.log("isLoggedIn set to:", state.isLoggedIn);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Cookies.remove("token");
        return { ...initialState };
      });
  },
});

// Only export the actions you need
export const { checkAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;
