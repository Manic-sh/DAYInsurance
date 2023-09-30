import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const HeaderDetail = (props) => {
  const { store } = props;
  console.log('props>>>>>>',store);
  const HeaderDetailValues = store.insurance.getHeaderDetails();
  const SaveDetailValues = store.insurance.getSaveDetails();

  console.log('HeaderDetailValues',HeaderDetailValues);
  console.log('SaveDetailValues',SaveDetailValues);
  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        color="primary.main"
        sx={{ fontSize: { md: ".95rem", xs: "14px" }, mr: 2 }}
      >
        {`${HeaderDetailValues.manufacturer} | ${HeaderDetailValues.modelName} | ${HeaderDetailValues.variantName} | ${HeaderDetailValues.fuel} ( ${HeaderDetailValues.cubicCapacity} cc )`}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
          flexWrap: "wrap",
          justifyContent: "start"
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.primary"
          component="span"
          sx={{ fontSize: { md: ".94rem", xs: "14px" } }}
        >
          {HeaderDetailValues.motorCategory}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Typography
          variant="subtitle2"
          color="text.primary"
          component="span"
          sx={{ fontSize: { md: ".94rem", xs: "14px" } }}
        >
          {HeaderDetailValues.year}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Typography
          variant="subtitle2"
          color="text.primary"
          component="span"
          sx={{ fontSize: { md: ".94rem", xs: "14px" } }}
        >
          {`${HeaderDetailValues.RTO.FullRtoCode} ${HeaderDetailValues.RTO.RTOName}`}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Typography
          variant="subtitle2"
          color="text.primary"
          component="span"
          sx={{ fontSize: { md: ".94rem", xs: "14px" } }}
        >
          NCB:{" "}
          {SaveDetailValues.IsClaimMade
            ? "YES"
            : `NO ${SaveDetailValues.NCBDiscount}%`}
        </Typography>
      </Box>
    </>
  );
};

export default HeaderDetail;
