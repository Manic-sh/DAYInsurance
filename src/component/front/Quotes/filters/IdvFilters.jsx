import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { get } from "lodash";
import { getSnapshot } from "mobx-state-tree";
import PropTypes from "prop-types";
import { React, useState } from "react";
import { EventEmitter } from "../../../../services/events";

const IdvFilterDrawer = (props) => {
  const { store } = props;
  const selectedIdvType = store.quotes.getSelectedIdvType();
  const customIdvValue = store.quotes.getCustomIdvValue();
  let quotes = getSnapshot(store.quotes);
  let items = quotes.items;
  const MinIDV = parseInt(get(items, "[0].MinIDV", 0));
  const MaxIDV = parseInt(get(items, "[0].MaxIDV", 0));
  const recommendedIDV = parseInt(get(items, "[0].SupplierIdv", 0));
  const [IDVType, setIDVType] = useState(
    selectedIdvType !== null ? selectedIdvType : "recommendedIDV"
  );
  const [IDVValue, setIDVValue] = useState(MinIDV);
  const [IDVChooseDefault, setIDVChooseDefault] = useState(()=>{
    let value = selectedIdvType !== null ? customIdvValue : recommendedIDV;
    return value != null ? value: '';

  }
  );
  console.log('IDVChooseDefault',IDVChooseDefault);
  const savedDetails = store.insurance.getSaveDetails();
  const PreviousNCB = savedDetails.NCBDiscount;
  const IsClaimMad = savedDetails.IsClaimMade;

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
      case "customIDV":
        store.quotes.setSelectedIdvType("customIDV");
        break;
      default:
        store.quotes.setSelectedIdvType("recommendedIDV");
        break;
    }
  };

  const handleSetIDV = (value) => {
    setIDVValue(value);
    setIDVChooseDefault(value);
    store.quotes.setCustomIdvValue(value);
  };

  const validateIDVValue = () => {
    if (IDVValue > MaxIDV || IDVValue < MinIDV) {
      setIDVValue(MinIDV);
    }
  };

  const applyFilter = async () => {
    const payload = {
      IDV: IDVValue,
      EnquiryNo: store.insurance.getEnqNo(),
      PreviousNCB: PreviousNCB,
      IsClaimMade: IsClaimMad
    };
    const res = await store.quotes.postIDVFilter(payload);
    EventEmitter.dispatch("filterByIDV", res);
    EventEmitter.dispatch("closeDrawer");
    // EventEmitter.dispatch("filterByDiscount", res);
    setState({
      right: false
    });
  };

  function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired
  };

  return (
    <>
      <ListItemButton onClick={toggleDrawer(anchor, true)}>
        <ListItemText
          primary="IDV"
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
          <Grid container spacing={2}>
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
                <RadioGroup
                  name="radio-buttons-group"
                  value={IDVType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="LowestIDV"
                    control={<Radio />}
                    label="Lowest IDV"
                  />
                  <FormControlLabel
                    value="recommendedIDV"
                    control={<Radio />}
                    label={`Recommended IDV (₹ ${recommendedIDV})`}
                  />
                  <FormControlLabel
                    value="MaximumIDV"
                    control={<Radio />}
                    label="Maximum IDV"
                  />
                  <FormControlLabel
                    value="customIDV"
                    control={<Radio />}
                    label="Choose your IDV"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1" component="p">
                    Enter an IDV between
                  </Typography>
                  <Typography variant="body1" component="p">
                    <Typography variant="body2" component="span">
                      {MinIDV}
                    </Typography>
                    -
                    <Typography variant="body2" component="span">
                      {MaxIDV}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) =>
                      handleSetIDV(
                        e.target.value ? parseInt(e.target.value) : 0
                      )
                    }
                    onBlur={(e) => validateIDVValue()}
                    value={IDVChooseDefault}
                    disabled={IDVType !== "customIDV"}
                    id="outlined-basic"
                    label={`Enter an IDV between ${MinIDV}-${MaxIDV}`}
                    variant="outlined"
                    focused
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default IdvFilterDrawer;
