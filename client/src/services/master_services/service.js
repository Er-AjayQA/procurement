import axiosInstance from "../axisInstance";

// **************************** ROLE MASTER **************************** //
// Create Role Master
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

// **************************** DESIGNATION MASTER **************************** //
// Create Designations Master
export const createDesignation = async (formData) => {
  const response = await axiosInstance.post("create-designation", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Designation
export const updateDesignation = async (id, formData) => {
  const response = await axiosInstance.put(
    `update-designation/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Status
export const updateDesignationStatus = async (id) => {
  const response = await axiosInstance.put(`update-designation-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Designations by ID
export const getDesignationById = async (id) => {
  const response = await axiosInstance.post(`get-designation-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Designations List
export const getAllDesignations = async (formData) => {
  const response = await axiosInstance.post("get-all-designations", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Designation Master
export const deleteDesignation = async (id) => {
  const response = await axiosInstance.put(`delete-designation/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
