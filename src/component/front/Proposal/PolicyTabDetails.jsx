import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getSnapshot } from "mobx-state-tree";
const PolicyTabDetails = (props) => {
  const {store} = props;
  const selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
  const getVehicleDetails = getSnapshot(store.proposal.vehicleDetails);
  const SaveDetailValues = store.insurance.getSaveDetailRequest();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Policy For</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{SaveDetailValues.VehicleType === "0" ? "Public" : SaveDetailValues.VehicleType === "1" ? "Private" : "Public & Private"}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Previous Insurance</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{getVehicleDetails.PreviousInsurer.FullName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Previous Policy Number</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{getVehicleDetails.PreviousPolicyNumber}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Policy Type</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{SaveDetailValues.CoverType === "0" ? "Comprehensive" : SaveDetailValues.CoverType === "2" ? "Third Party" : "standalone OD"}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>IDV</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{`₹ ${selectedItem.SupplierIdv}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Service Tax</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{`₹ ${selectedItem.ServiceTax}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box component="div" sx={{backgroundColor: 'secondary.light', p: '10px', borderRadius: '8px'}}>
            <Typography variant="body2" gutterBottom>Premium</Typography>
            <Typography variant="body1" color="text.primary" sx={{fontWeight: 500}} gutterBottom>{`₹ ${selectedItem.FinalPremium}`}</Typography>
          </Box>
        </Grid>
        
      </Grid>
    </>
  );
};

export default PolicyTabDetails;
