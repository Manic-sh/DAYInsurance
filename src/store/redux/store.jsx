import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/DashboardSlice";
import reportsReducer from "./dashboard/reports/ReportsSlice";
import AddRecordPolicySlice from "./dashboard/manage/AddRecordPolicySlice";
import AddRecordVehicleSlice from "./dashboard/manage/AddRecordVehicleSlice";
import QuerySlice from "./dashboard/support/QuerySlice";

// const store = configureStore({
//   reducer: {
//     dashboard_data: dashboardReducer,
//   },
// });

const combinedReducer = combineReducers({
  dashboard_data: dashboardReducer,
  reports_data: reportsReducer,
  addRecordPolicyData: AddRecordPolicySlice,
  add_record_vehicle_data: AddRecordVehicleSlice,
  query_list_data: QuerySlice,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
