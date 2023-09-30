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

const CompanyListfilter = (props) => {
  const { store } = props;
  const companySelected = store.quotes.getCompanySelected();
  const [company, setCompany] = useState(companySelected);
  const companyList = props.companyList;
  // drawer
  const [state, setState] = useState({
    left: true
  });

  const handleClose = () => {
    setState({
      right: false
    });
    setTimeout(() => {
      props.close();
    }, 500);
  };

  const handleChange = (e, key) => {
    if (e.target.checked) {
      setCompany(company.concat(key));
    } else {
      const filteredAry = company.filter((e) => e !== key);
      setCompany(filteredAry);
    }
  };

  const filterData = () => {
    // setLoading(true);
    EventEmitter.dispatch("filterByCompany", company);
    handleClose();
    EventEmitter.dispatch("closeDrawer");
  };
  const anchor = "left";

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
              {
                companyList.map((c) => {
                  return(
                    <Grid item xs={12} key={c.CustQutBrkDetailId}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checkedIcon={<LibraryAddCheckIcon />}
                            checked={company.includes(c.SupplierName)}
                            onChange={(e) => handleChange(e, c.SupplierName)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label={c.SupplierName}
                      />
                    </Grid>
                  )
                })
              }
            </Grid>
          </FormGroup>
        </Box>
      </Drawer>
    </>
  );
};

export default CompanyListfilter;
