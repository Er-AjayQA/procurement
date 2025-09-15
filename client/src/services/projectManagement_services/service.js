import axiosInstance from "../axisInstance";

// **************************** PROJECT MANAGEMENT **************************** //
// Create Project
export const createProject = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-project/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Project
export const updateProject = async (selectedEntity, id, formData) => {
  const response = await axiosInstance.put(
    `update-event/${selectedEntity}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Project Status
export const updateProjectStatus = async (id, formData) => {
  const response = await axiosInstance.put(
    `update-project-status/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Project by ID
export const getProjectById = async (id) => {
  const response = await axiosInstance.get(`get-project-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Projects Details
export const getAllProjectsList = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-projects-details/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Project
export const deleteProject = async (id) => {
  const response = await axiosInstance.put(`delete-project/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** PROJECT USER MAPPING **************************** //
// Add User To Project
export const addUserToProject = async (selectedEntity, id, formData) => {
  const response = await axiosInstance.post(
    `add-user-to-project/${selectedEntity}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Remove User From Project
export const removeUserFromProject = async (selectedEntity, id, formData) => {
  const response = await axiosInstance.put(
    `remove-user-from-project/${selectedEntity}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Assigned Users
export const getProjectsAllAssignedUsers = async (selectedEntity, id) => {
  const response = await axiosInstance.post(
    `get-all-assigned-users-for-project/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
