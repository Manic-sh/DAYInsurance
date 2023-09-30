import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import CompareDataTable from "./CompareDataTable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CompareOffers = (props) => {
  const [open, setOpen] = React.useState(false);
  const { items } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleClickOpen} variant="outlined">Compare Offers</Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              sx={{color: "#fff"}}
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: "#fff" }} variant="h6" component="p">
              Compare offers
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12}>
            <CompareDataTable items={items} />
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default CompareOffers;
