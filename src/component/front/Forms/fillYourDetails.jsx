import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import { getSnapshot } from "mobx-state-tree";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const phoneRegExp = /^\d{10}$/;

const Schema = Yup.object().shape({
  fullName: Yup.string().max(50, "Too Long!").required("Full Name is Required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  mobileNumber: Yup.string()
    .max(10, "Phone Number is too Long!")
    .length(10, "Phone number is not valid")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone Number is required")
});
const FillYourDetails = (props) => {
  const { store } = props;
  // const insuranceData = getSnapshot(store.insurance);
  const saveDetailsRequest = store.insurance.getSaveDetailRequest();
  const goBack = () => {
    store.page.changePage(6);
    props.onChange(6);
  };
  let navigate = useNavigate();
  return (
    <>
      <Grid
        container
        sx={{
          alignItems: "start",
          mb: 2,
          flexDirection: "row",
          justifyContent: "start",
          flexWrap: "nowrap"
        }}
      >
        <ArrowCircleLeftOutlinedIcon
          onClick={goBack}
          sx={{
            color: "primary.main",
            mr: 1,
            fontSize: { xs: "25px", sm: "30px" },
            cursor: "pointer"
          }}
        />
        <Typography
          variant="h4"
          color="text.secondary"
          className="main_heading"
          sx={{ textAlign: "left" }}
        >
          Please Fill Your Details
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              mobileNumber: ""
            }}
            validationSchema={Schema}
            onSubmit={async (values, actions) => {
              setTimeout(async () => {
                const { store } = props;
                store.insurance.setUserDetails({
                  Mobile: values.mobileNumber,
                  Email: values.email,
                  CustName: values.fullName
                });
                saveDetailsRequest.Email = values.email;
                saveDetailsRequest.CustName = values.fullName;
                saveDetailsRequest.Mobile = values.mobileNumber;
                store.insurance.setSaveDetailRequest(saveDetailsRequest);
                // const res = await store.insurance.saveDetails(saveDetailsRequest);
                const EnqNo = store.insurance.getEnqNo();
                store.quotes.fetchQuote(EnqNo);
                actions.setSubmitting(false);
                navigate(`/Quotes`);
              }, 100);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container spacing={2} align="start">
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={
                        props.errors.fullName && props.touched.fullName
                          ? true
                          : false
                      }
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.fullName}
                      name="fullName"
                      label="Full Name"
                      fullWidth
                      helperText={
                        props.errors.fullName && props.touched.fullName
                          ? props.errors.fullName
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={
                        props.errors.email && props.touched.email ? true : false
                      }
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      name="email"
                      label="Email"
                      fullWidth
                      helperText={
                        props.errors.email && props.touched.email
                          ? props.errors.email
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={
                        props.errors.mobileNumber && props.touched.mobileNumber
                          ? true
                          : false
                      }
                      type="text"
                      inputProps={{
                        maxLength: 10
                      }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.mobileNumber}
                      name="mobileNumber"
                      label="Phone Number"
                      fullWidth
                      helperText={
                        props.errors.mobileNumber && props.touched.mobileNumber
                          ? props.errors.mobileNumber
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} align="left">
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!props.dirty || !props.isValid}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ textAlign: { xs: "center", md: "right" } }}
                  >
                    <Typography
                      sx={{
                        display: "inline",
                        mr: 1,
                        fontSize: "14px",
                        color: "text.secondary"
                      }}
                      varient="body1"
                      component="p"
                    >
                      By clicking on "Continue", you agree to our
                    </Typography>
                    <Link
                      sx={{
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold"
                      }}
                    >
                      Privacy Policy & Terms of Use
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default FillYourDetails;
