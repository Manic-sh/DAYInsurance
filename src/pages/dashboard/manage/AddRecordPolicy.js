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
import {
  getProductList,
  getInsurerList,
} from "../../../store/redux/dashboard/manage/AddRecordPolicySlice";
import { addRecordPolicy } from "../../../api/dashboard/manage/addRecordPolicy";
import base64Convert from "../../../utils/base64Convert";

const AddRecordPolicy = () => {
  const { Auth } = useAuth();
  const dispatch = useDispatch();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const updatedByEmail = get(Auth, "data.Userid", "");

  // const dashboard_data = useSelector((state) => state.dashboard_data);
  const apiData = useSelector((state) => state.addRecordPolicyData);
  // console.log("apiData", apiData);
  useEffect(() => {
    dispatch(
      getProductList({
        Userid: Auth.data.Userid,
      })
    );
    dispatch(
      getInsurerList({
        Userid: Auth.data.Userid,
      })
    );
  }, [dispatch, Auth]);

  const schemaObj = Yup.object().shape({
    StartDate: Yup.string().required("Start Date is Required"),
    EndDate: Yup.string().required("End Date is Required"),
    PolicyNo: Yup.string().required("Policy No is Required"),
    Product: Yup.string().required("Product is Required"),
    Insurer: Yup.string().required("Insurance Company is Required"),
    filedata: Yup.string().required("File is Required"),
  });

  const pageTitle = "Add Record Policy";
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
            {!apiData.loadingInsurerList && !apiData.loadingProductList && (
              <Formik
                initialValues={{
                  StartDate: Moment(new Date()),
                  EndDate: Moment(new Date()).add(1, "year"),
                  PolicyNo: "",
                  Product: "",
                  Insurer: "",
                }}
                validationSchema={schemaObj}
                onSubmit={async (values, actions) => {
                  try {
                    setLoadingSubmit(true);
                    let filedata = "";
                    await base64Convert(values.filedata).then((result) => {
                      var arr = result.split(",");
                      console.log("result", arr);
                      filedata = arr[1];
                    });

                    let post_data = {
                      Userid: Auth.data.Userid,
                      StartDate: Moment(values.StartDate).format("YYYY-MM-DD"),
                      EndDate: Moment(values.EndDate).format("YYYY-MM-DD"),
                      PolicyNo: values.PolicyNo,
                      Product: values.Product,
                      Insurer: values.Insurer,
                      filedata: filedata,
                    };

                    const res = await addRecordPolicy(post_data);
                    console.log("res", res);
                    if (res.Message === "Success") {
                      toast.success("Record Policy Added Successfully");
                    } else {
                      toast.error("Some error has occurred!");
                    }
                  } catch (error) {}
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
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Start Date"
                            name="StartDate"
                            disableCloseOnSelect={false}
                            // minDate={FilterMinDate}
                            // maxDate={FilterMaxDate}
                            value={props.values.StartDate}
                            onChange={(newValue) => {
                              props.setFieldValue("StartDate", newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="standard"
                                {...params}
                                fullWidth
                                name="StartDate"
                                error={
                                  props.errors.StartDate &&
                                  props.touched.StartDate
                                    ? true
                                    : false
                                }
                                helperText={
                                  props.errors.StartDate &&
                                  props.touched.StartDate
                                    ? props.errors.StartDate
                                    : null
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            label="End Date"
                            name="EndDate"
                            disableCloseOnSelect={false}
                            // minDate={FilterMinDate}
                            // maxDate={FilterMaxDate}
                            value={props.values.EndDate}
                            onChange={(newValue) => {
                              props.setFieldValue("EndDate", newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                variant="standard"
                                {...params}
                                fullWidth
                                name="EndDate"
                                error={
                                  props.errors.EndDate && props.touched.EndDate
                                    ? true
                                    : false
                                }
                                helperText={
                                  props.errors.EndDate && props.touched.EndDate
                                    ? props.errors.EndDate
                                    : null
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="Policy No"
                            variant="standard"
                            fullWidth
                            name="PolicyNo"
                            value={props.values.PolicyNo}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.PolicyNo && props.touched.PolicyNo
                                ? props.errors.PolicyNo
                                : null
                            }
                            error={
                              props.errors.PolicyNo && props.touched.PolicyNo
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
                            label="Product"
                            name="Product"
                            value={props.values.Product}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.Product && props.touched.Product
                                ? props.errors.Product
                                : null
                            }
                            error={
                              props.errors.Product && props.touched.Product
                                ? true
                                : false
                            }
                          >
                            {apiData.data.productList.map((option) => (
                              <MenuItem
                                key={option.ProductName}
                                value={option.ProductName}
                              >
                                {option.ProductName}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            select
                            fullWidth
                            variant="standard"
                            label="Insurance Company"
                            name="Insurer"
                            value={props.values.Insurer}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.Insurer && props.touched.Insurer
                                ? props.errors.Insurer
                                : null
                            }
                            error={
                              props.errors.Insurer && props.touched.Insurer
                                ? true
                                : false
                            }
                          >
                            {apiData.data.insurerList.map((option) => (
                              <MenuItem
                                key={option.InsurerName}
                                value={option.InsurerName}
                              >
                                {option.InsurerName}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Typography variant="subtitle1" component="h4">
                            Upload Old Policy Copy
                          </Typography>
                          <TextField
                            hiddenLabel={true}
                            type="file"
                            inputProps={{ accept: "application/pdf" }}
                            variant="standard"
                            fullWidth
                            name="filedata"
                            onChange={(event) => {
                              props.setFieldValue(
                                "filedata",
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.filedata && props.touched.filedata
                                ? props.errors.filedata
                                : null
                            }
                            error={
                              props.errors.filedata && props.touched.filedata
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
                            Add Policy
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

export default AddRecordPolicy;
