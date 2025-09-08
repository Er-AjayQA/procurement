import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthentic: false,
  token: JSON.parse(localStorage.getItem("token")) || null,
  assignedModules: JSON.parse(localStorage.getItem("assignedModules")) || [],
  userDetails: JSON.parse(localStorage.getItem("userDetails")) || null,
  activeModule: JSON.parse(localStorage.getItem("activeModule")) || "Dashboard",
  activeSubmodule:
    JSON.parse(localStorage.getItem("activeSubmodule")) || "Dashboard",
  activeEntity: JSON.parse(localStorage.getItem("activeEntity")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload.userDetails;
      localStorage.setItem(
        "userDetails",
        JSON.stringify(action.payload.userDetails)
      );
    },
    setAssignedModules: (state, action) => {
      state.assignedModules = action.payload.assignedModules;
      localStorage.setItem(
        "assignedModules",
        JSON.stringify(action.payload.assignedModules)
      );
    },
    setAuth: () => {},
    setActiveModule: (state, action) => {
      state.activeModule = action.payload.activeModule;
      localStorage.setItem(
        "activeModule",
        JSON.stringify(action.payload.activeModule)
      );
    },
    setActiveSubmodule: (state, action) => {
      state.activeSubmodule = action.payload.activeSubmodule;
      localStorage.setItem(
        "activeSubmodule",
        JSON.stringify(action.payload.activeSubmodule)
      );
    },

    setActiveEntity: (state, action) => {
      state.activeEntity = action.payload.activeEntity;
      localStorage.setItem(
        "activeEntity",
        JSON.stringify(action.payload.activeEntity)
      );
    },

    logout: (state) => {
      state.isAuthentic = false;
      state.token = null;
      state.assignedModules = [];
      state.userDetails = null;
      state.activeModule = "Dashboard";
      state.activeSubmodule = "Dashboard";
      state.activeEntity = null;
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
  setActiveEntity,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
