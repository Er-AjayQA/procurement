import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleAccessService } from "../services/rbac_services/service";
import { setAssignedModules } from "../ReduxToolkit/authSlice";
import { toast } from "react-toastify";

// Get All Assigned Modules Thunk
export const getAllAssignedModules = createAsyncThunk(
  "login/get-all-assigned-module",
  async (id, { dispatch }) => {
    try {
      const response = await moduleAccessService(id);

      if (response.success) {
        dispatch(setAssignedModules({ assignedModules: response.data }));

        return {
          ...response.data,
        };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "No Modules Assigned!";
      toast.error(errorMessage);
      throw error;
    }
  }
);
