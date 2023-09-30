import React, { useState } from "react";

import { get } from "lodash";

import useAuth from "../../../hooks/useAuth";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import {
  TextField,
  Grid,
  Card,
  Stack,
  Container,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { toast } from "react-toastify";

import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import Page from "../../../component/dashboard/Page";

// import MoreMenu from "../../../component/dashboard/tools/MoreMenu";

const PasswordChange = () => {
  const { Auth } = useAuth();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const updatedByEmail = get(Auth, "data.Userid", "");

  const [otpGenerated, setOtpGenerated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const InitialData = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  };
  const [dataPassword, setDataPassword] = useState(InitialData);
  console.log("dataPassword", dataPassword);
  const schemaObj = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is Required"),
    newPassword: Yup.string().required("New Password is Required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is Required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });
  const schemaObjOTP = Yup.object().shape({
    otp: Yup.string().required("OTP is Required"),
  });

  
  const pageTitle = "Change Password";
  return (
    <>
      <Page
        title={pageTitle}
        style={{ height: " 100%", width: "100%" }}
      >
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
                oldPassword: dataPassword.oldPassword,
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={schemaObj}
              onSubmit={(values, actions) => {
                setDataPassword({
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,
                  confirmPassword: values.confirmPassword,
                  otp: "",
                });
                setLoadingSubmit(false);
                setOtpGenerated(true);
                toast.success(
                  "OTP has successfully sent, Please enter OTP to complete the Process."
                );
              }}
            >
              {(props) =>
                !otpGenerated && (
                  <>
                    <Form>
                      <Grid
                        container
                        spacing={4}
                        direction="row"
                        justifyContent="start-flex"
                        alignItems="start-flex"
                      >
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            type={showPassword ? "text" : "password"}
                            label="Old Password"
                            variant="standard"
                            fullWidth
                            name="oldPassword"
                            value={props.values.oldPassword}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.oldPassword &&
                              props.touched.oldPassword
                                ? props.errors.oldPassword
                                : null
                            }
                            error={
                              props.errors.oldPassword &&
                              props.touched.oldPassword
                                ? true
                                : false
                            }
                            InputProps={{
                              endAdornment: showPassword ? (
                                <VisibilityOff
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              ) : (
                                <Visibility
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            type={showPassword ? "text" : "password"}
                            label="New Password"
                            variant="standard"
                            fullWidth
                            name="newPassword"
                            value={props.values.newPassword}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.newPassword &&
                              props.touched.newPassword
                                ? props.errors.newPassword
                                : null
                            }
                            error={
                              props.errors.newPassword &&
                              props.touched.newPassword
                                ? true
                                : false
                            }
                            InputProps={{
                              endAdornment: showPassword ? (
                                <VisibilityOff
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              ) : (
                                <Visibility
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            type={showPassword ? "text" : "password"}
                            label="Confirm Password"
                            variant="standard"
                            fullWidth
                            name="confirmPassword"
                            value={props.values.confirmPassword}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.confirmPassword &&
                              props.touched.confirmPassword
                                ? props.errors.confirmPassword
                                : null
                            }
                            error={
                              props.errors.confirmPassword &&
                              props.touched.confirmPassword
                                ? true
                                : false
                            }
                            InputProps={{
                              endAdornment: showPassword ? (
                                <VisibilityOff
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              ) : (
                                <Visibility
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              ),
                            }}
                          />
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
                            Generate OTP
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Form>
                  </>
                )
              }
            </Formik>
            <Formik
              initialValues={{
                otp: "",
              }}
              validationSchema={schemaObjOTP}
              onSubmit={(values, actions) => {
                setDataPassword((dataPassword) => {
                  return { ...dataPassword, otp: values.otp };
                });
                // resetForm();
                setLoadingSubmit(false);
                setOtpGenerated(false);

                setDataPassword(InitialData);
                toast.success("Password has changed successfully.");
                // handleSubmit(values);
                // setLoadingSubmit(false);
              }}
            >
              {(props) =>
                otpGenerated && (
                  <>
                    <Form>
                      <Grid
                        container
                        spacing={4}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="OTP"
                            variant="standard"
                            fullWidth
                            name="otp"
                            value={props.values.otp}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.otp && props.touched.otp
                                ? props.errors.otp
                                : null
                            }
                            error={
                              props.errors.otp && props.touched.otp
                                ? true
                                : false
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={4}
                        direction="column"
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
                            Change Password
                          </LoadingButton>
                        </Grid>
                        <Grid item xs={4} sm={2} md={2}>
                          <LoadingButton
                            onClick={() => {
                              setOtpGenerated(false);
                            }}
                            variant="outlined"
                            fullWidth
                          >
                            Back
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Form>
                  </>
                )
              }
            </Formik>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default PasswordChange;
