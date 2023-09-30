import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getSnapshot } from "mobx-state-tree";
import React, { useState, useEffect } from "react";

const VehicleModels = (props) => {
  const { store } = props;
  store.insurance.fetchRTO();
  const motorCategory = store.insurance.getMotorCategory();
  const vehicleModels = getSnapshot(store.insurance.vehicleModels);
  const [vehicleModelsFiltered, setVehicleModels] = useState(vehicleModels);
  const vehicleManufacturerSelected =
    store.insurance.vehicleManufacturerSelected;

  const [modelSelected, setModelSelected] = useState(
    store.insurance.vehicleModelSelected
  );
  function handleChange(e) {
    setModelSelected(e.target.value);
    const regex = new RegExp(e.target.value.toUpperCase());
    const res = vehicleModels.filter((item) =>
      item.VehicleName.toUpperCase().match(regex)
    );
    setVehicleModels(res);
  }

  async function fetchVehicleVariants(value) {
    await store.insurance.setVehicleModelSelected(value);
    const res = await store.insurance.fetchVehicleVariants(
      value.VehicleID,
      motorCategory
    );
    await store.insurance.setVehicleVariants(res);
    store.page.changePage(4);
    props.onChange(4);
  }

  const goBack = () => {
    store.page.changePage(2);
    props.onChange(2);
  };

  useEffect(() => {
    function actionFilterData() {
      const regex = new RegExp(store.insurance.vehicleModelSelected.toUpperCase());
      const res = vehicleModels.filter((item) =>
        item.VehicleName.toUpperCase().match(regex)
      );
      setVehicleModels(res);
    }
    actionFilterData();
  }, [vehicleModels,store]);

  return (
    <>
      <Grid
        container
        sx={{
          alignItems: "start",
          mb: 2,
          flexDirection: "row",
          justifyContent: "start",
          flexWrap: "nowrap",
        }}
      >
        <ArrowCircleLeftOutlinedIcon
          onClick={goBack}
          sx={{
            color: "primary.main",
            mr: 1,
            fontSize: { xs: "25px", sm: "30px" },
            cursor: "pointer",
          }}
        />
        <Typography
          variant="h4"
          color="text.secondary"
          className="main_heading"
          sx={{ textAlign: "left" }}
        >
          {`Which Modal of ${vehicleManufacturerSelected} do you have ?`}
        </Typography>
      </Grid>
      <TextField
        fullWidth
        value={modelSelected}
        onChange={handleChange}
        label={`Select ${motorCategory} Manufacturer`}
        InputProps={{
          type: "search",
        }}
      />

      <Grid
        container
        className="custom_style inner_scrollbar"
        spacing={2}
        p={1}
        mt={1}
        sx={{ maxHeight: "300px", overflowY: "scroll" }}
      >
        {vehicleModels &&
          vehicleModelsFiltered.map((item) => (
            <Grid
              item
              md={3}
              xs={6}
              onClick={() => fetchVehicleVariants(item, motorCategory)}
              key={item.VehicleID}
            >
              <Box
                component="div"
                className="custom_boxshadow"
                sx={{
                  p: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  height: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  component="p"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {item.VehicleName.toLowerCase()}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default VehicleModels;
