import CloseIcon from "@mui/icons-material/Close";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { get } from "lodash";
import React, { useState } from "react";
import { EventEmitter } from "../../../../services/events";

const LiabilityCoverFilter = (props) => {
  const { store } = props;
  const selectedData = store.quotes.getLiabilityFilterDetails();
  const HeaderDetailValues = store.insurance.getHeaderDetails();
  const motorCategory = HeaderDetailValues.motorCategory;
  const coverAmountRange =
    motorCategory !== "TW"
      ? [
          { title: "10,000", amount: 10000 },
          { title: "20,000", amount: 20000 },
          { title: "40,000", amount: 40000 },
          { title: "60,000", amount: 60000 },
          { title: "80,000", amount: 80000 },
          { title: "100,000", amount: 100000 },
          { title: "120,000", amount: 120000 },
          { title: "140,000", amount: 140000 },
          { title: "160,000", amount: 160000 },
          { title: "180,000", amount: 180000 },
          { title: "200,000", amount: 200000 },
        ]
      : [
          { title: "10,000", amount: 10000 },
          { title: "20,000", amount: 20000 },
          { title: "40,000", amount: 40000 },
          { title: "60,000", amount: 60000 },
          { title: "80,000", amount: 80000 },
          { title: "100,000", amount: 100000 },
        ];

  console.log("HeaderDetailValues");
  const [amount, setAmount] = useState(
    get(selectedData, "PassengerCoverAmount", "")
  );
  const [unnamePass, setUnnamePass] = useState(
    get(selectedData, "isUnnamedPassengerCoverOpted", false)
  );
  const [isLLToPaid, setIsLLToPaid] = useState(
    get(selectedData, "isLLToPaidDriverCoverOpted", false)
  );
  const [ownerDrivecover, setOwnerDrivecover] = useState(
    get(selectedData, "IsPAOwnerDriverCoverOpted", false)
  );

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

  const applyFilter = async () => {
    const payload = {
      IsPAOwnerDriverCoverOpted: ownerDrivecover,
      isUnnamedPassengerCoverOpted: unnamePass,
      UnnamedCoverAmount: amount,
      PassengerCoverAmount: 0,
      isLLToPaidDriverCoverOpted: isLLToPaid,
      EnquiryNo: store.insurance.getEnqNo(),
    };
    const res = await store.quotes.postLiabilityFilter(payload);
    EventEmitter.dispatch("filterByLiability", res);
    const filterData = {
      IsPAOwnerDriverCoverOpted: ownerDrivecover,
      isUnnamedPassengerCoverOpted: unnamePass,
      PassengerCoverAmount: amount,
      isLLToPaidDriverCoverOpted: isLLToPaid,
    };
    store.quotes.setLiabilityFilterDetails(filterData);
    setState({
      right: false,
    });
    EventEmitter.dispatch("closeDrawer");
  };

  return (
    <>
      <ListItemButton onClick={toggleDrawer(anchor, true)}>
        <ListItemText
          primary="Liability Covers"
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
              <FormControl component="fieldset">
                <FormLabel component="legend">Unname Passenger</FormLabel>
                <RadioGroup
                  value={unnamePass}
                  onChange={(e) => {
                    e.target.value === "false"
                      ? setUnnamePass(false)
                      : setUnnamePass(true);
                  }}
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

            {unnamePass === true && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Cover Amount
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={amount}
                    label="Select Cover Amount"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  >
                    {coverAmountRange.map((v, i) => {
                      return (
                        <MenuItem key={i} value={v.amount}>
                          {v.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<LibraryAddCheckIcon />}
                    checked={isLLToPaid}
                    onChange={(e) => {
                      setIsLLToPaid(e.target.checked);
                    }}
                  />
                }
                label="LL to Paid Driver"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<LibraryAddCheckIcon />}
                    checked={ownerDrivecover}
                    onChange={(e) => {
                      setOwnerDrivecover(e.target.checked);
                    }}
                  />
                }
                label="Owner Driver Cover"
              />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default LiabilityCoverFilter;
