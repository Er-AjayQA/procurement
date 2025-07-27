import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginService,
  resetPasswordService,
  sendOTPService,
  verifyOTPService,
} from "../services/login_services/service";
import { toast } from "react-toastify";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  setForgotPassword,
  setIsOtpSent,
  setIsResetForm,
  setIsVerifyOtp,
  setResetEmail,
} from "../ReduxToolkit/LoginSlice";
import { moduleAccessService } from "../services/rbac_services/service";
import { getUserDetailsFromToken } from "../Utils/jwtDecode";

// Login User Thunk
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formData, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await loginService(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        const userDetails = getUserDetailsFromToken(response.data.token);
        const modulesResponse = await moduleAccessService(userDetails.id);
        dispatch(
          loginSuccess({
            token: response.data.token,
            userDetails,
            assignedModules: modulesResponse.data,
          })
        );
        return { ...response.data, assignedModules: modulesResponse.data };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login Failed";
      toast.error(errorMessage);
      dispatch(loginFailure());
      throw error;
    }
  }
);

// Send OTP Thunk
export const sendOTP = createAsyncThunk(
  "login/sendOTP",
  async (formData, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await sendOTPService(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setResetEmail(formData.official_email));
        dispatch(loginSuccess());
        dispatch(setIsOtpSent(true));
        dispatch(setIsVerifyOtp(false));
        dispatch(setIsResetForm(false));
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unable to send OTP";
      toast.error(errorMessage);
      dispatch(loginFailure());
      throw error;
    }
  }
);

// Verify OTP Thunk
export const verifyOTP = createAsyncThunk(
  "login/verifyOTP",
  async (formData, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await verifyOTPService(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(loginSuccess());
        dispatch(setIsVerifyOtp(true));
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unable to verify OTP";
      toast.error(errorMessage);
      dispatch(loginFailure());
      throw error;
    }
  }
);

// Reset Password Thunk
export const resetPassword = createAsyncThunk(
  "login/resetPassword",
  async (formData, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await resetPasswordService(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(loginSuccess());
        dispatch(setIsVerifyOtp(false));
        dispatch(setForgotPassword(false));
        dispatch(setIsOtpSent(false));
        dispatch(setIsResetForm(false));
        dispatch(setResetEmail(null));
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unable to reset password";
      toast.error(errorMessage);
      dispatch(loginFailure());
      throw error;
    }
  }
);
