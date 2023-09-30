import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { clone, size } from "lodash";
import { getSnapshot } from "mobx-state-tree";
import React, { useState } from "react";
import * as Yup from "yup";
import SendMailCard from "./SendMailCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SendEmail = (props) => {
  /*eslint-disable */
  const { store } = props;

  const sendEmailProduct = clone(getSnapshot(store.quotes.sendEmailProduct));
  const EnqNo = store.insurance.getEnqNo();
  const data = store.insurance.getHeaderDetails();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  let schemaObj = Yup.object().shape({
    toEmail: Yup.string()
      .email("Invalid email")
      .required("To Email is Required"),
    ccEmail: Yup.string()
      .email("Invalid email")
      .required("CC Email is Required"),
    // bccEmail: Yup.string()
    //   .email("Invalid email")
    //   .required("BCC Email is Required")
  });

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    let requestData = sendEmailProduct.map((value, index) => {
      return {PlanId: value.PlanId,CompanyID:value.SupplierId,Premium:value.PackagePremium};
    });


    const payload = {
      To: values.toEmail,
      CC: values.ccEmail,
      Subject: values.subject,
      messageText: values.remark,
      EnquiryNo: EnqNo,
      comparisionPlan: requestData
    };
    console.log("payload", payload);
    await store.proposal.sendEmail(payload);
    handleClose();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen("paper")}>
        Send Email
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          sx={{
            fontSize: { md: "18px", xs: "14px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          color="primary.main"
          id="scroll-dialog-title"
        >
          {`${data.manufacturer} ${data.modelName} ${data.variantName} ${data.fuel} ( ${data.cubicCapacity} cc )`}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider light />
        <Formik
          initialValues={{
            toEmail: "",
            ccEmail: "",
            bccEmail: "",
            subject: "",
            remark: "",
          }}
          validationSchema={schemaObj}
          onSubmit={async (values, { resetForm }) => {
            await handleSubmit(values);
            resetForm();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <>
                <DialogContent dividers={scroll === "paper"}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {size(sendEmailProduct) === 0 && (
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            textTransform: "capitalize",
                            mb: 1,
                            display: "block",
                            color: "text.primary",
                          }}
                        >
                          ( No Record Selected, click send email option of any
                          insurance plan which you want to send email )
                        </Typography>
                      )}
                      <SendMailCard sendEmailProduct={sendEmailProduct} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        id="to"
                        label="To"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.toEmail}
                        name="toEmail"
                        error={
                          props.errors.toEmail && props.touched.toEmail
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.toEmail && props.touched.toEmail
                            ? props.errors.toEmail
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        id="cc"
                        label="CC"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.ccEmail}
                        name="ccEmail"
                        error={
                          props.errors.ccEmail && props.touched.ccEmail
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.ccEmail && props.touched.ccEmail
                            ? props.errors.ccEmail
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        id="bcc"
                        label="BCC"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.bccEmail}
                        name="bccEmail"
                        error={
                          props.errors.bccEmail && props.touched.bccEmail
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.bccEmail && props.touched.bccEmail
                            ? props.errors.bccEmail
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        id="subject"
                        label="Subject"
                        onChange={props.handleChange}
                        value={props.values.subject}
                        name="subject"
                        // error
                        // helperText="Incorrect entry."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        rows={3}
                        id="remark"
                        label="Remark"
                        onChange={props.handleChange}
                        value={props.values.remark}
                        name="remark"
                        // error
                        // helperText="Incorrect entry."
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                    endIcon={<SendIcon />}
                  >
                    Send Email
                  </Button>
                </DialogActions>
              </>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default SendEmail;
