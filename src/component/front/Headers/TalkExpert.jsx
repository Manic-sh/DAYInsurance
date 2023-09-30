import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import PropTypes from "prop-types";
import React from "react";
import CallExpertImg from "../../../assets/images/call-expert.png"
//  Modal
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

//   Tooltip
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    fontSize: 13
  }
}));

const TalkExpert = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BootstrapTooltip title="Talk to Expert" TransitionComponent={Zoom}>
        <IconButton
          variant="outlined"
          onClick={handleClickOpen}
          sx={{bgcolor: "primary.main",color: "primary.contrastText"}}
          className="pulse-btn"
          
        >
          <PhoneIcon sx={{ fontSize: { md: "25px", xs: "18px" } }}/>
        </IconButton>
      </BootstrapTooltip>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Talk To Expert
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Grid container>
            <Grid item align="center" xs={12}>
              <Box
                component="img"
                className="img_fluid"
                src={CallExpertImg}
                sx={{ width: { sm: "180px", xs: "120px" }, height: "auto" }}
              />
              <Typography
                gutterBottom
                variant="h6"
                component="h6"
                color="primary.main"
              >
                We will call you soon!
              </Typography>
              <Divider>
                <Chip label="&" color="primary" />
              </Divider>
              <Typography gutterBottom variant="body1" component="p">
                You can also reach us directily on below number:
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Box component="div">
                <List
                  sx={{
                    py: 0,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { md: "center" },
                    width: "100%"
                  }}
                >
                  <ListItem sx={{ p: 0 }}>
                    <ListItemAvatar>
                      <PhoneIcon />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ color: "text.secondary" }}
                      primary="Phone"
                      secondary={
                        <>
                          <Link
                            href="tel: 8588853301"
                            underline="none"
                            variant="body2"
                            color="text.secondary"
                          >
                            8588853301
                          </Link>
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemAvatar>
                      <EmailIcon />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ color: "text.secondary" }}
                      primary="Email"
                      secondary={
                        <>
                          <Link
                            href="mailto: info@dayibpl.com"
                            underline="none"
                            variant="body2"
                            color="text.secondary"
                          >
                            info@dayibpl.com
                          </Link>
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default TalkExpert;
