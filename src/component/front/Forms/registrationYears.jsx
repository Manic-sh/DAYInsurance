import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { getSnapshot } from "mobx-state-tree";

const RegistrationYears = (props) => {
  const { store } = props;
  const insurance = getSnapshot(store.insurance);
  const isBrandNewVehicle = insurance.isBrandNewVehicle;
  store.insurance.fetchRTO();
  const now = new Date().getUTCFullYear();
  let years = Array(now - (now - 15))
    .fill("")
    .map((v, idx) => now - idx);

  isBrandNewVehicle && handleSelect(years[0]);

  async function handleSelect(value) {
    store.insurance.setYear(value);
    store.page.changePage(6);
    props.onChange(6);
  }
  const goBack = () => {
    store.page.changePage(4);
    props.onChange(4);
  }

  return (
    <>
      <Grid
        container
        sx={{
          alignItems: "start",
          mb: 2,
          flexDirection: "row",
          justifyContent: "start",
          flexWrap: "nowrap"
        }}
      >
        <ArrowCircleLeftOutlinedIcon
          onClick={goBack}
          sx={{
            color: "primary.main",
            mr: 1,
            fontSize: { xs: "25px", sm: "30px" },
            cursor: "pointer"
          }}
        />
        <Typography
          variant="h4"
          color="text.secondary"
          className="main_heading"
          sx={{ textAlign: "left" }}
        >
           Select Vehicle Registration Year
        </Typography>
      </Grid>
      <Grid container className="custom_style inner_scrollbar" spacing={2} p={1} mt={1} sx={{maxHeight:'400px' , overflowY: {xs:'scroll', sm:'auto'}}}>
        {years.map((year) => (
          <Grid key={year} item md={4} xs={6}>
            <Box
              onClick={() => handleSelect(year)}
              component="div"
              className="custom_boxshadow"
              sx={{ p: 2, borderRadius: "8px", cursor: "pointer" }}
            >
              <Typography variant="body1" component="p">
                {year}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RegistrationYears;
