import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { getSnapshot } from "mobx-state-tree";
import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { get, clone } from "lodash";
import Autocomplete from "@mui/material/Autocomplete";

const OwnerDetails = (props) => {
  const navigate = useNavigate();
  // const [show, setShow] = useState("1");
  const { store } = props;
  let ownerDetails = clone(getSnapshot(store.proposal.ownerDetails));
  const occupationlistes = getSnapshot(store.proposal.occupationlistes);
  ownerDetails.GSTNumber = get(ownerDetails, "GSTNumber", "");
  console.log("ownerDetails", ownerDetails);
  ownerDetails.VehicleOwnedBy = get(ownerDetails, "VehicleOwnedBy", "1");

  const phoneRegExp = /^\d{10}$/;
  const specialCharacter = /^[aA-zZ\s]+$/;
  let schemaObj = {
    Title: Yup.string().required("Title is Required"),
    CustomerName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .matches(specialCharacter, "Special Characters is not allowed")
      .required("First Name is Required"),
    LastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .matches(specialCharacter, "Special Characters is not allowed")
      .required("Last Name is Required"),
    MobileNo: Yup.string()
      .max(10, "Mobile Number is too Long!")
      .length(10, "Mobile number is not valid")
      .matches(phoneRegExp, "Mobile number is not valid")
      .required("Mobile Number is required"),
    EmailId: Yup.string().email("Invalid email").required("Email is Required"),
    DOB: Yup.date().nullable().required("Required Birth Date"),
    Occupation: Yup.string().required("Occupation is Required"),
    GSTNumber: Yup.string().when("VehicleOwnedBy", {
      is: (VehicleOwnedBy) => {
        return VehicleOwnedBy === 0 ? false : true;
      },
      then: Yup.string().required("GST is Required"),
    }),
  };

  const OwnerDetailSchema = Yup.object().shape(schemaObj);
  const selectedOccupation = get(ownerDetails, "occupationlist", {});
  return (
    <>
      <Formik
        initialValues={{
          occupationlist: selectedOccupation,
          Occupation: ownerDetails.Occupation,
          Title: ownerDetails.Title,
          CustomerName: ownerDetails.CustomerName,
          LastName: ownerDetails.LastName,
          MobileNo: ownerDetails.MobileNo,
          EmailId: ownerDetails.EmailId,
          Gender: ownerDetails.Gender,
          DOB: ownerDetails.DOB,
          MaritalStatus: ownerDetails.MaritalStatus,
          VehicleOwnedBy: ownerDetails.VehicleOwnedBy,
          GSTNumber: ownerDetails.GSTNumber,
        }}
        validationSchema={OwnerDetailSchema}
        onSubmit={(values) => {
          props.goNext(values, 2);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Title</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.values.Title}
                    label="Title"
                    name="Title"
                    onChange={(event) => {
                      let value =
                        props.values.VehicleOwnedBy === "0"
                          ? "m/s"
                          : event.target.value;
                      props.setFieldValue("Title", value);
                    }}
                    onBlur={props.handleBlur}
                  >
                    <MenuItem value="mr">Mr</MenuItem>
                    <MenuItem value="mrs">Mrs</MenuItem>
                    <MenuItem value="ms">Ms</MenuItem>
                    <MenuItem value="m/s">M/S</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.CustomerName}
                  label="First Name"
                  autoComplete="off"
                  variant="outlined"
                  name="CustomerName"
                  fullWidth
                  error={
                    props.errors.CustomerName && props.touched.CustomerName
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.CustomerName && props.touched.CustomerName
                      ? props.errors.CustomerName
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.LastName}
                  label="Last Name"
                  autoComplete="off"
                  variant="outlined"
                  name="LastName"
                  fullWidth
                  error={
                    props.errors.LastName && props.touched.LastName
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.LastName && props.touched.LastName
                      ? props.errors.LastName
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Mobile Number"
                  onChange={(e) => {
                    e.target.value.match("^[0-9]*$") &&
                      props.setFieldValue("MobileNo", e.target.value);
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.MobileNo}
                  name="MobileNo"
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    maxLength: 10,
                  }}
                  error={
                    props.errors.MobileNo && props.touched.MobileNo
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.MobileNo && props.touched.MobileNo
                      ? props.errors.MobileNo
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Email Address"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.EmailId}
                  name="EmailId"
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                  error={
                    props.errors.EmailId && props.touched.EmailId ? true : false
                  }
                  helperText={
                    props.errors.EmailId && props.touched.EmailId
                      ? props.errors.EmailId
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    name="Gender"
                    value={props.values.Gender}
                    onChange={(event) => {
                      props.setFieldValue("Gender", event.currentTarget.value);
                    }}
                    row
                  >
                    <FormControlLabel
                      value="M"
                      control={
                        <Radio
                          icon={<MaleIcon sx={{ color: "text.primary" }} />}
                          checkedIcon={<MaleIcon />}
                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      value="F"
                      control={
                        <Radio
                          icon={<FemaleIcon sx={{ color: "text.primary" }} />}
                          checkedIcon={<FemaleIcon />}
                        />
                      }
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MobileDatePicker
                  toolbarPlaceholder=""
                  toolbarTitle="Select a Date of Birth"
                  label="Date Of Birth"
                  value={props.values.DOB}
                  name="DOB"
                  disableCloseOnSelect={false}
                  onBlur={props.handleBlur}
                  onChange={(newValue) => {
                    props.setFieldValue("DOB", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      name="DOB"
                      error={
                        props.errors.DOB && props.touched.DOB ? true : false
                      }
                      helperText={
                        props.errors.DOB && props.touched.DOB
                          ? props.errors.DOB
                          : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  disablePortal
                  options={occupationlistes}
                  name="occupationlist"
                  autoComplete={false}
                  value={props.values.occupationlist}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  onChange={(e, value) => {
                    props.setFieldValue("Occupation", get(value, "CODE", ""));
                    props.setFieldValue("occupationlist", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="occupationlist"
                      {...params}
                      label="Occupation"
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                      error={
                        props.errors.Occupation && props.touched.Occupation
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.Occupation && props.touched.Occupation
                          ? props.errors.Occupation
                          : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Maritial Status</FormLabel>
                  <RadioGroup
                    aria-label="Marital Status"
                    name="MaritalStatus"
                    value={props.values.MaritalStatus}
                    row
                    onChange={(event) => {
                      props.setFieldValue(
                        "MaritalStatus",
                        event.currentTarget.value
                      );
                    }}
                  >
                    <FormControlLabel
                      value="M"
                      control={<Radio />}
                      label="Married"
                    />
                    <FormControlLabel
                      value="U"
                      control={<Radio />}
                      label="Un Married"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  inputProps={{
                    autoComplete: "new-password",
                    maxLength: 12,
                  }}
                  label="Aadhar No"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    e.target.value.match("^[0-9]*$") &&
                      props.setFieldValue("AadharNo", e.target.value);
                  }}
                  onBlur={props.handleBlur}
                  name="AadharNo"
                  value={props.values.AadharNo}
                  error={
                    props.errors.AadharNo && props.touched.AadharNo
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.AadharNo && props.touched.AadharNo
                      ? props.errors.AadharNo
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Pan Number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    e.target.value.match("^[a-zA-Z0-9]*$") &&
                      props.setFieldValue(
                        "PanNumber",
                        e.target.value.toUpperCase()
                      );
                  }}
                  inputProps={{
                    autoComplete: "new-password",
                    maxLength: 10,
                  }}
                  onBlur={props.handleBlur}
                  name="PanNumber"
                  value={props.values.PanNumber}
                  error={
                    props.errors.PanNumber && props.touched.PanNumber
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.PanNumber && props.touched.PanNumber
                      ? props.errors.PanNumber
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    This Vehicle Belongs To
                  </FormLabel>
                  <RadioGroup
                    aria-label="This Vehicle Belongs To"
                    name="VehicleOwnedBy"
                    value={props.values.VehicleOwnedBy}
                    // defaultValue="1"
                    onChange={(event) => {
                      // setShow(event.currentTarget.value);
                      props.setFieldValue(
                        "VehicleOwnedBy",
                        event.currentTarget.value
                      );
                      event.currentTarget.value === "0" &&
                        props.setFieldValue("Title", "m/s");
                    }}
                    row
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Individual"
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Company"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {props.values.VehicleOwnedBy === "0" && (
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="GST"
                    inputProps={{
                      maxLength: 15,
                    }}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.GSTNumber}
                    name="GSTNumber"
                    error={
                      props.errors.GSTNumber && props.touched.GSTNumber
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.GSTNumber && props.touched.GSTNumber
                        ? props.errors.GSTNumber
                        : null
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  // disabled={!props.dirty || !props.isValid}
                >
                  Continue
                </Button>
                <Button varient="outlined" onClick={() => navigate("/Quotes")}>
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

export default OwnerDetails;
