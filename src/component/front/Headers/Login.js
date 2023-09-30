import CloseIcon from "@mui/icons-material/Close";
import { default as Alert } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { get } from "lodash";
import React, { useState } from "react";

import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login = (props) => {
  const { store } = props;
  const { AuthActionLogin, AuthActionSetToken } = useAuth();


  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [value, setValue] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Schema = Yup.object().shape({
    userName: Yup.string().required("User Name is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleLogin = async (data) => {
    const ApiData = {
      username: data.userName,
      password: data.password,
      grant_type: "password",
    };
    const res = await store.login.saveLogin(ApiData);
    if (
      res.status === 200 &&
      get(res.data.access_token) !== null &&
      res.data["access_token"]
    ) {
      const minutes = get(res.data, "expires_in", 0);
      const expireDate = new Date(new Date().getTime() + minutes * 1000);
      AuthActionSetToken(res.data.access_token,expireDate);

      setUserInfo(expireDate, res.data.access_token, ApiData);
      setValue({
        ...value,
        message: "You are Logged in successfully",
        severity: "success",
      });
      setOpen(false);
    } else {
      setValue({
        ...value,
        message: "Username or password is incorrect",
        severity: "error",
      });
      setShowAlert(true);
    }
  };

  const setUserInfo = async (expireDate, token, ApiData) => {
    const userInfo = await store.login.fetchUserInfo(ApiData);
    const userAuth = {
      Userid: userInfo.Userid,
      Token: token,
    };
    store.login.setUserInfo(userAuth);
    AuthActionLogin(userInfo, expireDate);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="primary" sx={{ pb: 0 }}>
          Login
        </DialogTitle>
        <Formik
          initialValues={{
            userName: "",
            password: "",
          }}
          validationSchema={Schema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogContent>
                <Collapse in={showAlert}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setShowAlert(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                    variant="outlined"
                    severity={value.severity}
                  >
                    {value.message}
                  </Alert>
                </Collapse>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="User Name"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: "5px" }}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.userName}
                      name="userName"
                      error={
                        props.errors.userName && props.touched.userName
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.userName && props.touched.userName
                          ? props.errors.userName
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      name="password"
                      error={
                        props.errors.password && props.touched.password
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.password && props.touched.password
                          ? props.errors.password
                          : null
                      }
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                  //   onClick={handleClose}
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Login
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default Login;
