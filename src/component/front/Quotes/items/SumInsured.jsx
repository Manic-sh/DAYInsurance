import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { get } from "lodash";
// import { fetchQuotesAPI } from "../../common/common";
// import { getSnapshot } from "mobx-state-tree";
import { EventEmitter } from "../../../../services/events";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SumInsured = (props) => {
  const { store } = props;
  // let quotes = getSnapshot(store.quotes);
  // let items = quotes.items;
  const customIDV = props.customIDV;
  const MinIDV = parseInt(get(customIDV, "MINIDV", ""));
  const MaxIDV = parseInt(get(customIDV, "MAXIDV", ""));
  // const IDV = parseInt(get(customIDV, "IDV", ""));
  const recommendedIDV = parseInt(get(props, "item.SupplierIdv", ""));
  const companyID = parseInt(get(props, "item.SupplierId", ""));
  const [IDVType, setIDVType] = useState("recommendedIDV");
  const [IDVValue, setIDVValue] = useState(MinIDV);
  const [IDVChooseDefault, setIDVChooseDefault] = useState(recommendedIDV);
  const [open, setOpen] = useState(props.open);
  const applyFilter = async () => {
    const payload = {
      IDV: IDVValue,
      EnquiryNo: store.insurance.getEnqNo(),
      CompanyID: companyID
    };
    // CompanyID: "124",
    const res = await store.quotes.postCustomIDVFilter(payload);
    EventEmitter.dispatch("filterByIDV", res);
    // fetchQuotesAPI(props.store, props.customGetData, 'filterByIDV');
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    props.close();
  };
  const handleChange = (event) => {
    setIDVType(event.target.value);
    switch (event.target.value) {
      case "recommendedIDV":
        setIDVValue(recommendedIDV);
        setIDVChooseDefault(recommendedIDV);
        store.quotes.setSelectedIdvType("recommendedIDV");
        break;
      case "MaximumIDV":
        setIDVValue(MaxIDV);
        setIDVChooseDefault(MaxIDV);
        store.quotes.setSelectedIdvType("MaximumIDV");
        break;
      case "LowestIDV":
        setIDVValue(MinIDV);
        setIDVChooseDefault(MinIDV);
        store.quotes.setSelectedIdvType("LowestIDV");
        break;
      default:
        store.quotes.setSelectedIdvType("recommendedIDV");
        break;
    }
  };

  const handleSetIDV = (value) => {
    setIDVValue(value);
    setIDVChooseDefault(value);
  };
  const validateIDVValue = () => {
    if (IDVValue > MaxIDV || IDVValue < MinIDV) {
      setIDVValue(MinIDV);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="md"
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
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
          Insured value (IDV)
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel id="demo-radio-buttons-group-label">
                  Set By
                </FormLabel>
                <RadioGroup
                  // defaultValue={false}
                  name="radio-buttons-group"
                  value={IDVType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={"LowestIDV"}
                    control={<Radio />}
                    label="Lowest IDV"
                  />
                  <FormControlLabel
                    value={"recommendedIDV"}
                    control={<Radio />}
                    label={`Recommended IDV (₹ ${recommendedIDV})`}
                  />
                  <FormControlLabel
                    value={"MaximumIDV"}
                    control={<Radio />}
                    label="Maximum IDV"
                  />
                  <FormControlLabel
                    value={"customIDV"}
                    control={<Radio />}
                    label="Choose your IDV"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) =>
                  handleSetIDV(e.target.value ? parseInt(e.target.value) : 0)
                }
                onBlur={(e) => validateIDVValue()}
                value={IDVChooseDefault}
                disabled={IDVType !== "customIDV"}
                id="outlined-basic"
                label={`Enter an IDV between ${MinIDV}-${MaxIDV}`}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={applyFilter}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SumInsured;
