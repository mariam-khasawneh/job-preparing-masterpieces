import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    // user: null,
  },
  reducers: {
    login: (state /* , action*/) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    checkAuthState: (state) => {
      const authState = localStorage.getItem("authState");
      if (authState) {
        const { auth } = JSON.parse(authState);
        state.isLoggedIn = auth.isLoggedIn;
      }
    },
  },
});

export const { login, logout, checkAuthState } = authSlice.actions;
export default authSlice.reducer;
