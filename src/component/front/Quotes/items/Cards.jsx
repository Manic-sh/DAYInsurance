import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { get } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Garages from "./Garages";
import SumInsured from "./SumInsured";
import getCompanyImgName from "../../common/CompanyImages";

const Cards = (props) => {
  const { store } = props;
  const [customIDV, setCustomIDV] = useState({});
  const [openSumInsured, setOpenSumInsured] = useState(false);
  const addOnSelected = store.quotes.getAddOnSelected();
  const { item } = props;

  let navigate = useNavigate();
  const EnquiryNo = store.insurance.getEnqNo();
  const planid = item.PlanId;
  const handleBooknow = () => {
    store.proposal.savePlanDetails(EnquiryNo, planid);
    sessionStorage.setItem("selectedItem", JSON.stringify(item));
    // sessionStorage.setItem("selectedPlanId", planid);
    navigate(`/Proposal`);
  };

  const breakUpCall = (item, action) => {
    props.breakUpAction(item, action);
  };

  const handleOpenSumInsured = async () => {
    const companyID = parseInt(get(props, "item.SupplierId", ""));
    const EnqNo = store.insurance.getEnqNo();
    const payload = {
      EnquiryNo: EnqNo,
      companyid: companyID
    };
    const res = await store.quotes.fetchIndividualIDV(payload);
    console.log("res >>>>> ", res);
    setCustomIDV(res[0]);
    setOpenSumInsured(true);
  };
  return (
    <>
      <Card
        className="offer_card"
        variant="outlined"
        sx={{
          bgcolor: "#fff",
          borderRadius: "16px",
          padding: "10px",
          height: "100%",
          width: "100%"
        }}
      >
        <CardContent
          sx={{ position: "relative", p: 2, height: "100%" }}
          className="card_body"
        >
          <Box
            component="span"
            className="card_price"
            sx={{ bgcolor: "primary.main" }}
          >
            <Link
              underline="always"
              variant="h6"
              component="h6"
              color="primary.contrastText"
              sx={{
                fontSize: "14px",
                ml: 1,
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
              className="break_btn"
              onClick={() => {
                breakUpCall(item, true);
              }}
            >
              Break Up
            </Link>
          </Box>
          <Box
            sx={{
              width: "200px",
              height: "85px",
              mx: "auto",
              mt: 3,
              textAlign: "center"
            }}
          >
            <Box
              component="img"
              alt={item.SupplierName}
              src={getCompanyImgName(item.SupplierName)}
              className="img_fluid"
              sx={{ borderRadius: "8px", height: "85px" }}
            />
          </Box>
          <Grid container mt={2} rowSpacing={1}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography component="p" variant="body1" color="text.primary">
                Sum Insured
              </Typography>

              <Typography
                component="span"
                variant="body1"
                color="primary.main"
                sx={{ fontWeight: 500, fontSize: "16px" }}
              >
                {/* <SumInsured {...props} item={item} /> */}
                <ListItemButton
                  onClick={() => handleOpenSumInsured(item)}
                  sx={{ p: 0 }}
                >
                  <ListItemText
                    primary={`₹ ${item.SupplierIdv}`}
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: 500
                    }}
                  />
                </ListItemButton>
                {openSumInsured && (
                  <SumInsured
                    {...props}
                    customIDV={customIDV}
                    item={item}
                    close={() => setOpenSumInsured(false)}
                    open={openSumInsured}
                  />
                )}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="p"
                variant="body1"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                {addOnSelected.length <= 0
                  ? `${item.ClaimsAllowed} Claim`
                  : `${item.ClaimsAllowedZD} Claim`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  gutterBottom
                  component="p"
                  variant="body1"
                  color="text.primary"
                >
                  {item.PlanName}
                </Typography>
              </Box>
              <Garages {...props} />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<MailOutlineIcon sx={{ color: "text.primary" }} />}
                      checkedIcon={
                        <MarkEmailReadIcon sx={{ color: "primary.main" }} />
                      }
                      onChange={(e) =>
                        props.handleChangeSendEmail(e.target.checked, item)
                      }
                      inputProps={{ "aria-label": "controlled" }}
                      checked={props.checkedSendEmail}
                    />
                  }
                  label="Send Email"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <CompareArrowsIcon sx={{ color: "text.primary" }} />
                      }
                      checkedIcon={
                        <LibraryAddCheckIcon sx={{ color: "primary.main" }} />
                      }
                      onChange={(e) =>
                        props.handleChange(e.target.checked, item)
                      }
                      inputProps={{ "aria-label": "controlled" }}
                      checked={props.checked}
                    />
                  }
                  label={`Add to Compare`}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <CardActions sx={{ display: "block", p: 0 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth={true}
                  endIcon={<ArrowRightAltIcon />}
                  sx={{ bgcolor: "primary.main" }}
                  onClick={handleBooknow}
                >
                  Book Now ₹ {item.PackagePremium}
                </Button>
                <Stack
                  direction="row"
                  sx={{
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 1
                  }}
                  spacing={1}
                >
                  <Chip
                    clickable
                    color="secondary"
                    size="small"
                    label="Policy Wording"
                    variant="outlined"
                    sx={{ my: 1, fontSize: "12px" }}
                  />
                  <Chip
                    clickable
                    color="secondary"
                    size="small"
                    label="Policy Brochure"
                    variant="outlined"
                    sx={{ my: 1, fontSize: "12px" }}
                  />
                  <Chip
                    clickable
                    color="secondary"
                    size="small"
                    label="Claim Form"
                    variant="outlined"
                    sx={{ my: 1, fontSize: "12px" }}
                  />
                </Stack>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Cards;
