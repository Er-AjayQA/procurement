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

// Update Role
export const updateRole = async (id, formData) => {
  const response = await axiosInstance.put(`update-role/${id}`, formData, {
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

// Get Master Roles by ID
export const getRoleById = async (id) => {
  const response = await axiosInstance.post(`get-role-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Roles List
export const getAllRoles = async (formData) => {
  const response = await axiosInstance.post("get-all-role-details", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Role Master
export const deleteRole = async (id) => {
  const response = await axiosInstance.put(`delete-role/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
