import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getSnapshot } from "mobx-state-tree";

const PersonalTabDetails = (props) => {
  const { store } = props;

  const getOwnerDetails = getSnapshot(store.proposal.ownerDetails);
  const getAddressDetails = getSnapshot(store.proposal.addressDetails);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Full Name
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getOwnerDetails.CustomerName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Contact Number
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getOwnerDetails.MobileNo}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Gender
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getOwnerDetails.Gender === "M" ? "Male" : "Femal"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Email
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getOwnerDetails.EmailId}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Birth Date
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getOwnerDetails.DOB}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Maritial Status
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getOwnerDetails.MaritalStatus === "U" ? "UnMarried" : "Married"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Occupation
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getOwnerDetails.Occupation}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Pan Number
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getAddressDetails.PanNumber}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              GST
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getOwnerDetails.GST}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Aadhar Number
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getAddressDetails.AadharNo}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Address 1
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getAddressDetails.Address1}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Address 2
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getAddressDetails.Address2}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Address 3
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getAddressDetails.Address3}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              State
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getAddressDetails?.state?.StateName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              City
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getAddressDetails?.city?.CityName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" gutterBottom>
              Pincode
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getAddressDetails.PostCode}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalTabDetails;
