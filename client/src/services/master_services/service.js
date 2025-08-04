import axiosInstance from "../axisInstance";

// Get All Master Roles List
export const getAllRoles = async () => {
  const response = await axiosInstance.post("get-all-role-details", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
