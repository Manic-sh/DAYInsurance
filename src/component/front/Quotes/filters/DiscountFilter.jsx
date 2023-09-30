import CloseIcon from "@mui/icons-material/Close";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { get } from "lodash";
import React, { useState } from "react";
import Moment from "moment";
import { EventEmitter } from "../../../../services/events";

const DiscountFilter = (props) => {
  const { store } = props;
  const selectedData = store.quotes.getDiscountFilterDetails();
  const [voluntary, setVoluntary] = useState(
    get(selectedData, "VoluntaryDeductibleAmount", "")
  );
  const [occupDiscount, setOccupDiscount] = useState(
    get(selectedData, "occupDiscount", "")
  );
  const [arai, setArai] = useState(
    get(selectedData, "AntiTheftDiscountOpted", "")
  );
  const [automobile, setAutomobile] = useState(
    get(selectedData, "AAMDiscountOpted", "")
  );
  const [aaiNumber, setAaiNumber] = useState(
    get(selectedData, "aaiNumber", "")
  );
  const [aaiName, setAaiName] = useState(
    get(selectedData, "aaiName", "")
  );
  const [date, setDate] = useState(get(selectedData, "aaiDate", new Date()));
  const HeaderDetailValues = store.insurance.getHeaderDetails();

  // drawer
  const [state, setState] = useState({
    right: false
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
      VoluntaryDeductibleOpted: true,
      VoluntaryDeductibleAmount: voluntary,
      AAMDiscountOpted: automobile,
      AntiTheftDiscountOpted: arai,
      EnquiryNo: store.insurance.getEnqNo(),
      AAIName:aaiName,
      AAINumber:aaiNumber,
      AAIDate:Moment(date).format("YYYY-MM-DD"),
    };

    const res = await store.quotes.postDiscountFilter(payload);
    EventEmitter.dispatch("filterByDiscount", res);

    const filterData = {
      VoluntaryDeductibleOpted: true,
      VoluntaryDeductibleAmount: voluntary,
      occupDiscount: occupDiscount,
      AAMDiscountOpted: automobile,
      AntiTheftDiscountOpted: arai,
      aaiName:aaiName,
      aaiNumber: aaiNumber,
      aaiDate: date
    };
    store.quotes.setDiscountFilterDetails(filterData);

    setState({
      right: false
    });
    EventEmitter.dispatch("closeDrawer");
  };
  return (
    <>
      <ListItemButton onClick={toggleDrawer(anchor, true)}>
        <ListItemText
          primary="Discount"
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: 600
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
            p: 1
          }}
          role="presentation"
        >
          <Grid container rowSpacing={1}>
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
            {HeaderDetailValues.motorCategory === "CAR" ? (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <Typography
                  variant="body2"
                  component="p"
                  mb={2}
                  color="text.secondary"
                  sx={{ fontSize: "16px" }}
                >
                  Voluntary
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={voluntary}
                    label="Select"
                    onChange={(e) => {
                      setVoluntary(e.target.value);
                    }}
                  >
                    <MenuItem value={2500}>2,500</MenuItem>
                    <MenuItem value={5000}>5,000</MenuItem>
                    <MenuItem value={7500}>7,500</MenuItem>
                    <MenuItem value={15000}>15,000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <Typography
                  variant="body2"
                  component="p"
                  mb={2}
                  color="text.secondary"
                  sx={{ fontSize: "16px" }}
                >
                  Voluntary
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={voluntary}
                    label="Select"
                    onChange={(e) => {
                      setVoluntary(e.target.value);
                    }}
                  >
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={750}>750</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={1500}>1500</MenuItem>
                    <MenuItem value={3000}>3000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Typography
                variant="body2"
                component="p"
                mb={2}
                color="text.secondary"
                sx={{ fontSize: "16px" }}
              >
                Want Occupation Discount
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="occupDiscount"
                  value={occupDiscount}
                  label="Select"
                  onChange={(e) => {
                    setOccupDiscount(e.target.value);
                  }}
                >
                  <MenuItem value={10}>
                    Doctors registered with Government
                  </MenuItem>
                  <MenuItem value={20}>
                    Central / State Government Employees
                  </MenuItem>
                  <MenuItem value={30}>
                    Teacher in Govt.recognized Institutions
                  </MenuItem>
                  <MenuItem value={40}>
                    Defense and Para Military Service
                  </MenuItem>
                  <MenuItem value={50}>
                    Practicing Chartered Accountant
                  </MenuItem>
                  <MenuItem value={60}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Typography
                variant="body2"
                component="p"
                mb={2}
                color="text.secondary"
                sx={{ fontSize: "16px" }}
              >
                Is your vehicle fitted with ARAI approved anti-theft device?
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={arai}
                  label="Select"
                  onChange={(e) => {
                    setArai(e.target.value);
                  }}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Typography
                variant="body2"
                component="p"
                mb={2}
                color="text.secondary"
                sx={{ fontSize: "16px" }}
              >
                Are you a member of Automobile Association of India?
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={automobile}
                  label="Select"
                  onChange={(e) => {
                    setAutomobile(e.target.value);
                  }}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container mt={1} rowSpacing={1}>
            {automobile && (
              <>
              <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    component="p"
                    mb={2}
                    color="text.secondary"
                    sx={{ fontSize: "16px" }}
                  >
                    Enter Your AAI Name
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="AAi Name"
                    variant="outlined"
                    value={aaiName}
                    name="aaiName"
                    onChange={(e) => {
                      setAaiName(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    component="p"
                    mb={2}
                    color="text.secondary"
                    sx={{ fontSize: "16px" }}
                  >
                    Enter Your AAI Number
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="AAi Number"
                    variant="outlined"
                    value={aaiNumber}
                    name="aaiNumber"
                    onChange={(e) => {
                      setAaiNumber(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    component="p"
                    mb={2}
                    color="text.secondary"
                    sx={{ fontSize: "16px" }}
                  >
                    Enter AAi Date
                  </Typography>
                    <MobileDatePicker
                      toolbarPlaceholder=""
                      label="AAi Date"
                      disableCloseOnSelect={false}
                      disablePast
                      value={date}
                      name="aaiDate"
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default DiscountFilter;
