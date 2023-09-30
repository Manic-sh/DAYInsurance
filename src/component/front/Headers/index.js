import React from "react";
import { useLocation } from "react-router-dom";
import FrontHeader from "./Header";
// import DashboardHeader from "../dashboard/layout/DashboardHeader";

const Header = (props,handleChange, checked, handleSort, sortBy) => {
  let location = useLocation();


  return location.pathname.split('/')[1]!=='dashboard' && <FrontHeader {...props} {...handleChange} {...checked} {...handleSort} {...sortBy}/>;
};

export default Header;
