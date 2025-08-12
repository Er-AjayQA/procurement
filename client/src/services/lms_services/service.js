import axiosInstance from "../axisInstance";

// **************************** COURSES **************************** //
// Create Course Master
export const createCourse = async (formData) => {
  const response = await axiosInstance.post("create-course", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// // Update Role
// export const updateRole = async (id, formData) => {
//   const response = await axiosInstance.put(`update-role/${id}`, formData, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return response.data;
// };

// Update Status
export const updateCourseStatus = async (id) => {
  const response = await axiosInstance.put(`update-course-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Course by ID
export const getCourseById = async (id) => {
  const response = await axiosInstance.post(`get-course-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Course List
export const getAllCourses = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-course-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
