import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { EventEmitter } from "../../../../services/events";
import AddOnsFilter from "./AddOnsFilter";
import CngkitFilter from "./CngkitFilter";
import CompanyListfilter from "./CompanyListfilter";
import DiscountFilter from "./DiscountFilter";
import IdvFilters from "./IdvFilters";
import LiabilityCoverFilter from "./LiabilityCoverFilter";

const FilterDrawer = (props) => {
  const { store } = props;

  const [sort, setSort] = useState(props.sortBy);
  const [filter, setFilter] = useState();
  const [companyList, setCompanyList] = useState();
  const [disabledFilter, setDisabledFilter] = useState(true);
  const anchor = "right";
  const [state, setState] = useState({
    right: false
  });
  useEffect(() => {
    EventEmitter.subscribe("closeDrawer", () => {
      setState({ right: false });
    });
    EventEmitter.subscribe("IsApplyFilter", () => {
      let IsApplyFilter = store.quotes.getIsApplyFilter();
      setDisabledFilter(IsApplyFilter);
    });
  }, [state, store.quotes]);



  const handleChange = (event) => {
    setSort(event.target.value);
    props.handleSort(event.target.value);
    EventEmitter.dispatch("shortingFilter", event.target.value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleClickOpen = async (name) => {
    if (name === "CompanyListfilter") {
      const EnqNo = store.insurance.getEnqNo();
      const items = await store.quotes.fetchQuote(EnqNo);
      const unique = [
        ...new Map(items.map((item) => [item["SupplierName"], item])).values()
      ];
      setCompanyList(unique);
    }
    setFilter(name);
  };
  return (
    <>
      <div>
        <Button
          onClick={toggleDrawer(anchor, true)}
          variant="outlined"
          disabled={disabledFilter}
        >
          Filter
        </Button>
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
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="h6"
                  color="primary.main"
                  mb={2}
                  sx={{ fontSize: "16px" }}
                >
                  Sort By Best Match
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Sort By Best Match
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort By Best Match"
                    onChange={handleChange}
                  >
                    <MenuItem value={"PREMIUM_LH"}>
                      Premium: Low to High
                    </MenuItem>
                    <MenuItem value={"PREMIUM_HL"}>
                      Premium: High to Low{" "}
                    </MenuItem>
                    <MenuItem value={"IDVLH"}>IDV: Low to High</MenuItem>
                    <MenuItem value={"IDVHL"}>IDV: High to Low </MenuItem>
                    <MenuItem value={"ODDISCOUNT_HL"}>
                      OD Discount: High to Low{" "}
                    </MenuItem>
                    <MenuItem value={"ODDISCOUNT_LH"}>
                      OD Discount: Low to High{" "}
                    </MenuItem>
                    <MenuItem value={"COMPANY_DESC"}>
                      Company : Alphabetically Desc
                    </MenuItem>
                    <MenuItem value={"COMPANY_ASC"}>
                      Company : Alphabetically Asc
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="h6"
                  color="primary.main"
                  sx={{ fontSize: "16px" }}
                >
                  Modify Your Results For Filters
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <IdvFilters {...props} />
                  </ListItem>
                  <ListItem disablePadding>
                    <DiscountFilter {...props} />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleClickOpen("AddOnsFilter")}
                    >
                      <ListItemText
                        primary="Add-Ons"
                        primaryTypographyProps={{
                          fontSize: 16,
                          fontWeight: 600
                        }}
                      />
                    </ListItemButton>
                    {filter === "AddOnsFilter" && (
                      <AddOnsFilter {...props} close={() => setFilter("")} />
                    )}
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleClickOpen("CompanyListfilter")}
                    >
                      <ListItemText
                        primary="Company List"
                        primaryTypographyProps={{
                          fontSize: 16,
                          fontWeight: 600
                        }}
                      />
                    </ListItemButton>
                    {filter === "CompanyListfilter" && (
                      <CompanyListfilter
                        {...props}
                        companyList={companyList}
                        close={() => setFilter("")}
                      />
                    )}
                  </ListItem>
                  <ListItem disablePadding>
                    <CngkitFilter {...props} />
                  </ListItem>
                  <ListItem disablePadding>
                    <LiabilityCoverFilter {...props} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Drawer>
      </div>
    </>
  );
};

export default FilterDrawer;
