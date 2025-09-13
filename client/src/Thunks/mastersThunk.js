import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllRoles } from "../services/master_services/service";

// Get All Masters Roles List Thunk
export const getAllMastersList = createAsyncThunk(
  "role/get-all-role-details",
  async ({ dispatch }) => {
    try {
      const response = await getAllRoles();

      if (response.success) {
        return {
          ...response.data,
        };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "No Records Found!";
      toast.error(errorMessage);
      throw error;
    }
  }
);
