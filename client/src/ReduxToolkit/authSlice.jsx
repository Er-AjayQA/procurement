import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthentic: false,
  token: JSON.parse(localStorage.getItem("token")) || null,
  assignedModules: JSON.parse(localStorage.getItem("assignedModules")) || [],
  userDetails: JSON.parse(localStorage.getItem("userDetails")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload.userDetails;
    },
    setAssignedModules: (state, action) => {
      state.assignedModules = action.payload.assignedModules;
    },
    setAuth: () => {},
    logout: (state) => {
      state.isAuthentic = false;
      state.token = localStorage.removeItem("token");
      state.assignedModules = localStorage.removeItem("assignedModules");
      state.userDetails = localStorage.removeItem("userDetails");
    },
  },
});

export const { setUserDetails, setAuth, setToken, setAssignedModules, logout } =
  authSlice.actions;
export default authSlice.reducer;
