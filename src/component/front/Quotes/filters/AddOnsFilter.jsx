import CloseIcon from "@mui/icons-material/Close";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { EventEmitter } from "../../../../services/events";

const AddOnsFilter = (props) => {
  const { store } = props;
  const addOnSelected = store.quotes.getAddOnSelected();
  const [addOns, setAddOns] = React.useState(addOnSelected);
  const handleChange = (e, key) => {
    if (e.target.checked) {
      setAddOns(addOns.concat(key));
    } else {
      const filteredAry = addOns.filter((e) => e !== key);
      setAddOns(filteredAry);
    }
  };

  const filterData = () => {
    EventEmitter.dispatch("filterByAddOns", addOns);
    handleClose();
    EventEmitter.dispatch("closeDrawer");
  };

  // drawer
  const [state, setState] = useState({
    left: true
  });

  const anchor = "left";
  // drawer

  const handleClose = () => {
    setState({
      right: false
    });
    setTimeout(() => {
      props.close();
    }, 500);
  };
  //   Dilog Modal

  return (
    <>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onBackdropClick={() => handleClose()}
      >
        <Box
          sx={{
            width: { md: "380px", xs: "280px" },
            p: 1
          }}
          role="presentation"
        >
          <FormGroup>
            <Grid container>
              <Grid
                item
                sx={{ textAlign: "end", color: "text.secondary" }}
                xs={12}
              >
                <CloseIcon
                  onClick={handleClose}
                  sx={{ cursor: "pointer", fontSize: "30px" }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }} align="end">
                <Button onClick={() => filterData()} variant="outlined">
                  Apply Filter
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("NCB")}
                      onChange={(e) => handleChange(e, "NCB")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="NCB"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("COC")}
                      onChange={(e) => handleChange(e, "COC")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Consumables Cover"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("RSA")}
                      onChange={(e) => handleChange(e, "RSA")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Roadside Assistance 24X7"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("ZD")}
                      onChange={(e) => handleChange(e, "ZD")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Zero Depreciation"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("INPC")}
                      onChange={(e) => handleChange(e, "INPC")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Invoice Cover"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("EP")}
                      onChange={(e) => handleChange(e, "EP")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Engine Protector"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("PA")}
                      onChange={(e) => handleChange(e, "PA")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Passenger Assistance"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("COR")}
                      onChange={(e) => handleChange(e, "COR")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Courtesy Car"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("KLR")}
                      onChange={(e) => handleChange(e, "KLR")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Key Replacement"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("TC")}
                      onChange={(e) => handleChange(e, "TC")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Tyre Secure"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("MED")}
                      onChange={(e) => handleChange(e, "MED")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Medical Emergencies"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("HTL")}
                      onChange={(e) => handleChange(e, "HTL")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Hotel Expense"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("LPB")}
                      onChange={(e) => handleChange(e, "LPB")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Personal Baggage"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes("RIM")}
                      onChange={(e) => handleChange(e, "RIM")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Rim Damage Cover"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes('RIM')}
                      onChange={(e) => handleChange(e, 'RIM')}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Wind Shield Cover"
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes('RIM')}
                      onChange={(e) => handleChange(e, 'RIM')}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Fibre Glass Tank Cover"
                />
              </Grid> */}
              {/*  <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes('RIM')}
                      onChange={(e) => handleChange(e, 'RIM')}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Theft Cover"
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<LibraryAddCheckIcon />}
                      checked={addOns.includes('RIM')}
                      onChange={(e) => handleChange(e, 'RIM')}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Daily Allowance"
                />
              </Grid> */}
            </Grid>
          </FormGroup>
        </Box>
      </Drawer>
    </>
  );
};

export default AddOnsFilter;
