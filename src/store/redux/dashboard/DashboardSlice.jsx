import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { get, isEmpty } from "lodash";
// import { toast } from "react-toastify";
// import cookie from "components/hooks/cookie";
import { apiGetDashboardData } from "../../../api/dashboard/dashboard";

// const authToken = cookie.get("auth_token");
// const roleType = cookie.get("role_type");

const initialState = {
  data: {test:1}, 
  loading: true,
};

export const setDashboardData = createAsyncThunk("dashboard/setDashboardData", async (data) => {
  return await apiGetDashboardData(data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
});

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = {}
      // console.log('statedata',state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setDashboardData.pending, (state) => {
        state.data = {};
        state.loading = true;
      })
      .addCase(setDashboardData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setDashboardData.rejected, (state) => {
        state.data = {};
        state.loading = false;
      });
  },
});

export const { reset } = DashboardSlice.actions;

export default DashboardSlice.reducer;
