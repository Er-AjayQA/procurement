import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./userLoginSlice";
import authSlice from "./authSlice";
import employeeSlice from "./employeeSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    auth: authSlice,
    employee: employeeSlice,
  },
});
