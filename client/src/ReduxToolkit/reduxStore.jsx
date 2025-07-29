import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./userLoginSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    auth: authSlice,
  },
});
