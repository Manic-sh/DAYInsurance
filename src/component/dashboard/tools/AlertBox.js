import React from "react";
import PropTypes from 'prop-types';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const AlertBox = ({ alertType, showAlert, title, message }) => {

  return showAlert ? (
    <Alert
      severity={alertType}
      color={alertType}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {}}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  ) : (
    <></>
  );
};

AlertBox.propTypes = {
    alertType: PropTypes.oneOf(["success", "error"]),
    showAlert: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  };

export default AlertBox;
