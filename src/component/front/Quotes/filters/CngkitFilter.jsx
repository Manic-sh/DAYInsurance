import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { EventEmitter } from "../../../../services/events";
import { get } from "lodash";

const CngkitFilter = (props) => {
  const { store } = props;
  const selectedData = store.quotes.getCngFilterDetails();
  const [elecAcessories, setElecAcessories] = useState(
    get(selectedData, "ElecAcessories", "")
  );
  const [nonElecAcessories, setNonElecAcessories] = useState(
    get(selectedData, "NonElecAcessories", "")
  );
  const [cngAmount, setCNGAmount] = useState(
    get(selectedData, "CNGAmount", "")
  );
  const [isCNGFitted, setIsCNGFitted] = useState(
    get(selectedData, "IsCNGFitted", false)
  );
  const [fit, setFit] = useState(get(selectedData, "IsCompanyFit", true));

  // handleCNG
  const handleCNG = (event) => {
    setIsCNGFitted(event.target.value);
  };

  // handleFit
  const handleFit = (event) => {
    setFit(event.target.value);
  };

  const applyFilter = async () => {
    const accessoriesPayload = {
      ElecAcessories: elecAcessories,
      NonElecAcessories: nonElecAcessories,
      EnquiryNo: store.insurance.getEnqNo(),
    };
    await store.quotes.postAddAccessoriesFilter(accessoriesPayload);

    const addBiFuelPayload = {
      IsCNGFitted: isCNGFitted,
      CNGAmount: fit ==="true" ? 0 : cngAmount,
      EnquiryNo: store.insurance.getEnqNo(),
    };
    const res = await store.quotes.postAddBiFuelFilter(addBiFuelPayload);
    EventEmitter.dispatch("filterByAddBiFuel", res);
    const filterData = {
      ElecAcessories: elecAcessories,
      NonElecAcessories: nonElecAcessories,
      IsCNGFitted: isCNGFitted,
      IsCompanyFit: fit,
      CNGAmount: cngAmount,
    };
    store.quotes.setCngFilterDetails(filterData);
    setState({
      right: false,
    });
    EventEmitter.dispatch("closeDrawer");
  };

  // drawer
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const anchor = "left";
  // drawer

  return (
    <>
      <ListItemButton onClick={toggleDrawer(anchor, true)}>
        <ListItemText
          primary="CNG Kit & Accessories"
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: 600,
          }}
        />
      </ListItemButton>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onBackdropClick={toggleDrawer(anchor, false)}
      >
        <Box
          sx={{
            width: { md: "380px", xs: "280px" },
            p: 1,
          }}
          role="presentation"
        >
          <Grid container rowSpacing={2}>
            <Grid
              item
              sx={{ textAlign: "end", color: "text.secondary" }}
              xs={12}
            >
              <CloseIcon
                onClick={toggleDrawer(anchor, false)}
                sx={{ cursor: "pointer", fontSize: "30px" }}
              />
            </Grid>
            <Grid item xs={12} align="end">
              <Button onClick={applyFilter} variant="outlined">
                Apply Filter
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Electrical Accessories"
                variant="outlined"
                fullWidth
                type="number"
                value={elecAcessories}
                onChange={(e) => {
                  setElecAcessories(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Non-Electrical Accessories"
                variant="outlined"
                fullWidth
                type="number"
                value={nonElecAcessories}
                onChange={(e) => {
                  setNonElecAcessories(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Is CNG ?</FormLabel>
                <RadioGroup
                  value={isCNGFitted}
                  onChange={handleCNG}
                  row
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {isCNGFitted === "true" && (
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Out Fit/Company Fit</FormLabel>
                  <RadioGroup
                    value={fit}
                    onChange={handleFit}
                    row
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            )}
            {fit === "false" && isCNGFitted === "true" && (
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  label="CNG Amount"
                  value={cngAmount}
                  onChange={(e) => {
                    setCNGAmount(e.target.value);
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default CngkitFilter;
