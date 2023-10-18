import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import { get, size } from "lodash";
import { getSnapshot } from "mobx-state-tree";
import React from "react";
import * as Yup from "yup";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const AddressDetails = (props) => {
  const { store, handleBack } = props;
  const [cities, setCities] = React.useState([]);
  const [PinCode, setPinCode] = React.useState([]);
  const [uploadFileType, setUploadFileType] = React.useState("");
  const [isFileUploadDisabled, setIsFileUploadDisabled] = React.useState(true);

  const [PinCodeType, setPinCodeType] = React.useState(true); //true: enter pin code; false: choose pin code
  const item = JSON.parse(sessionStorage.getItem("selectedItem"));
  const states = getSnapshot(store.proposal.states);
  const addressDetails = getSnapshot(store.proposal.addressDetails);
  const uploadFilesType = getSnapshot(store.proposal.uploadFilesType);

  // Initialize a state to track uploaded files for each option
  const initialUploadedFiles = {};

  const AddressDetailSchema = Yup.object().shape({
    AadharNo: Yup.string()
      .max(12, "It Must be 12 digit length")
      .length(12, "It Must be 12 digit length"),
    PanNumber: Yup.string()
      .max(10, "It Must be 10 Character length")
      .length(10, "It Must be 10 Character length"),
    Address1: Yup.string().required("First Address is required"),
    StateID: Yup.string().required("Required State"),
    CityID: Yup.string().required("Required City"),
    // PostCode: Yup.string()
    //   .max(6, "Maximum 6 digit")
    //   .min(6, "Minimum 6 digit")
    //   .required("Pin Code is required"),
    // PostCodeSelect: Yup.string().required("Pin Code is required"),
    PostCode: Yup.string().when({
      is: () => {
        return PinCodeType;
      },
      then: Yup.string()
        .max(6, "Maximum 6 digit")
        .min(6, "Minimum 6 digit")
        .required("Pin Code is required"),
    }),
    PostCodeSelect: Yup.string().when({
      is: () => {
        return !PinCodeType;
      },
      then: Yup.string().required("Pin Code is required."),
    }),
  });

  const handleStateChange = async (StateID) => {
    const cities = await store.proposal.fetchCity(item.SupplierId, StateID);
    setCities(cities);
  };

  const handleCityChange = async (StateID, CityID) => {
    await store.proposal
      .fetchPinCode(item.SupplierId, StateID, CityID)
      .then((res) => {
        setPinCode(res);
        size(res) > 0 ? setPinCodeType(false) : setPinCodeType(true);
        // console.log(res);
      });
  };

  const handleUploadFilesTypeChange = async (FileType) => {
    setUploadFileType(FileType);
  };

  const handleFileInputChange = async (event) => {
    // Add 'async' keyword here
    const selectedFile = event.target.files[0];
    const EnqNo = store.insurance.getEnqNo();

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        // Add 'async' keyword here
        const base64String = e.target.result;
        // Split the string using a comma as the separator and get the second part (the base64 data)
        const strippedBase64 = base64String.split(",")[1];
        const fileName = selectedFile.name;

        const requestBody = {
          Enquiryno: EnqNo,
          FileType: uploadFileType,
          Filename: fileName,
          CompanyID: item.SupplierId,
          Base64string: strippedBase64,
        };

        try {
          const response = await store.proposal.saveUploadedFile(requestBody);
          console.log(response);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const selectedState = get(addressDetails, "state", {});
  const selectedCity = get(addressDetails, "city", {});

  return (
    <>
      <Formik
        initialValues={{
          state: selectedState,
          city: selectedCity,
          PanNumber: addressDetails.PanNumber,
          AadharNo: addressDetails.AadharNo,
          uploadFileType: addressDetails.uploadFilesType,
          Address1: addressDetails.Address1,
          Address2: addressDetails.Address2,
          Address3: addressDetails.Address3,
          StateID: addressDetails.StateID,
          CityID: addressDetails.CityID,
          PostCode: addressDetails.PostCode,
          PostCodeSelect: addressDetails.PostCode,
          PinCodeType: PinCodeType,
        }}
        validationSchema={AddressDetailSchema}
        onSubmit={(values) => {
          props.goNext(values, 4);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
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
                <FormControl fullWidth>
                  <TextField
                    id="file-input"
                    name="file"
                    type="file"
                    onChange={(event) => handleFileInputChange(event)}
                    error={props.errors.file && props.touched.file}
                    inputProps={{ accept: ".pdf,.doc,.docx" }} // Define accepted file types
                    variant="outlined"
                    fullWidth
                  />
                  <small style={{ color: "red" }}>
                    {props.errors.file &&
                      props.touched.file &&
                      props.errors.file}
                  </small>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}></Grid>
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
                <FormControl fullWidth>
                  <TextField
                    id="file-input"
                    name="file"
                    type="file"
                    onChange={(event) => handleFileInputChange(event)}
                    error={props.errors.file && props.touched.file}
                    inputProps={{ accept: ".pdf,.doc,.docx" }} // Define accepted file types
                    variant="outlined"
                    fullWidth
                  />
                  <small style={{ color: "red" }}>
                    {props.errors.file &&
                      props.touched.file &&
                      props.errors.file}
                  </small>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}></Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  id="document-type"
                  name="documentType"
                  options={uploadFilesType.map((filetype) => filetype.FileType)}
                  value={uploadFileType}
                  onChange={(event, newValue) => {
                    handleUploadFilesTypeChange(newValue);
                    setIsFileUploadDisabled(!newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Other Document"
                      variant="outlined"
                      fullWidth
                      error={
                        props.errors.documentType && props.touched.documentType
                      }
                      helperText={
                        props.errors.documentType && props.touched.documentType
                          ? props.errors.documentType
                          : null
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <TextField
                    id="file-input"
                    name="file"
                    type="file"
                    onChange={(event) => handleFileInputChange(event)}
                    error={props.errors.file && props.touched.file}
                    inputProps={{ accept: ".pdf,.doc,.docx" }} // Define accepted file types
                    variant="outlined"
                    fullWidth
                    disabled={isFileUploadDisabled}
                  />
                  <small style={{ color: "red" }}>
                    {props.errors.file &&
                      props.touched.file &&
                      props.errors.file}
                  </small>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}></Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Address 1"
                  variant="outlined"
                  fullWidth
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="Address1"
                  value={props.values.Address1}
                  error={
                    props.errors.Address1 && props.touched.Address1
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.Address1 && props.touched.Address1
                      ? props.errors.Address1
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Address 2"
                  variant="outlined"
                  fullWidth
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="Address2"
                  value={props.values.Address2}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  inputProps={{
                    autoComplete: "new-password",
                  }}
                  label="Address 3"
                  variant="outlined"
                  fullWidth
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="Address3"
                  value={props.values.Address3}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  options={states}
                  name="state"
                  // value={props.values.state}
                  getOptionLabel={(option) => {
                    return get(option, "StateName", "");
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return (
                      option.StateID === get(props.values.state, "StateID", "")
                    );
                  }}
                  onChange={(e, value) => {
                    props.setFieldValue("StateID", get(value, "StateID", ""));
                    props.setFieldValue("state", value);
                    // props.setFieldValue("city", "");
                    // props.setFieldValue("CityID", "");
                    // props.setFieldValue("PostCodeSelect", "");
                    handleStateChange(get(value, "StateID", ""));
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="state"
                      {...params}
                      label="State"
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                      error={
                        props.errors.StateID && props.touched.StateID
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.StateID && props.touched.StateID
                          ? props.errors.StateID
                          : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  disablePortal
                  options={cities}
                  name="city"
                  key={cities}
                  // value={props.values.city}
                  getOptionLabel={(option) => get(option, "CityName", "")}
                  isOptionEqualToValue={(option, value) => {
                    return (
                      option.CityID === get(props.values.city, "CityID", "")
                    );
                  }}
                  onChange={(e, value) => {
                    props.setFieldValue("city", value);
                    props.setFieldValue("CityID", get(value, "CityID", ""));
                    // props.setFieldValue("PostCode", "");
                    // props.setFieldValue("PostCodeSelect", "");
                    handleCityChange(
                      props.values.StateID,
                      get(value, "CityID", "")
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="city"
                      {...params}
                      label="City"
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                      error={
                        props.errors.CityID && props.touched.CityID
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.CityID && props.touched.CityID
                          ? props.errors.CityID
                          : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {PinCodeType ? (
                  <TextField
                    inputProps={{
                      autoComplete: "new-password",
                      maxLength: 6,
                    }}
                    label="Pincode"
                    variant="outlined"
                    maxLength="6"
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name="PostCode"
                    value={props.values.PostCode}
                    error={
                      props.errors.PostCode && props.touched.PostCode
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.PostCode && props.touched.PostCode
                        ? props.errors.PostCode
                        : null
                    }
                  />
                ) : (
                  <Autocomplete
                    disablePortal
                    options={PinCode}
                    key={PinCode}
                    name="PostCodeSelect"
                    // value={props.values.PostCodeSelect}
                    getOptionLabel={(option) => {
                      return get(option, "Pincode", "");
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.Pincode === props.values.PostCodeSelect;
                    }}
                    onChange={(e, value) => {
                      props.setFieldValue(
                        "PostCode",
                        get(value, "Pincode", "")
                      );
                      props.setFieldValue(
                        "PostCodeSelect",
                        get(value, "Pincode", "")
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        name="PostCodeSelect"
                        {...params}
                        label="Pin Code"
                        fullWidth
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
                        }}
                        error={
                          props.errors.PostCodeSelect &&
                          props.touched.PostCodeSelect
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.PostCodeSelect &&
                          props.touched.PostCodeSelect
                            ? props.errors.PostCodeSelect
                            : null
                        }
                      />
                    )}
                  />
                )}
                <div></div>
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

export default AddressDetails;
