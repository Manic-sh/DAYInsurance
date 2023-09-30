import React, { useState,useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/system/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MotorCategories from "../Forms/motorCategories";
import CarManufacturers from "../Forms/carManufacturer";
import VehicleModels from "../Forms/vehicleModels";
import VehicleVariants from "../Forms/vehicleVariants";
import RegistrationYears from "../Forms/registrationYears";
import CityAndRto from "../Forms/cityAndRto";
import FillYourDetails from "../Forms/fillYourDetails";
import { EventEmitter } from "../../../services/events";
import CarInsurance from "../../../assets/images/CarInsurance.png"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

const Motor = (props) => {
  const { store } = props;
  const [pageNumber, setPage] = useState(1);

  function handleChange() {
    setPage(store.page.pageNumber);
  }
  useEffect(() => {
    EventEmitter.dispatch("IsAuthenticated");
  },[])
  return (
    <Box sx={{mt: 8}} className="details_section">
      <Container maxWidth="xl">
        <Grid container sx={{ p: 0 }} spacing={2}>
          <Grid item xs={12} md={4} textAlign="center" sx={{ mt: 3, order: { md: 1, xs: 2 } }}
          >
            <Box
              component="img"
              src={CarInsurance}
              className="insurance_img img_fluid"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ height: "100%", order: { md: 2, xs: 1 } }}
          >
            <Item
              sx={{
                p: { lg: 5, md: 3, xs: 2 },
                height: "100%",
                borderRadius: 2
              }}
              className="insurance_form_block custom_style"
            >
              {
                (pageNumber === 1 && (
                <MotorCategories {...props} onChange={handleChange} />
              )) ||
                (pageNumber === 2 && (
                  <CarManufacturers {...props} onChange={handleChange} />
                )) ||
                (pageNumber === 3 && (
                  <VehicleModels {...props} onChange={handleChange} />
                )) ||
                (pageNumber === 4 && (
                  <VehicleVariants {...props} onChange={handleChange} />
                )) ||
                (pageNumber === 5 && (
                  <RegistrationYears {...props} onChange={handleChange} />
                )) ||
                (pageNumber === 6 && (
                  <CityAndRto {...props} onChange={handleChange} />
                )) ||
                (pageNumber === 7 && (
                  <FillYourDetails {...props} onChange={handleChange} />
                ))
                }
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Motor;
