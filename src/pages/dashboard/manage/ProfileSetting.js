import React, { useState } from "react";

import { get } from "lodash";
import Moment from "moment";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Grid,
  Card,
  Stack,
  Container,
  Typography,
  MenuItem,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import Page from "../../../component/dashboard/Page";
import { apiUpdateProfileSetting } from "../../../api/dashboard/manage/profileSetting";
import { GetUserInfo } from "../../../api/login";

const ProfileSetting = () => {
  const { Auth, AuthActionLogin } = useAuth();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const updatedByEmail = get(Auth, "data.Userid", "");

  const Salutation = [
    {
      value: "MR.",
      label: "Mr.",
    },
    {
      value: "MS.",
      label: "Ms.",
    },
    {
      value: "MRS.",
      label: "Mrs.",
    },
    {
      value: "DR.",
      label: "Dr.",
    },
  ];
  const schemaObj = Yup.object().shape({
    salutation: Yup.string().required("Salutation is Required"),
    firstName: Yup.string().required("First Name is Required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is Required"),
    dob: Yup.string().required("DOB is Required"),
    address: Yup.string().required("Address is Required"),
    city: Yup.string().required("City is Required"),
    state: Yup.string().required("State is Required"),
    pinCode: Yup.string().required("Pin Code is Required"),
    mobileNumber: Yup.string().required("Mobile Number is Required"),
    email: Yup.string().required("Email is Required"),
    // panNumber: Yup.string().required("Pan Number is Required"),
    // nameOnPan: Yup.string().required("Name on Pan Card is Required"),
    gender: Yup.string().required("Gender is Required"),
  });

  const pageTitle = "Profile";
  return (
    <>
      <Page title={pageTitle} style={{ height: " 100%", width: "100%" }}>
        <Container style={{ height: " 100%", width: "100%" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              {pageTitle}
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Updated By: {updatedByEmail}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Card style={{ height: " 100%", width: "100%" }} sx={{ p: 5 }}>
            <Formik
              initialValues={{
                memberId: get(Auth, "data.MemberID", ""),
                userId: get(Auth, "data.Userid", ""),
                gender: get(Auth, "data.Gender", ""),
                salutation: get(Auth, "data.Title", "Mr."),
                firstName: get(Auth, "data.Name", ""),
                middleName: get(Auth, "data.MidName", ""),
                lastName: get(Auth, "data.LastName", ""),
                dob: get(Auth, "data.DOB", ""),
                address: get(Auth, "data.Address", ""),
                city: get(Auth, "data.City", ""),
                state: get(Auth, "data.State", ""),
                pinCode: get(Auth, "data.PinCode", ""),
                mobileNumber: get(Auth, "data.Mobile", ""),
                email: get(Auth, "data.EmailID", ""),
                panNumber: get(Auth, "data.PAN_Number", ""),
                nameOnPan: get(Auth, "data.nameOnPan", ""),
              }}
              validationSchema={schemaObj}
              onSubmit={async (values, actions) => {
                // setLoadingSubmit(true);

                let res = await apiUpdateProfileSetting({
                  Userid: get(Auth, "data.Userid", ""),
                  Name: values.firstName,
                  MidName: values.middleName,
                  LastName: values.lastName,
                  Title: values.salutation,
                  Address: values.address,
                  City: values.city,
                  State: values.state,
                  PinCode: values.pinCode,
                  DOB: Moment(values.dob).format("YYYY-MM-DD"),
                  Gender: values.gender,
                  Mobile: values.mobileNumber,
                  EmailID: values.email,
                });
   
                if (res.data === "Success") {
                  let data = await GetUserInfo({
                    UserID: get(Auth, "data.Userid", ""),
                  });
                  AuthActionLogin(data,new Date(new Date().getTime() + 900 * 1000));
                  toast.success("Profile updated successfully");
                } else {
                  toast.error("Some error has occured");
                }
                setLoadingSubmit(false);
              }}
            >
              {(props) => (
                <Form>
                  <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Member Number"
                        variant="standard"
                        fullWidth
                        disabled
                        name="memberId"
                        value={props.values.memberId}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="UserID"
                        variant="standard"
                        fullWidth
                        disabled
                        name="userId"
                        value={props.values.userId}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                          row
                          name="gender"
                          value={props.values.gender}
                          onChange={(event) => {
                            props.setFieldValue(
                              "gender",
                              event.currentTarget.value
                            );
                          }}
                        >
                          <FormControlLabel
                            value="MALE"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="FEMALE"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={1}>
                      <TextField
                        select
                        fullWidth
                        variant="standard"
                        label="Salutation"
                        name="salutation"
                        value={props.values.salutation}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.salutation && props.touched.salutation
                            ? props.errors.salutation
                            : null
                        }
                        error={
                          props.errors.salutation && props.touched.salutation
                            ? true
                            : false
                        }
                      >
                        {Salutation.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="First Name"
                        name="firstName"
                        value={props.values.firstName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.firstName && props.touched.firstName
                            ? props.errors.firstName
                            : null
                        }
                        error={
                          props.errors.firstName && props.touched.firstName
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Middle Name"
                        variant="standard"
                        fullWidth
                        name="middleName"
                        value={props.values.middleName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.middleName && props.touched.middleName
                            ? props.errors.middleName
                            : null
                        }
                        error={
                          props.errors.middleName && props.touched.middleName
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Last Name"
                        variant="standard"
                        fullWidth
                        name="lastName"
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.lastName && props.touched.lastName
                            ? props.errors.lastName
                            : null
                        }
                        error={
                          props.errors.lastName && props.touched.lastName
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Date of Birth"
                        variant="standard"
                        fullWidth
                        name="dob"
                        value={props.values.dob}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.dob && props.touched.dob
                            ? props.errors.dob
                            : null
                        }
                        error={
                          props.errors.dob && props.touched.dob ? true : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Address"
                        variant="standard"
                        fullWidth
                        name="address"
                        value={props.values.address}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.address && props.touched.address
                            ? props.errors.address
                            : null
                        }
                        error={
                          props.errors.address && props.touched.address
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="City"
                        variant="standard"
                        fullWidth
                        name="city"
                        value={props.values.city}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.city && props.touched.city
                            ? props.errors.city
                            : null
                        }
                        error={
                          props.errors.city && props.touched.city ? true : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="State"
                        variant="standard"
                        fullWidth
                        name="state"
                        value={props.values.state}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.state && props.touched.state
                            ? props.errors.state
                            : null
                        }
                        error={
                          props.errors.state && props.touched.state
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Pincode"
                        variant="standard"
                        fullWidth
                        name="pinCode"
                        value={props.values.pinCode}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.pinCode && props.touched.pinCode
                            ? props.errors.pinCode
                            : null
                        }
                        error={
                          props.errors.pinCode && props.touched.pinCode
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Mobile"
                        variant="standard"
                        fullWidth
                        name="mobileNumber"
                        value={props.values.mobileNumber}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.mobileNumber &&
                          props.touched.mobileNumber
                            ? props.errors.mobileNumber
                            : null
                        }
                        error={
                          props.errors.mobileNumber &&
                          props.touched.mobileNumber
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Email"
                        variant="standard"
                        fullWidth
                        name="email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.email && props.touched.email
                            ? props.errors.email
                            : null
                        }
                        error={
                          props.errors.email && props.touched.email
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="PAN No"
                        variant="standard"
                        fullWidth
                        name="panNumber"
                        value={props.values.panNumber}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.panNumber && props.touched.panNumber
                            ? props.errors.panNumber
                            : null
                        }
                        error={
                          props.errors.panNumber && props.touched.panNumber
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Name on PAN"
                        variant="standard"
                        fullWidth
                        name="nameOnPan"
                        value={props.values.nameOnPan}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={
                          props.errors.nameOnPan && props.touched.nameOnPan
                            ? props.errors.nameOnPan
                            : null
                        }
                        error={
                          props.errors.nameOnPan && props.touched.nameOnPan
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{ pt: 5 }}
                  >
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="subtitle1" component="h4">
                        Photo
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="subtitle1" component="h4">
                        Pan Card
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="subtitle1" component="h4">
                        ID Proof
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="subtitle1" component="h4">
                        Cheque
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="subtitle1" component="h4">
                        Registration Form
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ p: 10 }}
                  >
                    <Grid item xs={12} sm={4} md={4}>
                      <LoadingButton
                        onClick={props.handleSubmit}
                        loading={loadingSubmit}
                        endIcon={<SaveIcon />}
                        loadingPosition="end"
                        variant="contained"
                        fullWidth
                      >
                        Submit
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default ProfileSetting;
