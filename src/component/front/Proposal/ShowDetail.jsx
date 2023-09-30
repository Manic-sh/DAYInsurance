import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import NomineeTabDetails from "./NomineeTabDetails";
import PersonalTabDetails from "./PersonalTabDetails";
import PolicyTabDetails from "./PolicyTabDetails";
import VehicleTabDetails from "./VehicleTabDetails";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: "8px",
  marginBottom: "20px",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 30px 30px -25px rgb(65 51 183 / 25%)",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "16px", color: "text.primary" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "primary.main",
  borderRadius: "8px",
  boxShadow: "0 30px 30px -25px rgb(65 51 183 / 25%)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ShowDetail = (props) => {
  const { handleBack } = props;
  // console.log('show detail======', store);
  const [expanded, setExpanded] = React.useState();



  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <>
      <Box component="div">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{ mb: 0 }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontSize: "16px" }}
                >
                  Personal Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PersonalTabDetails {...props} />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{ mb: 0 }}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontSize: "16px" }}
                >
                  Vehicle Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <VehicleTabDetails {...props} />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{ mb: 0 }}
            >
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontSize: "16px" }}
                >
                  Nominee Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NomineeTabDetails {...props} />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              sx={{ mb: 0 }}
            >
              <AccordionSummary
                aria-controls="panel4d-content"
                id="panel4d-header"
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontSize: "16px" }}
                >
                  Policy Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PolicyTabDetails {...props} />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Button varient="outlined" onClick={() => handleBack()}>
              Back
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ShowDetail;
