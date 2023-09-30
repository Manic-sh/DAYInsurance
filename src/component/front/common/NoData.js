import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { EventEmitter } from "../../../services/events";
import NoDataImg from "../../../assets/images/not-found.svg";
const NoData = () => {
  useEffect(() => {
    EventEmitter.dispatch("IsAuthenticated");
  }, []);
  return (
    <>
      <Box sx={{ mt: 8, py: 5 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} align="center">
            <Grid item xs={12} md={8} lg={4} sx={{ mx: "auto" }}>
              <Box component="img" src={NoDataImg} className="img_fluid" />
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
                <Typography variant="h2" sx={{ color: "primary.main" }}>
                  Oops! data not found
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NoData;
