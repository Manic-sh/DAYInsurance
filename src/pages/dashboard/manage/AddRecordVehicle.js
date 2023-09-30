import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { get } from "lodash";
import Moment from "moment";
import useAuth from "../../../hooks/useAuth";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
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
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import Page from "../../../component/dashboard/Page";
// import { getAddRecordPolicyId } from "../../../store/redux/dashboard/manage/AddRecordPolicySlice";
import { addRecordVehicle } from "../../../api/dashboard/manage/addRecordVehicle";

const AddRecordVehicle = () => {
  const { Auth } = useAuth();
  const dispatch = useDispatch();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const updatedByEmail = get(Auth, "data.Userid", "");

  // const dashboard_data = useSelector((state) => state.dashboard_data);
  const record_policy_id = useSelector((state) => state.add_record_policy_data);
  useEffect(() => {
    // dispatch(
    //   getAddRecordPolicyId({
    //     Userid: Auth.data.Userid,
    //   })
    // );
  }, [dispatch, Auth]);
  console.log("record_policy_id", record_policy_id);

  const schemaObj = Yup.object().shape({
    recordId: Yup.string().required("Record Id is Required"),
    vehicleNo: Yup.string().required("Vehicle No is Required"),
    vehicleType: Yup.string().required("Vehicle Type No is Required"),
    pucExpiryDate: Yup.string().required("PUC Expiry Date is Required"),
    insuranceExpiryDate: Yup.string().required(
      "Insurance Expiry Date is Required"
    ),
    insuranceCompany: Yup.string().required("Insurance Company is Required"),
    fitnessDate: Yup.string().required("Fitness Date is Required"),
    kmDriven: Yup.string().required("KM Driven is Required"),
    nextServiceDate: Yup.string().required("Next Service Date is Required"),
    oldPolicyFile: Yup.string().required("File is Required"),
  });

  const insuranceCompanyList = [
    {
      value: "ADITYA BIRLA",
      label: "ADITYA BIRLA",
    },
    {
      value: "APPOLO",
      label: "APPOLO",
    },
    {
      value: "BAJAJ",
      label: "BAJAJ",
    },
    {
      value: "BHARTI",
      label: "BHARTI",
    },
  ];
  const vehicleList = [
    {
      value: "2W",
      label: "2W",
    },
    {
      value: "Pvt Car",
      label: "Pvt Car",
    },
    {
      value: "Commercial",
      label: "Commercial",
    },
  ];

  const pageTitle = "Add Vehicle";
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
            {!record_policy_id.loading && (
              <Formik
                initialValues={{
                  recordId: "ID123",
                  vehicleNo: "",
                  vehicleType: "",
                  pucExpiryDate: Moment(new Date()),
                  insuranceExpiryDate: Moment(new Date()).add(1, "year"),
                  insuranceCompany: "",
                  fitnessDate: Moment(new Date()),
                  kmDriven: "",
                  nextServiceDate: Moment(new Date()),
                }}
                validationSchema={schemaObj}
                onSubmit={async (values, actions) => {
                  setLoadingSubmit(true);
                  await addRecordVehicle({
                    ...values,
                    Userid: Auth.data.Userid,
                  });
                  toast.success("Record Vehicle Added Successfully");
                  setLoadingSubmit(false);
                }}
              >
                {(props) => (
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
                            disabled
                            label="Record ID"
                            variant="standard"
                            fullWidth
                            name="recordId"
                            value={props.values.recordId}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.recordId && props.touched.recordId
                                ? props.errors.recordId
                                : null
                            }
                            error={
                              props.errors.recordId && props.touched.recordId
                                ? true
                                : false
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="Vehicle No"
                            variant="standard"
                            fullWidth
                            name="vehicleNo"
                            value={props.values.vehicleNo}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.vehicleNo && props.touched.vehicleNo
                                ? props.errors.vehicleNo
                                : null
                            }
                            error={
                              props.errors.vehicleNo && props.touched.vehicleNo
                                ? true
                                : false
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            select
                            fullWidth
                            variant="standard"
                            label="Vehicle Type"
                            name="vehicleType"
                            value={props.values.vehicleType}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.vehicleType &&
                              props.touched.vehicleType
                                ? props.errors.vehicleType
                                : null
                            }
                            error={
                              props.errors.vehicleType &&
                              props.touched.vehicleType
                                ? true
                                : false
                            }
                          >
                            {vehicleList.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            label="PUC Expiry Date"
                            name="pucExpiryDate"
                            disableCloseOnSelect={false}
                            // minDate={FilterMinDate}
                            // maxDate={FilterMaxDate}
                            value={props.values.pucExpiryDate}
                            onChange={(newValue) => {
                              props.setFieldValue("pucExpiryDate", newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="standard"
                                {...params}
                                fullWidth
                                name="pucExpiryDate"
                                error={
                                  props.errors.pucExpiryDate &&
                                  props.touched.pucExpiryDate
                                    ? true
                                    : false
                                }
                                helperText={
                                  props.errors.pucExpiryDate &&
                                  props.touched.pucExpiryDate
                                    ? props.errors.pucExpiryDate
                                    : null
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Insurance Expiry Date"
                            name="insuranceExpiryDate"
                            disableCloseOnSelect={false}
                            // minDate={FilterMinDate}
                            // maxDate={FilterMaxDate}
                            value={props.values.insuranceExpiryDate}
                            onChange={(newValue) => {
                              props.setFieldValue(
                                "insuranceExpiryDate",
                                newValue
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="standard"
                                {...params}
                                fullWidth
                                name="insuranceExpiryDate"
                                error={
                                  props.errors.insuranceExpiryDate &&
                                  props.touched.insuranceExpiryDate
                                    ? true
                                    : false
                                }
                                helperText={
                                  props.errors.insuranceExpiryDate &&
                                  props.touched.insuranceExpiryDate
                                    ? props.errors.insuranceExpiryDate
                                    : null
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            select
                            fullWidth
                            variant="standard"
                            label="Insurance Company"
                            name="insuranceCompany"
                            value={props.values.insuranceCompany}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.insuranceCompany &&
                              props.touched.insuranceCompany
                                ? props.errors.insuranceCompany
                                : null
                            }
                            error={
                              props.errors.insuranceCompany &&
                              props.touched.insuranceCompany
                                ? true
                                : false
                            }
                          >
                            {insuranceCompanyList.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Fitness Date"
                            name="fitnessDate"
                            disableCloseOnSelect={false}
                            // minDate={FilterMinDate}
                            // maxDate={FilterMaxDate}
                            value={props.values.fitnessDate}
                            onChange={(newValue) => {
                              props.setFieldValue("fitnessDate", newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="standard"
                                {...params}
                                fullWidth
                                name="fitnessDate"
                                error={
                                  props.errors.fitnessDate &&
                                  props.touched.fitnessDate
                                    ? true
                                    : false
                                }
                                helperText={
                                  props.errors.fitnessDate &&
                                  props.touched.fitnessDate
                                    ? props.errors.fitnessDate
                                    : null
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="KM Driven"
                            variant="standard"
                            fullWidth
                            name="kmDriven"
                            value={props.values.kmDriven}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.kmDriven && props.touched.kmDriven
                                ? props.errors.kmDriven
                                : null
                            }
                            error={
                              props.errors.kmDriven && props.touched.kmDriven
                                ? true
                                : false
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Next Service Date"
                            name="nextServiceDate"
                            disableCloseOnSelect={false}
                            // minDate={FilterMinDate}
                            // maxDate={FilterMaxDate}
                            value={props.values.nextServiceDate}
                            onChange={(newValue) => {
                              props.setFieldValue("nextServiceDate", newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="standard"
                                {...params}
                                fullWidth
                                name="nextServiceDate"
                                error={
                                  props.errors.nextServiceDate &&
                                  props.touched.nextServiceDate
                                    ? true
                                    : false
                                }
                                helperText={
                                  props.errors.nextServiceDate &&
                                  props.touched.nextServiceDate
                                    ? props.errors.nextServiceDate
                                    : null
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Typography variant="subtitle1" component="h4">
                            Upload Old Policy Copy
                          </Typography>
                          <TextField
                            hiddenLabel={true}
                            type="file"
                            variant="standard"
                            fullWidth
                            name="oldPolicyFile"
                            value={props.values.oldPolicyFile}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.oldPolicyFile &&
                              props.touched.oldPolicyFile
                                ? props.errors.oldPolicyFile
                                : null
                            }
                            error={
                              props.errors.oldPolicyFile &&
                              props.touched.oldPolicyFile
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
                            Add Vehicle
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Form>
                  </>
                )}
              </Formik>
            )}
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default AddRecordVehicle;
