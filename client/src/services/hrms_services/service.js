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
