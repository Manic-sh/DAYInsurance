import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { get } from "lodash";
import toUpper from "lodash/toUpper";
import useAuth from "../../../hooks/useAuth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

import logo from "../../../assets/images/logo/logo.png";
// import { EventEmitter } from "../../../services/events";
import QuotesHeader from "../Quotes/navigation/Header";
import Login from "./Login";
import TalkExpert from "./TalkExpert";
import AuthMenu from "./AuthMenu";

const Header = (props) => {
  const { Auth } = useAuth();

  let navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const handleChange = (value) => {
    props.handleChange(value);
  };

  const handleSort = (value) => {
    props.handleSort(value);
  };



  return (
    <>
      <Box sx={{ mb: 8 }} className="main_header custom_style">
        <AppBar
          position="fixed"
          sx={{
            color: "primary.main",
            bgcolor: "#fff",
          }}
          className="appbar"
        >
          <Container maxWidth="full">
            <Toolbar sx={{ py: "5px", px: 0, justifyContent: "space-between" }}>
              <Box
                src={logo}
                sx={{ maxWidth: "85px", cursor: "pointer" }}
                component="img"
                onClick={() => navigate("/MOTOR")}
              />
              <Box>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ alignItems: "center" }}
                >
                  <TalkExpert />
                  {Auth.login ? (
                    <AuthMenu />
                  ) : (
                    <Login {...props} />
                  )}
                </Stack>
              </Box>
            </Toolbar>
          </Container>
          <CssBaseline />
          <Divider light />
          {toUpper(pathName) === "/QUOTES" && (
            <QuotesHeader
              {...props}
              handleSort={handleSort}
              sortBy={props.sortBy}
              handleChange={handleChange}
              checked={props.checked}
            />
          )}
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
