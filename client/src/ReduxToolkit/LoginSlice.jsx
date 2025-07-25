import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  showPassword: false,
  forgotPassword: false,
  resetEmail: null,
  isOtpSent: false,
  isVerifyOtp: false,
  isResetForm: false,
  error: null,
  success: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setForgotPassword: (state, action) => {
      state.forgotPassword = action.payload;
    },
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
    setIsOtpSent: (state, action) => {
      state.isOtpSent = action.payload;
    },
    setIsVerifyOtp: (state, action) => {
      state.isVerifyOtp = action.payload;
    },
    setIsResetForm: (state, action) => {
      state.isResetForm = action.payload;
    },
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.success = true;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const {
  setShowPassword,
  setForgotPassword,
  setResetEmail,
  setIsOtpSent,
  setIsVerifyOtp,
  setIsResetForm,
  loginStart,
  loginSuccess,
  loginFailure,
  resetState,
} = loginSlice.actions;
export default loginSlice.reducer;
