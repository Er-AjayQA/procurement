import axiosInstance from "../axisInstance";

// Get All Master Roles List
export const createRole = async (formData) => {
  const response = await axiosInstance.post("create-role", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Status
export const updateRoleStatus = async (id) => {
  const response = await axiosInstance.put(`update-role-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Roles List
export const getAllRoles = async () => {
  const response = await axiosInstance.post("get-all-role-details", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
