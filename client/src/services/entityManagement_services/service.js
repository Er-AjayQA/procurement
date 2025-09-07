import axiosInstance from "../axisInstance";

// **************************** ENTITY CONFIG MANAGEMENT **************************** //
// Create Entity
export const createEntity = async (formData) => {
  const response = await axiosInstance.post("create-entity", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Entity
export const updateEntity = async (id, formData) => {
  const response = await axiosInstance.put(`update-entity/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Entity Status
export const updateEntityStatus = async (id, formData) => {
  const response = await axiosInstance.put(
    `update-entity-status/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Entity by ID
export const getEntityById = async (id) => {
  const response = await axiosInstance.get(`get-entity-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Entity Details
export const getAllEntityList = async (formData) => {
  const response = await axiosInstance.post(
    `get-all-entity-details`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Entity
export const deleteEntity = async (id) => {
  const response = await axiosInstance.put(`delete-entity/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
