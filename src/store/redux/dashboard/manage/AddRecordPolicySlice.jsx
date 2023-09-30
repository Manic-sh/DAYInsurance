import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetInsurerList,
  apiGetProductList,
} from "../../../../api/dashboard/manage/addRecordPolicy";

const initialState = {
  data: { productList: [], insurerList: [] },
  loading: true,
  loadingProductList: true,
  loadingInsurerList: true,
};

export const getInsurerList = createAsyncThunk(
  "manage/getInsurerList",
  async (data) => {
    return await apiGetInsurerList(data)
      .then(function (response) {
        return response.data.Insurer;
      })
      .catch(function (error) {
        return error;
      });
  }
);

export const getProductList = createAsyncThunk(
  "manage/getProductList",
  async (data, getState) => {
    try {
      const state = getState.getState();
      console.log("state", state);
      return state.addRecordPolicyData.data.productList.length > 0
        ? state.addRecordPolicyData.data.productList
        : await apiGetProductList(data)
            .then(function (response) {
              return response.data.Products;
            })
            .catch(function (error) {
              return error;
            });
    } catch (er) {
      console.log("er", er);
    }
  }
);

export const AddRecordPolicySlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = initialState;
      // console.log('statedata',state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.data.productList = [];
        state.loading = true;
        state.loadingProductList = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.data.productList = action.payload;
        state.loading = false;
        state.loadingProductList = false;
      })
      .addCase(getProductList.rejected, (state) => {
        state.data.productList = [];
        state.loading = false;
        state.loadingProductList = false;
      })
      .addCase(getInsurerList.pending, (state) => {
        state.data.insurerList = [];
        state.loading = true;
        state.loadingInsurerList = true;
      })
      .addCase(getInsurerList.fulfilled, (state, action) => {
        state.data.insurerList = action.payload;
        state.loading = false;
        state.loadingInsurerList = false;
      })
      .addCase(getInsurerList.rejected, (state) => {
        state.data.insurerList = [];
        state.loading = false;
        state.loadingInsurerList = false;
      });
  },
});

export const { reset } = AddRecordPolicySlice.actions;

export default AddRecordPolicySlice.reducer;



// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
//   tagTypes: ['Post'],
//   endpoints: builder => ({
//     // omit other endpoints

//     getUsers: builder.query({
//       query: () => '/users'
//     })
//   })
// })

// export const {
//   useGetPostsQuery,
//   useGetPostQuery,
//   useGetUsersQuery,
//   useAddNewPostMutation,
//   useEditPostMutation
// } = apiSlice