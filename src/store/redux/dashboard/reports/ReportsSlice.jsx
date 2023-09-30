import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetReportsData } from "../../../../api/dashboard/reports/reports";


const initialState = {
  data: {Report:[]}, 
  loading: true,
};

export const setReportsData = createAsyncThunk("reports/setReportsData", async (data) => {
  return await apiGetReportsData(data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
});

export const ReportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = {}
      // console.log('statedata',state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setReportsData.pending, (state) => {
        state.data = {};
        state.loading = true;
      })
      .addCase(setReportsData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setReportsData.rejected, (state) => {
        state.data = {};
        state.loading = false;
      });
  },
});

export const { reset } = ReportsSlice.actions;

export default ReportsSlice.reducer;
