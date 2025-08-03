import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeDetails: null,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeDetails: (state, action) => {
      state.employeeDetails = action.payload.data;
    },
  },
});

export const { setEmployeeDetails } = employeeSlice.actions;
export default employeeSlice.reducer;
