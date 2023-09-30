import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import FilterDrawer from "../filters/FilterDrawer";
import ModifySearchDilogbox from "../search/ModifySearchDilogbox";
import SendEmail from "../search/SendEmail";
import HeaderDetail from "./HeaderDetail";
import {getSnapshot} from "mobx-state-tree";
import { size } from "lodash";
// import { getSnapshot } from "mobx-state-tree";

const QoutesHeader = (props) => {
  console.log("QoutesHeader", props.store);
  const { store } = props;
  const [open, setOpen] = useState(false);
  const handleChange = (value) => {
    console.log('switch',value);
    store.proposal.setIsListView(value);
   props.handleChange(value);
  };

  const handleSort = (value) => {
    props.handleSort(value);
  };

  const handleClickOpen = async () => {
    const motorCategory = store.insurance.getMotorCategory();

    size(getSnapshot(store.insurance.manufacturers)) === 0 &&
    await store.insurance.fetchManufacturer(motorCategory);


    size(getSnapshot(store.insurance.vehicleModels)) === 0 &&
    await store.insurance.fetchVehicleModel(
      parseInt(store.insurance.getManufacturerId()),
      motorCategory
    );

    // store.insurance.setVehicleModels(vm);
    const savedDetails = store.insurance.getSaveDetails();
    const ModelId = savedDetails.ModelId;

    size(getSnapshot(store.insurance.vehicleVariants)) === 0 &&
    await store.insurance.fetchVehicleVariants(ModelId, motorCategory);

    size(getSnapshot(store.insurance.rtoList)) === 0 &&
      (await store.insurance.fetchRTO());
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="100%" sx={{ px: { sm: 1, xs: 0 } }}>
          <Toolbar sx={{ py: 1, px: "10px" }}>
            <Grid container alignItems="center" spacing={1}>
              <Grid
                item
                xs={12}
                md={6}
                lg={8}
                sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
              >
                <HeaderDetail {...props} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    justifyContent: { md: "end", xs: "start" },
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleClickOpen("paper")}
                  >
                    Modify Search
                  </Button>

                  {open && (
                    <ModifySearchDilogbox
                      {...props}
                      close={() => setOpen(false)}
                    />
                  )}

                  <SendEmail {...props} />

                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FilterDrawer
                      handleSort={handleSort}
                      sortBy={props.sortBy}
                      {...props}
                    />
                    
                    <Checkbox
                      icon={
                        <AutoAwesomeMosaicIcon sx={{ color: "primary.main" }} />
                      }
                      checkedIcon={<TableRowsIcon />}
                      onChange={(e) => handleChange(e.target.checked)}
                      inputProps={{ "aria-label": "controlled" }}
                      checked={props.checked}
                      sx={{ display: { xs: "none", md: "block" } }}
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </Box>
    </>
  );
};

export default QoutesHeader;
