import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import size from "lodash/size";
import { getSnapshot } from "mobx-state-tree";
import React, { useState } from "react";

const CarManufacturers = (props) => {
  const { store } = props;
  store.insurance.setVehicleModelSelected('');
  const categoryName = store.insurance.getMotorCategory();
  const manufacturers = getSnapshot(store.insurance.manufacturers);
  const manufacturersToShow = manufacturers.filter((item) => {
    return item.IsDisplay;
  });
  const MakeId = store.insurance.MakeId;
  let selectedValue = manufacturers.find(
    (item) => item.ManufacturerID === MakeId
  );
  selectedValue = selectedValue ? selectedValue : null;
  const [ManufacturerSelected, setManufacturerSelected] =
    useState(selectedValue);

  async function fetchVehicleModel(value) {
    const motorCategory = store.insurance.getMotorCategory();
    await store.insurance.fetchVehicleModel(
      value.ManufacturerID,
      motorCategory
    );
    // await store.insurance.setVehicleModels(res);
    await store.insurance.setVehicleManufacturerSelected(value);
    store.page.changePage(3);
    props.onChange(3);
  }
  async function onTagsChange(value) {
    setManufacturerSelected(value);
  }
  const goBack = () => {
    store.page.changePage(1);
    props.onChange(1);
  };
  // const updateSteps = () => {
  //   store.page.changePage(3);
  //   props.onChange(3);
  // };

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
          Which {categoryName} do you Own ?
        </Typography>
      </Grid>
      <Autocomplete
        id="free-solo-2-demo"
        name="Manufacturer"
        fullWidth
        value={ManufacturerSelected}
        disablePortal
        onChange={(e,value)=>{
          onTagsChange(value);
          fetchVehicleModel(value);
        }}
        // onClose={() => updateSteps()}
        options={manufacturers.map((option) => option)}
        getOptionLabel={(option) => option.Manufacturername}
        isOptionEqualToValue={(option, value) => true}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Select ${categoryName} Manufacturer`}
            InputProps={{
              ...params.InputProps,
              type: "search"
            }}
          />
        )}
      />

      <Grid
        container
        rowSpacing={2}
        columnSpacing={3}
        p={1}
        boxShadow={0}
        className="inner_scrollbar"
        mt={1}
        sx={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {size(manufacturersToShow) > 0 &&
          manufacturersToShow.map((item) => (
            <Grid key={item.ManufacturerID} item xs={6} sm={3} md={2}>
              <Card
                onClick={() => fetchVehicleModel(item)}
                className="custom_boxshadow"
                sx={{
                  borderRadius: "8px",
                  height: "100%",
                  p: "4px",
                  cursor: "pointer"
                }}
              >
                <Box
                  component="div"
                  sx={{
                    width: { sm: "60px", xs: "50px" },
                    height: { sm: "50px", xs: "50px" },
                    p: "5px",
                    textAlign: "center",
                    mx: "auto"
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`${item.LogoPath}?w=248&fit=crop&auto=format`}
                    alt={item.Manufacturername}
                    loading="lazy"
                    className="img_fluid"
                    sx={{ objectFit: "contain", height: "100%" }}
                  />
                </Box>
                <CardContent sx={{ padding: "0px !important" }}>
                  <Typography
                    variant="body1"
                    component="p"
                    mb={0}
                    sx={{
                      color: "text.primary",
                      textTransform: "capitalize",
                      fontSize: "14px",
                      fontWeight: 500
                    }}
                  >
                    {item.Manufacturername.toLowerCase()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default CarManufacturers;
