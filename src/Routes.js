import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/front/Headers";

import NoData from "./component/front/common/NoData";
import PageNotFound from "./component/front/common/PageNotFound";
import Thankyou from "./component/front/Proposal/Thankyou";

const Footer = lazy(() => import("./component/front/Footers"));
const Home = lazy(() => import("./component/front/Home"));
const Motor = lazy(() => import("./component/front/Motor"));
const Proposal = lazy(() => import("./component/front/Proposal"));

const Quotes = lazy(() => import("./component/front/Quotes"));
const DirectQuotes = lazy(() => import("./component/front/DirectQuotes"));

const PrivateRoute = lazy(() => import("./auth/PrivateRoute"));
const PublicRoute = lazy(() => import("./auth/PublicRoute"));

const Dashboard = lazy(() => import("./pages/dashboard"));
const PolicyList = lazy(() => import("./pages/dashboard/reports/PolicyList"));
const ProfileSetting = lazy(() => import("./pages/dashboard/manage/ProfileSetting"));
const PasswordChange = lazy(() => import("./pages/dashboard/manage/PasswordChange"));
const AddRecordPolicy = lazy(() => import("./pages/dashboard/manage/AddRecordPolicy"));
const AddRecordVehicle = lazy(() => import("./pages/dashboard/manage/AddRecordVehicle"));
const HoldPolicy = lazy(() => import("./pages/dashboard/manage/HoldPolicy"));
const WriteUs = lazy(() => import("./pages/dashboard/support/WriteUs"));
const QueryStatus = lazy(() => import("./pages/dashboard/support/QueryStatus"));

const RoutePath = (props) => {
  const [checked, setChecked] = useState(false);
  const [sortBy, setShortBy] = useState("");
  const handleChange = (value) => {
    setChecked(value);
  };
  const handleSort = (value) => {
    setShortBy(value);
  };

  return (
    <>
        <Header
          {...props}
          handleChange={handleChange}
          checked={checked}
          handleSort={handleSort}
          sortBy={sortBy}
        />
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
                fontFamily: "cursive",
                backgroundColor: "#eaeef6",
                color: "#000",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    position: "absolute",
                    top: "-40px",
                    right: "-27px",
                    animation: "rotate .2s linear infinite",
                  }}
                >
                  <img
                    src={"./img/Gear_loader.svg"}
                    alt="gear_loader"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>Loading Please wait...</p>
                  <div style={{ width: "50px", height: "50px" }}>
                    <img
                      src={"./img/Gear_loader.svg"}
                      alt="gear_loader"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <Routes>
            <Route exact path="/*" element={<PrivateRoute {...props}/>}>
              <Route exact path="dashboard" element={<Dashboard {...props} />} />
              <Route exact path="dashboard/policies/list" element={<PolicyList {...props} />} />
              <Route exact path="dashboard/manage/profile" element={<ProfileSetting {...props} />} />
              <Route exact path="dashboard/manage/password-change" element={<PasswordChange {...props} />} />
              <Route exact path="dashboard/manage/add-policy" element={<AddRecordPolicy {...props} />} />
              <Route exact path="dashboard/manage/add-vehicle" element={<AddRecordVehicle {...props} />} />
              <Route exact path="dashboard/manage/hold-policy" element={<HoldPolicy {...props} />} />
              <Route exact path="dashboard/support/write-us" element={<WriteUs {...props} />} />
              <Route exact path="dashboard/support/query-status" element={<QueryStatus {...props} />} />
              <Route path="*" element={<PageNotFound {...props} />} />
            </Route>

            <Route path="/*" element={<PublicRoute {...props} handleChange handleSort checked sortBy />}>
              <Route index element={<Home />} />
              <Route index path="MOTOR" element={<Motor {...props} />} />
              <Route
                path="Quotes"
                element={<Quotes {...props} sortBy={sortBy} />}
              />
              <Route path="Proposal" element={<Proposal {...props} />} />
              <Route
                path="ResultPaymentStatus"
                element={<Thankyou {...props} />}
              />
              <Route path="No-data" element={<NoData {...props} />} />
              <Route path="getQuotes" element={<DirectQuotes {...props} />} />
              <Route path="*" element={<PageNotFound {...props} />} />
            </Route>
          </Routes>
          <Footer/>
        </Suspense>
    </>
  );
};
export default RoutePath;
