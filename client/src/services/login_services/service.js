import axiosInstance from "../axisInstance";

export const loginService = async (formData) => {
  const data = await axiosInstance.post("/user-login", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};
