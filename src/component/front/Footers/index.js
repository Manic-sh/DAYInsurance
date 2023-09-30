import React from "react";
import { useLocation } from "react-router-dom";
import FrontFooter from "./Footers";
// import DashboardHeader from "../dashboard/layout/DashboardHeader";

const Header = (props,handleChange, checked, handleSort, sortBy) => {
  let location = useLocation();
  return location.pathname.split('/')[1]!=='dashboard' && <FrontFooter {...props}/>;
};

export default Header;
