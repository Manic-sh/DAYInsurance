import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetQueryData } from "../../../../api/dashboard/support";


const initialState = {
  data: {Report:[]}, 
  loading: true,
};

export const setQueryList = createAsyncThunk("support/setQueryList", async (data) => {
  return await apiGetQueryData(data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
});

export const QuerySlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = {}
      // console.log('statedata',state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setQueryList.pending, (state) => {
        state.data = {};
        state.loading = true;
      })
      .addCase(setQueryList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setQueryList.rejected, (state) => {
        state.data = {};
        state.loading = false;
      });
  },
});

export const { reset } = QuerySlice.actions;

export default QuerySlice.reducer;
