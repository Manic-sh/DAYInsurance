import CloseIcon from "@mui/icons-material/Close";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { get } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { EventEmitter } from "../../../services/events";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Schema = Yup.object().shape({
  clientName: Yup.string().required("Client Name is Required"),
  chequeNumber: Yup.string().required("Cheque Number is Required"),
  bankName: Yup.string().required("Bank Name is Required"),
  chequeAmount: Yup.string().required("cheque Amount is Required"),
  chequeDate: Yup.date().nullable().required("Cheque Date is Required")
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const ChequeDetails = (props) => {
  const { store } = props;
  const [open, setOpen] = useState(props.open);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bankInfo, setBankInfo] = useState([]);
  const selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
  const EnqNo = store.insurance.getEnqNo();
  let navigate = useNavigate();
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpenSnackbar(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  const descriptionElementRef = useRef(null);
  const fetchBankInfo = async () => {
    const res = await store.proposal.fetchBankInfo(props.item.SupplierId);
    setBankInfo(res[0]);
    setOpen(true);
  };
  /*eslint-disable */
  useEffect(() => {
    EventEmitter.subscribe("showCheckDetail", async () => {
      await fetchBankInfo()
      setOpen(true);
    });
    if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
    }
  }, [open]);
  /*eslint-enable */

  const handleSubmit = async (values) => {
    const res = await store.proposal.saveCheckInfo(values);
    if (res.data === "Success") {
      navigate(`/ResultPaymentStatus?EnquiryNo=${EnqNo}&Chequestatus=holding&finalPremium=${selectedItem.FinalPremium}&chequePolicyNo=holding`);
    } else {
      setOpenSnackbar(true);
    }
  };
  const handleClose = () => {
        setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        scroll={"body"}
        TransitionComponent={Transition}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
          color="primary.main"
        >
          Fill Details
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <Formik
          initialValues={{
            insuranceCompanyName: get(bankInfo, "CompanyName", ""),
            beneficiaryName: get(bankInfo, "AccountHolderName", ""),
            beneficiaryBankName: get(bankInfo, "BankName", ""),
            beneficiaryBranch: get(bankInfo, "BranchLocation", ""),
            beneficiaryAccountNum: get(bankInfo, "AccountNo", ""),
            beneficiaryIfscCode: get(bankInfo, "IFSCCode", ""),
            clientName: "",
            chequeNumber: "",
            bankName: "",
            chequeAmount: "",
            chequeDate: ""
          }}
          validationSchema={Schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <>
                <DialogContent dividers={false}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Insurance Company Name"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.insuranceCompanyName}
                        name="insuranceCompanyName"
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        label="Beneficiary Name"
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.beneficiaryName}
                        name="beneficiaryName"
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Beneficiary Bank Name"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.beneficiaryBankName}
                        name="beneficiaryBankName"
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Beneficiary Branch"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.beneficiaryBranch}
                        name="beneficiaryBranch"
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Beneficiary AccountNo"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.beneficiaryAccountNum}
                        name="beneficiaryAccountNum"
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Beneficiary IFSC Code"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.beneficiaryIfscCode}
                        name="beneficiaryIfscCode"
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Client Name"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.clientName}
                        name="clientName"
                        error={
                          props.errors.clientName && props.touched.clientName
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.clientName && props.touched.clientName
                            ? props.errors.clientName
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Cheque Number"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.chequeNumber}
                        name="chequeNumber"
                        error={
                          props.errors.chequeNumber &&
                          props.touched.chequeNumber
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.chequeNumber &&
                          props.touched.chequeNumber
                            ? props.errors.chequeNumber
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Cheque Bank"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.bankName}
                        name="bankName"
                        error={
                          props.errors.bankName && props.touched.bankName
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.bankName && props.touched.bankName
                            ? props.errors.bankName
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-basic"
                        label="Cheque Amount"
                        variant="outlined"
                        fullWidth
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.chequeAmount}
                        name="chequeAmount"
                        error={
                          props.errors.chequeAmount &&
                          props.touched.chequeAmount
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.chequeAmount &&
                          props.touched.chequeAmount
                            ? props.errors.chequeAmount
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <MobileDatePicker
                          label="Cheque Date"
                          toolbarPlaceholder=""
                          toolbarTitle="Select a Cheque Date"
                          value={props.values.chequeDate}
                          name="chequeDate"
                          disableCloseOnSelect={false}
                          onBlur={props.handleBlur}
                          onChange={(newValue) => {
                            props.setFieldValue("chequeDate", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="chequeDate"
                              fullWidth
                              error={
                                props.errors.chequeDate &&
                                props.touched.chequeDate
                                  ? true
                                  : false
                              }
                              helperText={
                                props.errors.chequeDate &&
                                props.touched.chequeDate
                                  ? props.errors.chequeDate
                                  : null
                              }
                            />
                          )}
                        />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    variant="outlined"
                    // onClick={handleClose}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </>
            </form>
          )}
        </Formik>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        action={action}
        TransitionComponent={SlideTransition}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setOpenSnackbar(false)}
        >
          Failed, we are facing technical issue try again later !
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChequeDetails;
