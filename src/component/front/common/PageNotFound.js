import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { EventEmitter } from "../../../services/events";
import PageNotFoundImg from "../../../assets/images/404.svg"
const PageNotFound = () => {
  const navigate = useNavigate();
  const GoHome = () => {
    navigate("/");
  };
  useEffect(() => {
    EventEmitter.dispatch("IsAuthenticated");
  }, []);
  return (
    <>
      <Box sx={{ mt: 8, py: 5 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} align="center">
            <Grid item xs={12} md={8} lg={4} sx={{ mx: "auto" }}>
              <Box component="img" src={PageNotFoundImg} className="img_fluid" />
            </Grid>
            <Grid item xs={12} mt={2}>
              <Box
                sx={{
                  bgcolor: "primary.lightBg",
                  p: 3,
                  width: "auto",
                  display: "inline-block",
                  borderRadius: "14px"
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ color: "primary.main" }}
                  gutterBottom
                >
                  Oops! Page not found
                </Typography>
                <Button variant="contained" size="large" onClick={GoHome}>
                  Go To Home
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PageNotFound;
