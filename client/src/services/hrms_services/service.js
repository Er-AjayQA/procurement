import axiosInstance from "../axisInstance";

// **************************** EMPLOYEE MANAGEMENT **************************** //
// Create Employee
export const createEmployee = async (formData) => {
  const response = await axiosInstance.post("create-user", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Employee
export const updateEmployee = async (id, formData) => {
  const response = await axiosInstance.put(`update-user/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Employee
export const deleteEmployee = async (id) => {
  const response = await axiosInstance.put(`delete-user/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** EMPLOYEE TRANSFER MASTER **************************** //
// Create Employee Transfer
export const createTransfer = async (formData) => {
  const response = await axiosInstance.post("create-transfer", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Employee Transfer
export const updateTransfer = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`update-transfer/${id}`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Get Employee Transfer by ID
export const getTransferById = async (id) => {
  const response = await axiosInstance.post(`get-transfer-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Employee Transfer List
export const getAllTransfer = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-transfer-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Employee Transfer
export const deleteTransfer = async (id) => {
  const response = await axiosInstance.put(`delete-transfer/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
