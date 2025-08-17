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

// Delete Employee
export const deleteEmployee = async (id) => {
  const response = await axiosInstance.put(`delete-user/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
