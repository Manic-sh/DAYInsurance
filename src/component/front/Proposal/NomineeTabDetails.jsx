import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getSnapshot } from "mobx-state-tree";

const NomineeTabDetails = (props) => {
  const { store } = props;
  const getNomineeDetails = getSnapshot(store.proposal.nomineeDetails);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px"
            }}
          >
            <Typography variant="body2" gutterBottom>
              Nominee Name
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getNomineeDetails.NomineeName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px"
            }}
          >
            <Typography variant="body2" gutterBottom>
              Nominee Relation
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getNomineeDetails.NomineeRelationship}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="div"
            sx={{
              backgroundColor: "secondary.light",
              p: "10px",
              borderRadius: "8px"
            }}
          >
            <Typography variant="body2" gutterBottom>
              Age
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontWeight: 500 }}
              gutterBottom
            >
              {getNomineeDetails.NomineeAge}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default NomineeTabDetails;
