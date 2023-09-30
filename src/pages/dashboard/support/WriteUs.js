import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { get } from "lodash";
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
// import TextareaAutosize from "@mui/material/TextareaAutosize";

import Page from "../../../component/dashboard/Page";
// import { getAddRecordPolicyId } from "../../../store/redux/dashboard/manage/AddRecordPolicySlice";
import { addRecordPolicy } from "../../../api/dashboard/manage/addRecordPolicy";

const WriteUs = () => {
  const { Auth } = useAuth();
  const dispatch = useDispatch();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const updatedByEmail = get(Auth, "data.Userid", "");

  // const dashboard_data = useSelector((state) => state.dashboard_data);
  const record_policy_id = useSelector((state) => state.add_record_policy_data);
  useEffect(() => {
    dispatch(
      // getAddRecordPolicyId({
      //   Userid: Auth.data.Userid,
      // })
    );
  }, [dispatch, Auth]);
  console.log("record_policy_id", record_policy_id);

  const schemaObj = Yup.object().shape({
    queryId: Yup.string().required("Query Id is Required"),
    policyType: Yup.string().required("Policy Type is Required"),
    queryFor: Yup.string().required("Query For is Required"),
    policyNo: Yup.string().required("Policy No is Required"),
    remark: Yup.string().required("Remark is Required"),
    fileType: Yup.string().required("File Type is Required"),
    uploadFile: Yup.string().required("File is Required"),
  });

  const queryForList = [
    {
      value: "Amount Adjustment",
      label: "Amount Adjustment",
    },
    {
      value: "Amount Refund",
      label: "Amount Refund",
    },
    {
      value: "Complaint Against Staff",
      label: "Complaint Against Staff",
    },
    {
      value: "Cover Note not Recieved",
      label: "Cover Note not Recieved",
    },
    {
      value: "Others",
      label: "Others",
    },
    {
      value: "Policy Cancellation",
      label: "Policy Cancellation",
    },
    {
      value: "Policy Endorsment",
      label: "Policy Endorsment",
    },
    {
      value: "Policy Not Recieved",
      label: "Policy Not Recieved",
    },
    {
      value: "Policy Renewal",
      label: "Policy Renewal",
    },
    {
      value: "Report Claim",
      label: "Report Claim",
    },
  ];
  const policyTypeList = [
    {
      value: "HEALTH",
      label: "HEALTH",
    },
    {
      value: "LIFE",
      label: "LIFE",
    },
    {
      value: "MOTOR",
      label: "MOTOR",
    },
    {
      value: "NON",
      label: "NON",
    },
  ];
  const fileTypeList = [
    {
      value: "Aadhar",
      label: "Aadhar",
    },
    {
      value: "Affidavit",
      label: "Affidavit",
    },
    {
      value: "Claim form",
      label: "Claim form",
    },
    {
      value: "License",
      label: "License",
    },
    {
      value: "Others",
      label: "Others",
    },
    {
      value: "Photograph",
      label: "Photograph",
    },
    {
      value: "Policy Copy",
      label: "Policy Copy",
    },
    {
      value: "RC copy",
      label: "RC copy",
    },
  ];

  const pageTitle = "Write Us";
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
                  queryId: "ID123",
                  policyType: "",
                  queryFor: "",
                  policyNo: "",
                  remark: "",
                  fileType: "",
                  uploadFile: "",
                }}
                validationSchema={schemaObj}
                onSubmit={async (values, actions) => {
                  setLoadingSubmit(true);
                  await addRecordPolicy({
                    ...values,
                    Userid: Auth.data.Userid,
                  });
                  toast.success("Record Policy Added Successfully");
                  setLoadingSubmit(false);
                }}
              >
                {(props) => (
                  <>
                  {console.log(props)}
                    <Form>
                      <Grid
                        container
                        spacing={4}
                        direction="row"
                        justifyContent="start-flex"
                        alignItems="start-flex"
                        sx={{ pb: 2 }}
                      >
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            disabled
                            label="Query ID"
                            variant="standard"
                            fullWidth
                            name="queryId"
                            value={props.values.queryId}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.queryId && props.touched.queryId
                                ? props.errors.queryId
                                : null
                            }
                            error={
                              props.errors.queryId && props.touched.queryId
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
                        justifyContent="start-flex"
                        alignItems="start-flex"
                      >
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            select
                            fullWidth
                            variant="standard"
                            label="Policy Type"
                            name="policyType"
                            value={props.values.policyType}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.policyType &&
                              props.touched.policyType
                                ? props.errors.policyType
                                : null
                            }
                            error={
                              props.errors.policyType &&
                              props.touched.policyType
                                ? true
                                : false
                            }
                          >
                            {policyTypeList.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            select
                            fullWidth
                            variant="standard"
                            label="Query For"
                            name="queryFor"
                            value={props.values.queryFor}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.queryFor && props.touched.queryFor
                                ? props.errors.queryFor
                                : null
                            }
                            error={
                              props.errors.queryFor && props.touched.queryFor
                                ? true
                                : false
                            }
                          >
                            {queryForList.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="Policy No"
                            variant="standard"
                            fullWidth
                            name="policyNo"
                            value={props.values.policyNo}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.policyNo && props.touched.policyNo
                                ? props.errors.policyNo
                                : null
                            }
                            error={
                              props.errors.policyNo && props.touched.policyNo
                                ? true
                                : false
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <TextField
                          type="textarea"
                            label="Remark"
                            variant="standard"
                            fullWidth
                            name="remark"
                            value={props.values.remark}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.remark && props.touched.remark
                                ? props.errors.remark
                                : null
                            }
                            error={
                              props.errors.remark && props.touched.remark
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
                            label="File Type"
                            name="fileType"
                            value={props.values.fileType}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.fileType && props.touched.fileType
                                ? props.errors.fileType
                                : null
                            }
                            error={
                              props.errors.fileType && props.touched.fileType
                                ? true
                                : false
                            }
                          >
                            {fileTypeList.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Typography variant="subtitle1" component="h4">
                            Upload File
                          </Typography>
                          <TextField
                            hiddenLabel={true}
                            type="file"
                            variant="standard"
                            fullWidth
                            name="uploadFile"
                            value={props.values.uploadFile}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={
                              props.errors.uploadFile &&
                              props.touched.uploadFile
                                ? props.errors.uploadFile
                                : null
                            }
                            error={
                              props.errors.uploadFile &&
                              props.touched.uploadFile
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
                           Send Query
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

export default WriteUs;
