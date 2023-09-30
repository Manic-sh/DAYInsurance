import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import GarageIcon from "@mui/icons-material/Garage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import GaragesContactTable from "./GaragesContactTable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Garages = (props) => {
  // console.log('props',props.item.SupplierId)
  const CompanyID = props.item.SupplierId;
  const { store } = props;
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [source, setSource] = useState("ALL");
  const [text, setText] = useState("");
  const [garages, setGarages] = useState([]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSource(event.target.value);
  };

  const handleSubmit = async() => {
    const res = await store.proposal.fetchGarages(CompanyID, source, text);
    setGarages(res);
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
      <Link
        variant="body1"
        color="text.primary"
        onClick={handleClickOpen("paper")}
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer"
        }}
      >
        Cashless Garages nearby you <GarageIcon />
      </Link>
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
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
          color="primary.main"
          id="scroll-dialog-title"
        >
          Network Garages Near You
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider light />
        <DialogContent
          dividers={scroll === "paper"}
          className="inner_scrollbar"
          sx={{ px: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={source}
                  label="Search By"
                  onChange={handleChange}
                >
                  <MenuItem value={'ALL'}>All</MenuItem>
                  <MenuItem value={'RTO'}>RTO</MenuItem>
                  <MenuItem value={'PINCODE'}>Pincode</MenuItem>
                  <MenuItem value={'CITY'}>City</MenuItem>
                  <MenuItem value={'STATE'}>State</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="outlined-basic"
                label="Enter Information"
                variant="outlined"
                fullWidth
                onChange={(e) => setText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{display: 'flex', alignItems: 'end', justifyContent: 'start'}}>
              <Button variant="contained" onClick={() => handleSubmit()}>Get Data</Button>
            </Grid>
            <Grid item xs={12}>
              {garages.length > 0 && <GaragesContactTable garages={garages}/>}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Garages;
