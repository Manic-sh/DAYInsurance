import React from "react";
// import Header from "../Headers";
// import Footer from "../Footers";
// import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Layout from '../layout/front';

const PublicRoute = (props) => {
  return (
    <>
      <Layout {...props}><Outlet /></Layout>
    </>
  );
};

export default PublicRoute;
