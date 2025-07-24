import axiosInstance from "../axisInstance";

// LOGIN SERVICE
export const loginService = async (formData) => {
  const data = await axiosInstance.post("/user-login", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

// SEND OTP SERVICE
export const sendOTPService = async (formData) => {
  const data = await axiosInstance.post("/send-otp", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

// VERIFY OTP SERVICE
export const verifyOTPService = async (formData) => {
  const data = await axiosInstance.post("/verify-otp", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

// PASSWORD RESET SERVICE
export const resetPasswordService = async (formData) => {
  const data = await axiosInstance.post("/reset-password", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};
