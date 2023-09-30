import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { get } from "lodash";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import {submitQuery} from '../../../api/dashboard/support'
// import {getQueryData} from '../../../api/dashboard/support'

const QueryStatusModal = ({ handleClose, open }) => {
  const { Auth } = useAuth();
  const updatedByEmail = get(Auth, "data.Userid", "");
  const [loadingSubmit, setLoadingSubmit] = useState(false);


  const submitHandler = () => {
    handleClose();
  };

  const schemaObj = Yup.object().shape({
    comment: Yup.string().required("Comment is Required"),
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <Formik
          initialValues={{
            queryId: "ID123",
            comment: "",
          }}
          validationSchema={schemaObj}
          onSubmit={async (values, actions) => {
            setLoadingSubmit(true);
            await submitQuery({
              ...values,
              Userid: updatedByEmail,
            });
            toast.success("Query Added Successfully");
            setLoadingSubmit(false);
            handleClose();
          }}
        >
          {(props) => (
            <>
              {console.log(props)}
              <Form>
                <DialogTitle>Query ID : QR20225264</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Query For :Amount Adjustment
                  </DialogContentText>
                  <DialogContentText>Status :PENDING</DialogContentText>
                  <TextareaAutosize
                    maxRows={10}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="[abhinav.singh@dayibpl.com 26-05-2022 15:21:23 ] : test[abhinav.singh@dayibpl.com 26-05-2022 15:21:48] : lkjklj
[abhinav.singh@dayibpl.com 31-05-2022 16:04:22] : test
[abhinav.singh@dayibpl.com 31-05-2022 16:06:41] : 
[abhinav.singh@dayibpl.com 31-05-2022 16:06:52] : 
[abhinav.singh@dayibpl.com 08-06-2022 13:59:15] : sdfsdfsd"
                    style={{ width: "100%" }}
                    disabled
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Add Your Comment"
                    name="comment"
                    value={props.values.comment}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={
                      props.errors.comment && props.touched.comment
                        ? props.errors.comment
                        : null
                    }
                    error={
                      props.errors.comment && props.touched.comment
                        ? true
                        : false
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ p: 10 }}
                  >
                    <Grid item xs={12} sm={12} md={12}>
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
                    <Grid item xs={12} sm={6} md={6}>
                      <LoadingButton
                        onClick={handleClose}
                        loading={loadingSubmit}
                        endIcon={<CancelIcon />}
                        loadingPosition="end"
                        variant="outlined"
                        fullWidth
                      >
                        Cancel
                      </LoadingButton>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LoadingButton
                        onClick={submitHandler}
                        loading={loadingSubmit}
                        endIcon={<ThumbUpAltIcon />}
                        loadingPosition="end"
                        variant="contained"
                        fullWidth
                      >
                        Query Solved
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Form>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};
export default QueryStatusModal;
