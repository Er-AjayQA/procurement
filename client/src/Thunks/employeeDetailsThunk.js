import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getEmployeeDetails } from "../services/employeeDetails_services/services";
import { setEmployeeDetails } from "../ReduxToolkit/employeeSlice";

export const getEmployeeData = createAsyncThunk(
  "employee/get-user-details",
  async (id, { dispatch }) => {
    try {
      const response = await getEmployeeDetails(id);

      if (response.data.success) {
        dispatch(setEmployeeDetails({ data: response.data.data[0] }));
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unable to Get Employee Details!";
      toast.error(errorMessage);
      throw error;
    }
  }
);
