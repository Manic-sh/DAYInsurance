import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { Outlet } from 'react-router-dom';
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import ThemeProvider from "./theme";

import useAuth from "../../hooks/useAuth";
import { setDashboardData } from "../../store/redux/dashboard/DashboardSlice";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  backgroundColor:'rgb(249, 250, 251)',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { Auth } = useAuth();

  /*eslint-disable */
  useEffect(() => {
    dispatch(setDashboardData({ Userid: Auth.data.Userid }));
  }, []);
/* eslint-enable */

  return (
    <ThemeProvider>
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar
          isOpenSidebar={open}
          onCloseSidebar={() => setOpen(false)}
        />
        <MainStyle>{children}</MainStyle>
      </RootStyle>
    </ThemeProvider>
  );
};
export default Layout;
