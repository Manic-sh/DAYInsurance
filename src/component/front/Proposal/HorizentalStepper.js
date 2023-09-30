import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { get } from "lodash";
import { getSnapshot } from "mobx-state-tree";
import Moment from "moment";
import React, { useState } from "react";
import { EventEmitter } from "../../../services/events";

import AddressDetails from "./AddressDetails";
import NomineeDetails from "./NomineeDetails";
import OwnerDetails from "./OwnerDetails";
import ShowDetail from "./ShowDetail";
import VehicleDetails from "./VehicleDetails";

const steps = ["Owner", "Address", "Nominee", "Vehicle", "Proposal"];

export default function HorizontalLinearStepper(props) {
  const { item, store, itemUpdateCall } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [loader, setLoader] = useState(false);

  let ownerDetails = getSnapshot(store.proposal.ownerDetails);
  const VehicleOwnedBy = get(ownerDetails, "VehicleOwnedBy", "1");

  const goNext = async (values, index) => {
    const EnqNo = store.insurance.getEnqNo();
    let obj = values;
    if (index === 1) {
      obj.DOB = Moment(values.DOB, ["MM/DD/YYYY"]).format("YYYY/MM/DD");
      obj.EnquiryNo = EnqNo;
      await store.proposal.setOwnerDetails(obj);
      await store.proposal.saveProposalDetails(obj);
    } else if (index === 2) {
      obj.EnquiryNo = EnqNo;
      await store.proposal.setAddressDetails(obj);
      delete obj.state;
      delete obj.city;
      await store.proposal.saveProposalDetails(obj);
    } else if (index === 3) {
      obj.EnquiryNo = EnqNo;
      obj.NomineeName = obj.firstName + " " + obj.lastName;
      await store.proposal.setNomineeDetails(obj);
      delete obj.firstName;
      delete obj.lastName;
      await store.proposal.saveNomineeDetails(obj);
    } else if (index === 4) {
      setLoader(true);
      obj.EnquiryNo = EnqNo;
      obj.InstitutionCode = obj.selectedFinancer.CODE;
      obj.InstitutionName = obj.selectedFinancer.name;
      obj.VehicleOwnedBy = VehicleOwnedBy;
      obj.TPStartDate = Moment(values.TPStartDate).format("YYYY/MM/DD");
      obj.TPEndDate = Moment(values.TPEndDate).format("YYYY/MM/DD");
      obj.PreRegistrationNumber = obj.RegistrationNumber;
      obj.RegistrationNumber = obj.RtoCode + obj.RegistrationNumber;
      await store.proposal.setVehicleDetails(obj);
      await store.proposal.saveVehicleDetails(obj);
      // Get Plan Terms and condition
      const tnc = await store.proposal.getPlanTnCData(EnqNo, item.PlanId);
      setTimeout(async () => {
        await store.proposal.fetchRehitePremium(item);
        EventEmitter.dispatch("tncData", tnc.data);
        activeStep === 3
          ? EventEmitter.dispatch("showPaymentMethod", true)
          : EventEmitter.dispatch("showPaymentMethod", false);
        itemUpdateCall();
        setLoader(false);
      }, 10000);
    }
    setActiveStep(() => index);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    activeStep === 3
      ? EventEmitter.dispatch("showPaymentMethod", true)
      : EventEmitter.dispatch("showPaymentMethod", false);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      className="custom_boxshadow2"
      sx={{
        width: "100%",
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    color: "#000",
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ pt: 2, minHeight: "455px" }}>
            {activeStep === 0 && (
              <OwnerDetails
                {...props}
                goNext={goNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 1 && (
              <AddressDetails
                {...props}
                goNext={goNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 2 && (
              <NomineeDetails
                {...props}
                goNext={goNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 3 && (
              <VehicleDetails
                {...props}
                goNext={goNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 4 && (
              <ShowDetail {...props} goNext={goNext} handleBack={handleBack} />
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
