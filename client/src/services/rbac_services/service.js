import axiosInstance from "../axisInstance";

// Get RBAC Module Service
export const moduleService = async () => {
  const response = await axiosInstance.post("/get-all-module-details", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data.data;
};
