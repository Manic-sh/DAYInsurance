import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getSnapshot } from "mobx-state-tree";
const VehicleTabDetails = (props) => {
  const { store } = props;
  const saveDetails = store.insurance.getSaveDetails();
  const HeaderDetailValues = store.insurance.getHeaderDetails();
  const getVehicleDetails = getSnapshot(store.proposal.vehicleDetails);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Manufacturer</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{HeaderDetailValues.manufacturer}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Vehicle</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{HeaderDetailValues.modelName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Variant</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{HeaderDetailValues.variantName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Fuel</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{HeaderDetailValues.fuel}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Cubic Capacity</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{HeaderDetailValues.cubicCapacity}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Registration Date</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{saveDetails.RegistrationDate}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Engine Number</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{getVehicleDetails.EngineNumber}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Chesis Number</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{getVehicleDetails.ChasisNumber}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Car Finance</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{getVehicleDetails.selectedFinancer.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Car Belong To</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{getVehicleDetails.VehicleOwnedBy === "0" ? "Company" : "Individual"}</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default VehicleTabDetails;
