import React, { useState } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { get } from "lodash";
import { Formik } from "formik";

import { getSnapshot } from "mobx-state-tree";
// import { fn } from "moment";
import * as Yup from "yup";

const VehicleDetails = (props) => {
  const { store, handleBack } = props;
  const saveDetails = store.insurance.getSaveDetails();

  const [isBrandNewVehicle] = useState(() => {
    // console.log('saveDetails',saveDetails);
    let pre_policy_ex_date = saveDetails.PreviousPolicyExpiryDate;
    let c_date = new Date();
    c_date.setHours(0);
    c_date.setMinutes(0);
    c_date.setSeconds(0);
    c_date.setDate(c_date.getDate() - 90);
    let date_result = Date.parse(c_date) >= Date.parse(pre_policy_ex_date);
    return store.insurance.getIsBrandNewVehicle() ? true : date_result;
    // console.log('pre_policy_ex_date',pre_policy_ex_date);
    // console.log('c_date',c_date);
    // console.log('date_result',date_result);
  });
  const vehicleDetails = getSnapshot(store.proposal.vehicleDetails);
  const priviousInsurer = getSnapshot(store.proposal.priviousInsurer);
  const financerDetails = getSnapshot(store.proposal.financerDetails);

  const HeaderDetailValues = store.insurance.getHeaderDetails();
  const SaveDetailValues = store.insurance.getSaveDetailRequest();
  const FullRtoCode = HeaderDetailValues.RTO.FullRtoCode.replace("-", "");

  const selectedInsurur = get(vehicleDetails, "PreviousInsurer", {});
  const selectedTPInsurer = get(vehicleDetails, "TP_InsurerList", {});
  const selectedFinancer = get(vehicleDetails, "selectedFinancer", {});

  // const getPrePolicyExpiryStatus = () => {
  //   // console.log('saveDetails',saveDetails);
  //   let pre_policy_ex_date = saveDetails.PreviousPolicyExpiryDate;
  //   let c_date = new Date();
  //   c_date.setHours(0);
  //   c_date.setMinutes(0);
  //   c_date.setSeconds(0);
  //   c_date.setDate(c_date.getDate() - 90);
  //   let date_result = Date.parse(c_date) >= Date.parse(pre_policy_ex_date);
  //   setIsBrandNewVehicle(date_result);
  //   // console.log('pre_policy_ex_date',pre_policy_ex_date);
  //   // console.log('c_date',c_date);
  //   // console.log('date_result',date_result);
  // };
  // useEffect(() => {
  //   getPrePolicyExpiryStatus();
  // }, []);

  const specialSymbolRegx = /^[A-Za-z0-9]+$/;
  const VehicleDetailSchema = Yup.object().shape({
    PreviousInsurerID: Yup.string().when("isBrandNewVehicle", {
      is: false,
      then: Yup.string().required("Previous Insurance is Required"),
    }),
    PreviousPolicyNumber: Yup.string()
      .matches(/^[A-Za-z0-9/-]+$/, "Special Symbols not allowed")
      .when("isBrandNewVehicle", {
        is: false,
        then: Yup.string().required("Previous Policy Number is Required"),
      }),
    TP_PolicyNo: Yup.string().matches(
      /^[A-Za-z0-9/-]+$/,
      "Special Symbols not allowed"
    ),
    RegistrationNumber: Yup.string()
      .when({
        is: () => {
          return !isBrandNewVehicle;
        },
        then: Yup.string()
          .required("Required Vehicle Number")
          .matches(specialSymbolRegx, "Special Symbols not allowed")
          .matches(/[0-9]{4}$/, "Last 4 Character must be number")
          // .matches(/^[A-Za-z]{1}/, "First Character must be Alphabet")
          .max(7, "Maximum 7 characters allowed")
          .min(5, "Minimum 5 characters required"),
      })
      .when({
        is: (value) => {
          return value !== undefined && value.length === 5;
        },
        then: Yup.string().matches(
          /^[A-Za-z]{1}/,
          "First Character must be Alphabet"
        ),
      })
      .when({
        is: (value) => {
          return value !== undefined && value.length === 6;
        },
        then: Yup.string().matches(
          /^[A-Za-z]{2}/,
          "Second Character must be Alphabet"
        ),
      })
      .when({
        is: (value) => {
          return value !== undefined && value.length === 7;
        },
        then: Yup.string().matches(
          /^[A-Za-z]{3}/,
          "Third Character must be Alphabet"
        ),
      }),
    zeroDepth: Yup.string().required("filed is Required"),
    EngineNumber: Yup.string()
      .matches(specialSymbolRegx, "Special Symbols not allowed")
      .required("Required Engine Number")
      .max(17, "Maximum 17 characters allowed")
      .min(4, "Minimum 4 characters required"),
    ChasisNumber: Yup.string()
      .matches(specialSymbolRegx, "Special Symbols not allowed")
      .length(17, "Max Length must be 17")
      .required("Required chasis Number"),
    IsUnderLoan: Yup.boolean().required("car Financed is Required"),
    InstitutionName: Yup.string().when("IsUnderLoan", {
      is: true,
      then: Yup.string().required("car financer is Required"),
    }),
  });

  return (
    <>
      <Formik
        initialValues={{
          PreviousInsurer: selectedInsurur,
          PreviousInsurerID: vehicleDetails.PreviousInsurerID,
          PreviousPolicyNumber: vehicleDetails.PreviousPolicyNumber,
          RegistrationNumber: vehicleDetails.PreRegistrationNumber,
          zeroDepth: vehicleDetails.zeroDepth,
          EngineNumber: vehicleDetails.EngineNumber,
          ChasisNumber: vehicleDetails.ChasisNumber,
          IsUnderLoan: vehicleDetails.IsUnderLoan,
          selectedFinancer: selectedFinancer,
          InstitutionName: vehicleDetails.InstitutionName,
          otherFinancer: vehicleDetails.otherFinancer,
          NoOfClaim: vehicleDetails.NoOfClaim,
          OwnershipTransfer: vehicleDetails.OwnershipTransfer,
          isNCBTransfer: vehicleDetails.isNCBTransfer,
          TP_InsurerList: selectedTPInsurer,
          TP_Insurer: vehicleDetails.TP_Insurer,
          TP_PolicyNo: vehicleDetails.TP_PolicyNo,
          TPStartDate: vehicleDetails.TPStartDate,
          TPEndDate: vehicleDetails.TPEndDate,
          RtoCode: FullRtoCode,
          isBrandNewVehicle: isBrandNewVehicle,
        }}
        validationSchema={VehicleDetailSchema}
        onSubmit={async (values) => {
          await props.goNext(values, 1);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2} className="vehicle-details">
              {isBrandNewVehicle === false && (
                <Grid item xs={12} sm={6} md={4}>
                  <Autocomplete
                    disablePortal
                    name="PreviousInsurerID"
                    options={priviousInsurer}
                    value={props.values.PreviousInsurer}
                    getOptionLabel={(option) =>
                      option.FullName ? option.FullName : ""
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    onChange={(e, value) => {
                      props.setFieldValue(
                        "PreviousInsurerID",
                        String(get(value, "SupplierId", ""))
                      );
                      props.setFieldValue("PreviousInsurer", value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        name="PreviousInsurerID"
                        {...params}
                        label="Previous Insurer"
                        fullWidth
                        error={
                          props.errors.PreviousInsurerID &&
                          props.touched.PreviousInsurerID
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.PreviousInsurerID &&
                          props.touched.PreviousInsurerID
                            ? props.errors.PreviousInsurerID
                            : null
                        }
                      />
                    )}
                  />
                </Grid>
              )}
              {isBrandNewVehicle === false && (
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Previous Policy Number"
                    variant="outlined"
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.PreviousPolicyNumber}
                    name="PreviousPolicyNumber"
                    error={
                      props.errors.PreviousPolicyNumber &&
                      props.touched.PreviousPolicyNumber
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.PreviousPolicyNumber &&
                      props.touched.PreviousPolicyNumber
                        ? props.errors.PreviousPolicyNumber
                        : null
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled
                  label="Registered Date"
                  variant="outlined"
                  fullWidth
                  value={saveDetails.RegistrationDate}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={props.values.RtoCode}
                  name="RtoCode"
                  sx={{ maxWidth: 80, mr: 1 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Vehicle No"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    autoComplete: "new-password",
                    maxLength: 7,
                    minLength: 5,
                  }}
                  onChange={(value) => {
                    props.setFieldValue(
                      "RegistrationNumber",
                      value.target.value.toUpperCase()
                    );
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.RegistrationNumber}
                  name="RegistrationNumber"
                  placeholder="Type something..."
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={
                    props.errors.RegistrationNumber &&
                    props.touched.RegistrationNumber
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.RegistrationNumber &&
                    props.touched.RegistrationNumber
                      ? props.errors.RegistrationNumber
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Engine Number"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    autoComplete: "new-password",
                    maxLength: 17,
                    minLength: 4,
                  }}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.EngineNumber}
                  name="EngineNumber"
                  error={
                    props.errors.EngineNumber && props.touched.EngineNumber
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.EngineNumber && props.touched.EngineNumber
                      ? props.errors.EngineNumber
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Chasis Number"
                  variant="outlined"
                  fullWidth
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.ChasisNumber}
                  name="ChasisNumber"
                  inputProps={{
                    maxLength: 17,
                  }}
                  error={
                    props.errors.ChasisNumber && props.touched.ChasisNumber
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.ChasisNumber && props.touched.ChasisNumber
                      ? props.errors.ChasisNumber
                      : null
                  }
                />
              </Grid>
              {!isBrandNewVehicle && (
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Zero Depth In Previous Policy
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.zeroDepth}
                      name="zeroDepth"
                      label="Zero Depth In Previous Policy"
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Is Car Financed
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.values.IsUnderLoan}
                    name="IsUnderLoan"
                    label="Is Car Financed"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {props.values.IsUnderLoan && (
                <Grid item xs={12} sm={6} md={4}>
                  <Autocomplete
                    disablePortal
                    clearIcon={false}
                    value={props.values.selectedFinancer}
                    name="selectedFinancer"
                    options={financerDetails}
                    renderOption={(props, option) => {
                      let x = Math.random();
                      return (
                        <li {...props} key={x}>
                          {option.name}
                        </li>
                      );
                    }}
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    onChange={(e, value) => {
                      props.setFieldValue(
                        "InstitutionName",
                        get(value, "CODE", "")
                      );
                      props.setFieldValue("selectedFinancer", value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        name="InstitutionName"
                        {...params}
                        label="Car Financer Name"
                        fullWidth
                        error={
                          props.errors.InstitutionName &&
                          props.touched.InstitutionName
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.InstitutionName &&
                          props.touched.InstitutionName
                            ? props.errors.InstitutionName
                            : null
                        }
                      />
                    )}
                  />
                </Grid>
              )}
              {props.values.InstitutionName === "Others" &&
                props.values.IsUnderLoan && (
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Other Financer Name"
                      variant="outlined"
                      name="otherFinancer"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.otherFinancer}
                    />
                  </Grid>
                )}
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    No of claims in Last YearTake
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.values.NoOfClaim}
                    label="No of claims in Last YearTake"
                    name="NoOfClaim"
                    onChange={(e) => {
                      props.setFieldValue("NoOfClaim", e.target.value);
                    }}
                  >
                    <MenuItem value={"0"}>0</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {!isBrandNewVehicle && (
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Is ownership transferred in PrevPolicy ?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.values.OwnershipTransfer}
                      label="Is ownership transferred in PrevPolicy ?"
                      name="OwnershipTransfer"
                      onChange={(e) => {
                        props.setFieldValue(
                          "OwnershipTransfer",
                          e.target.value
                        );
                      }}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    is NCB Transfer ?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.values.isNCBTransfer}
                    label="is NCB Transfer ?"
                    name="isNCBTransfer"
                    onChange={(e) => {
                      props.setFieldValue("isNCBTransfer", e.target.value);
                    }}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {SaveDetailValues.CoverType === "5" && (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <Autocomplete
                      disablePortal
                      name="TP_InsurerList"
                      options={priviousInsurer}
                      value={props.values.TP_InsurerList}
                      getOptionLabel={(option) =>
                        option.FullName ? option.FullName : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      onChange={(e, value) => {
                        props.setFieldValue(
                          "TP_Insurer",
                          String(get(value, "SupplierId", ""))
                        );
                        props.setFieldValue("TP_InsurerList", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="TP_InsurerList"
                          {...params}
                          label="TP Issued From"
                          fullWidth
                          error={
                            props.errors.TP_Insurer && props.touched.TP_Insurer
                              ? true
                              : false
                          }
                          helperText={
                            props.errors.TP_Insurer && props.touched.TP_Insurer
                              ? props.errors.TP_Insurer
                              : null
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="TP Policy Number"
                      variant="outlined"
                      fullWidth
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.TP_PolicyNo}
                      name="TP_PolicyNo"
                      error={
                        props.errors.TP_PolicyNo && props.touched.TP_PolicyNo
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.TP_PolicyNo && props.touched.TP_PolicyNo
                          ? props.errors.TP_PolicyNo
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <MobileDatePicker
                      toolbarPlaceholder=""
                      toolbarTitle="Select TP Start Date"
                      label="TP Start Date"
                      value={props.values.TPStartDate}
                      name="TPStartDate"
                      disableCloseOnSelect={false}
                      onBlur={props.handleBlur}
                      onChange={(newValue) => {
                        props.setFieldValue("TPStartDate", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          name="TPStartDate"
                          error={
                            props.errors.TPStartDate &&
                            props.touched.TPStartDate
                              ? true
                              : false
                          }
                          helperText={
                            props.errors.TPStartDate &&
                            props.touched.TPStartDate
                              ? props.errors.TPStartDate
                              : null
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <MobileDatePicker
                      toolbarPlaceholder=""
                      toolbarTitle="Select TP End Date"
                      label="TP End Date"
                      value={props.values.TPEndDate}
                      name="TPEndDate"
                      disableCloseOnSelect={false}
                      onBlur={props.handleBlur}
                      onChange={(newValue) => {
                        props.setFieldValue("TPEndDate", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          name="TPEndDate"
                          error={
                            props.errors.TPEndDate && props.touched.TPEndDate
                              ? true
                              : false
                          }
                          helperText={
                            props.errors.TPEndDate && props.touched.TPEndDate
                              ? props.errors.TPEndDate
                              : null
                          }
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  // disabled={!props.dirty || !props.isValid}
                >
                  Continue
                </Button>
                <Button varient="outlined" onClick={() => handleBack()}>
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default VehicleDetails;
