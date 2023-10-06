import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { getSnapshot } from "mobx-state-tree";
import React from "react";
import * as Yup from "yup";
import { get } from "lodash";
import Autocomplete from "@mui/material/Autocomplete";
const NomineeDetails = (props) => {
  const { store, handleBack } = props;
  const nomineeDetails = getSnapshot(store.proposal.nomineeDetails);
  const nomineeRelastiones = getSnapshot(store.proposal.nomineeRelastiones);
  const NomineeName = nomineeDetails.NomineeName.split(" ");
  const firstName = NomineeName[0];
  const lastName = NomineeName[1] ? NomineeName[1] : "";

  let ownerDetails = getSnapshot(store.proposal.ownerDetails);
  let VehicleOwnedByFlag =
    get(ownerDetails, "VehicleOwnedBy", "1") === "0" ? false : true;
  console.log("VehicleOwnedBy", VehicleOwnedByFlag);

  const specialCharacter = /^[aA-zZ\s]+$/;
  const NomineeDetailSchema = Yup.object().shape({
    Title: Yup.string().when({
      is: () => {
        return VehicleOwnedByFlag;
      },
      then: Yup.string().required("Title is Required"),
    }),
    firstName: Yup.string().when({
      is: () => {
        return VehicleOwnedByFlag;
      },
      then: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .matches(specialCharacter, "Special Characters is not allowed")
        .required("First Name is Required"),
    }),
    lastName: Yup.string().when({
      is: () => {
        return VehicleOwnedByFlag;
      },
      then: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .matches(specialCharacter, "Special Characters is not allowed")
        .required("Last Name is Required"),
    }),
    NomineeRelationship: Yup.string().when({
      is: () => {
        return VehicleOwnedByFlag;
      },
      then: Yup.string().required("Relation is Required"),
    }),
    NomineeAge: Yup.number().when({
      is: () => {
        return VehicleOwnedByFlag;
      },
      then: Yup.number()
        .positive("Not allowed negative numbers")
        .integer("Age must be a number")
        .moreThan(17, "minimum age is 18 or Above")
        .required("Age is Required"),
    }),
  });

  const selectedNomineeRelastion = get(nomineeDetails, "nomineeRelastion", {});
  return (
    <>
      <Formik
        initialValues={{
          nomineeRelastion: selectedNomineeRelastion,
          firstName,
          lastName,
          Title: nomineeDetails.Title,
          NomineeRelationship: nomineeDetails.NomineeRelationship,
          NomineeAge: nomineeDetails.NomineeAge,
        }}
        validationSchema={NomineeDetailSchema}
        onSubmit={(values) => {
          props.goNext(values, 3);
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
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  >
                    <MenuItem value="mr">Mr</MenuItem>
                    <MenuItem value="mrs">Mrs</MenuItem>
                    <MenuItem value="ms">Ms</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Nominee First Name"
                  variant="outlined"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.firstName}
                  name="firstName"
                  fullWidth
                  error={
                    props.errors.firstName && props.touched.firstName
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.firstName && props.touched.firstName
                      ? props.errors.firstName
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Nominee Last Name"
                  variant="outlined"
                  fullWidth
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.lastName}
                  name="lastName"
                  error={
                    props.errors.lastName && props.touched.lastName
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.lastName && props.touched.lastName
                      ? props.errors.lastName
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  disablePortal
                  options={nomineeRelastiones}
                  autoComplete={false}
                  name="nomineeRelastion"
                  value={props.values.nomineeRelastion}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  onChange={(e, value) => {
                    props.setFieldValue(
                      "NomineeRelationship",
                      get(value, "CODE", "")
                    );
                    props.setFieldValue("nomineeRelastion", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="nomineeRelastion"
                      {...params}
                      label="Nominee Relationship"
                      fullWidth
                      error={
                        props.errors.NomineeRelationship &&
                        props.touched.NomineeRelationship
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.NomineeRelationship &&
                        props.touched.NomineeRelationship
                          ? props.errors.NomineeRelationship
                          : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="outlined-basic"
                  label="Nominee Age"
                  variant="outlined"
                  onChange={(e) => {
                    e.target.value.match("^[0-9]*$") &&
                      props.setFieldValue("NomineeAge", e.target.value);
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.NomineeAge}
                  name="NomineeAge"
                  fullWidth
                  error={
                    props.errors.NomineeAge && props.touched.NomineeAge
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.NomineeAge && props.touched.NomineeAge
                      ? props.errors.NomineeAge
                      : null
                  }
                />
              </Grid>
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

export default NomineeDetails;
