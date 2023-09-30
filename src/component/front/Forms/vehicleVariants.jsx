import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
// import size from "lodash/size";
import { getSnapshot } from "mobx-state-tree";
import PropTypes from "prop-types";
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}
/*eslint-disable */
const VehicleVariants = (props) => {
  const { store } = props;
  store.insurance.fetchRTO();
  

  const vehicleVariantsData = getSnapshot(store.insurance.vehicleVariants);
  const vehicleModelSelected = store.insurance.vehicleModelSelected;

  const fuelId = store.insurance.fuelId;
  const variantId = store.insurance.variantId;
  let indexValue = 0;
  let variantSelected = {};
  vehicleVariantsData.map((fuel, index) => {
    if(fuel.FUELID === fuelId) {
      indexValue = index;
      variantSelected = fuel.variants.filter((v) => v.VariantID === variantId)
    }
  })
  
  const [value, setValue] = useState(indexValue);
  const [VariantSelected,setVariantSelected] = useState(variantSelected[0]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (item, fuel) => {
    setVariantSelected(item);
    store.insurance.setVariantId(item);
    store.insurance.setFuelId(fuel);
    store.insurance.setCubicCapacity(item.VehicleCC);
    store.insurance.setMasterVehicleCode(String(parseInt(item.MasterVehicleCode)));
    store.page.changePage(6);
    props.onChange(6);
  };

  const goBack = () => {
    store.page.changePage(3);
    props.onChange(3);
  };

  return (
    <>
      <Grid
        container
        sx={{
          alignItems: "start",
          mb: 2,
          flexDirection: "row",
          justifyContent: "start",
          flexWrap: "nowrap"
        }}
      >
        <ArrowCircleLeftOutlinedIcon
          onClick={goBack}
          sx={{
            color: "primary.main",
            mr: 1,
            fontSize: { xs: "25px", sm: "30px" },
            cursor: "pointer"
          }}
        />
        <Typography
          variant="h4"
          color="text.secondary"
          className="main_heading"
          sx={{ textAlign: "left" }}
        >
          {`Select Variant of ${vehicleModelSelected} do you have ?`}
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            position="static"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {vehicleVariantsData.map((fuel, index) => (
                <Tab
                  key={index}
                  label={fuel.FUELNAME}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          {vehicleVariantsData &&
            vehicleVariantsData.map((fuel, index) => (
              <TabPanel
                key={index}
                value={value}
                index={index}
                className="fuel_tabs"
              >
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  sx={{my: 2, mb: 0}}
                  options={fuel.variants}
                  onChange={(e, value) => {
                    handleClick(value, fuel)
                  }}
                  value={VariantSelected}
                  name="VariantSelected"
                  // onClick={(e) => handleClick(e, fuel)}
                  renderOption={(props, option) => (
                    <li {...props} key={option.VariantID} md="3" className="custom_autocomplete_item">
                      {option.VariantName}
                    </li>
                  )}
                  getOptionLabel={(option) =>
                    option.VariantName
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Fuel varients"
                      InputProps={{
                        ...params.InputProps,
                        type: "search"
                      }}
                />
        )}
              />
                <List
                  aria-label="contacts"
                  component="nav"
                  className="inner_scrollbar"
                  sx={{
                    maxHeight: "300px",
                    overflowY: "scroll",
                    width: "100%",
                    bgcolor: "background.paper"
                  }}
                >
                  {fuel.variants.map((item,index) => (
                    <div key={index}>
                      <ListItem
                        onClick={() => handleClick(item, fuel)}
                        disablePadding
                        button
                      >
                        <ListItemButton>
                          <ListItemText
                            inset
                            primary={
                              <Typography variant="body1" sx={{fontWeight: 600}}>{item.VariantName}</Typography>
                              }
                            sx={{ p: 0}}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider light />
                    </div>
                  ))}
                </List>
              </TabPanel>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default VehicleVariants;