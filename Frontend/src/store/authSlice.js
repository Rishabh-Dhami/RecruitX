import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("accessToken");
const userData = localStorage.getItem("userData");

const initialState = {
  status: !!accessToken,
  userData: userData ? JSON.parse(userData) : null,
  accessToken: accessToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
