import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    // user: null,
  },
  reducers: {
    login: (state /* , action*/) => {
      state.isLoggedIn = true;
      // state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      Cookies.remove("token");
    },
    checkAuthState: (state) => {
      const authState = localStorage.getItem("authState");
      if (authState) {
        const { auth } = JSON.parse(authState);
        state.isLoggedIn = auth.isLoggedIn;
        // state.user = auth.user;
      }
    },
  },
});

export const { login, logout, checkAuthState } = authSlice.actions;
export default authSlice.reducer;
