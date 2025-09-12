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

// Assign Modules Service
export const assignModuleToUserService = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `/assign-module/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Get RBAC Access Module Service
export const moduleAccessService = async (selectedEntity, id) => {
  const response = await axiosInstance.post(
    `/get-all-assigned-module/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Get RBAC All Users Access Module Service
export const allUsersModuleAccessService = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `/get-all-users-assigned-module/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Check if User Have Already Assigned
export const checkUserAlreadyAssigned = async (selectedEntity, id) => {
  const response = await axiosInstance.post(
    `/check-user-already-assigned/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Revoke User Permissions
export const revokeUserPermissions = async (selectedEntity, id) => {
  const response = await axiosInstance.post(
    `/revoke-user-permissions/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
