import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthentic: false,
  token: JSON.parse(localStorage.getItem("token")) || null,
  assignedModules: JSON.parse(localStorage.getItem("assignedModules")) || [],
  userDetails: JSON.parse(localStorage.getItem("userDetails")) || null,
  activeModule: JSON.parse(localStorage.getItem("activeModule")) || "Dashboard",
  activeSubmodule: JSON.parse(localStorage.getItem("activeSubmodule")) || null,
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
    setActiveModule: (state, action) => {
      state.activeModule = action.payload.activeModule;
      state.activeSubmodule = null;
      localStorage.setItem(
        "activeModule",
        JSON.stringify(action.payload.activeModule)
      );
      localStorage.removeItem("activeSubmodule");
    },
    setActiveSubmodule: (state, action) => {
      state.activeSubmodule = action.payload.activeSubmodule;
      localStorage.setItem(
        "activeSubmodule",
        JSON.stringify(action.payload.activeSubmodule)
      );
    },

    logout: (state) => {
      state.isAuthentic = false;
      state.token = null;
      state.assignedModules = [];
      state.userDetails = null;
      state.activeModule = "Dashboard"; // Reset to Dashboard
      state.activeSubmodule = null;
      localStorage.clear();
    },
  },
});

export const {
  setUserDetails,
  setAuth,
  setActiveModule,
  setActiveSubmodule,
  setToken,
  setAssignedModules,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
