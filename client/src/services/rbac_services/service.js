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

// Get RBAC Access Module Service
export const moduleAccessService = async (id) => {
  const response = await axiosInstance.post(`/get-all-assigned-module/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
