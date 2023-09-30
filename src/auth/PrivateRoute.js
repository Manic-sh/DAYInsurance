import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Cookies } from "react-cookie";

import Layout from "../layout/dashboard";


const PrivateRoute = ({ component: Component, ...props }) => {
  const { Auth, AuthActionLogout } = useAuth();
  const location = useLocation();
  const cookie = new Cookies();
  const access_token = cookie.get("access_token");

  useEffect(() => {
    !access_token && AuthActionLogout();
  });
  return Auth?.login ? (
    <Layout {...props}>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
