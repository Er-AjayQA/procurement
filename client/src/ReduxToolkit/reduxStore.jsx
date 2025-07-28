import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./userLoginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
