import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetAddRecordVehicleId } from "../../../../api/dashboard/manage/addRecordVehicle";

const initialState = {
  data: { new_record_policy_id: '',new_record_policy_id_status: false },
  loading: true,
};

export const getAddRecordVehicleId = createAsyncThunk(
  "manage/getAddRecordVehicleId",
  async (data) => {
    return await apiGetAddRecordVehicleId(data)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
);

export const AddRecordVehicleSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = {};
      // console.log('statedata',state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddRecordVehicleId.pending, (state) => {
        state.data = {};
        state.loading = true;
      })
      .addCase(getAddRecordVehicleId.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAddRecordVehicleId.rejected, (state) => {
        state.data = {};
        state.loading = false;
      });
  },
});

export const { reset } = AddRecordVehicleSlice.actions;

export default AddRecordVehicleSlice.reducer;
