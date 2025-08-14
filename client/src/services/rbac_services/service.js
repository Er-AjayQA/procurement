import axiosInstance from "../axisInstance";

// Get RBAC Module Service
export const moduleService = async () => {
  const response = await axiosInstance.post("/get-all-module-details", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
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

// Get RBAC All Users Access Module Service
export const allUsersModuleAccessService = async (formData) => {
  const response = await axiosInstance.post(
    `/get-all-users-assigned-module`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
