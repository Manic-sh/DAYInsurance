import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Garages from "./Garages";
import SumInsured from "./SumInsured";
import { get } from "lodash";
import AddonsFullName from "../../../../services/Addons";
import getCompanyImgName from "../../common/CompanyImages";

const CardsRow = (props) => {
  const { item } = props;
  const { store } = props;
  let navigate = useNavigate();
  const addOnsItem = item.Addons;
  const addOnSelected = store.quotes.getAddOnSelected();
  const [openSumInsured, setOpenSumInsured] = useState(false);
  const addOns = addOnsItem.split(",");
  const getFullnameAddons = (addOns) => {
    const r = AddonsFullName.find((item) => {
      return item.sort === addOns;
    });
    return (
      <Typography
        variant="body1"
        component="span"
        sx={{ mx: 1, color: "#65748b", fontWeight: 500 }}
        title={get(r, "tooltip", "")}
      >
        {get(r, "title", "")}
      </Typography>
    );
    // return get(r, "title", "");
  };
  const handleBooknow = () => {
    sessionStorage.setItem("selectedItem", JSON.stringify(item));
    navigate(`/Proposal`);
  };

  const breakUpCall = (item, action) => {
    props.breakUpAction(item, action);
  };
  const [customIDV, setCustomIDV] = useState({});

  const handleOpenSumInsured = async () => {
    const companyID = parseInt(get(props, "item.SupplierId", ""));
    const EnqNo = store.insurance.getEnqNo();
    const payload = {
      EnquiryNo: EnqNo,
      companyid: companyID,
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
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            position: "relative",
            py: 1,
            height: "100%",
          }}
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
                whiteSpace: "nowrap",
              }}
              className="break_btn"
              onClick={() => {
                breakUpCall(item, true);
              }}
            >
              Break Up
            </Link>
          </Box>

          <Grid
            container
            mt={2}
            columnSpacing={2}
            sx={{ borderBottom: ".3px solid #DFDFDF", pb: 1, mb: 1 }}
          >
            <Grid item md={2} sx={{ borderRight: ".3px solid #DFDFDF" }}>
              <Box
                sx={{
                  width: "150px",
                  height: "60px",
                  textAlign: "center",
                  mx: "auto",
                }}
              >
                <Box
                  component="img"
                  alt={item.SupplierName}
                  src={getCompanyImgName(item.SupplierName)}
                  className="img_fluid"
                  sx={{
                    borderRadius: "8px",
                    height: "60px",
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              md={2}
              sx={{ borderRight: ".3px solid #DFDFDF", pr: "12px" }}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{ fontWeight: "bold", color: "secondary.main" }}
                gutterBottom
              >
                Policy Details
              </Typography>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  component="p"
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                >
                  Sum Insured
                </Typography>

                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, fontSize: "16px" }}
                >
                  <ListItemButton
                    onClick={() => handleOpenSumInsured(item)}
                    sx={{ p: 0 }}
                  >
                    <ListItemText
                      primary={`₹ ${item.SupplierIdv}`}
                      primaryTypographyProps={{
                        fontSize: 16,
                        fontWeight: 500,
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
              </Box>

              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  component="p"
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                >
                  Base OD
                </Typography>

                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, fontSize: "16px" }}
                  gutterBottom
                >
                  ₹ {item.BasicPremium}
                </Typography>
              </Box>

              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  component="p"
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                >
                  Third Party
                </Typography>

                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, fontSize: "16px" }}
                  gutterBottom
                >
                  ₹ {item.TPPDLiabilityPremium}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              md={3}
              sx={{ borderRight: ".3px solid #DFDFDF", pr: "12px" }}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{ fontWeight: "bold", color: "secondary.main" }}
                gutterBottom
              >
                Discount
              </Typography>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  component="p"
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                >
                  NCB
                </Typography>

                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, fontSize: "16px" }}
                  gutterBottom
                >
                  ₹ {item.NCBDiscount}
                </Typography>
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  component="p"
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                >
                  Insurer Discount
                </Typography>

                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, fontSize: "16px" }}
                  gutterBottom
                >
                  ₹ {item.InsurerDiscount}
                </Typography>
              </Box>
              <Divider light />
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography
                  component="p"
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                >
                  BreakUp Amount
                </Typography>

                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500, fontSize: "16px" }}
                  gutterBottom
                >
                  ₹ {item.PackagePremium}
                </Typography>
              </Box>
              <Box component="div">
                <Typography
                  component="p"
                  variant="body1"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  {addOnSelected.length <= 0
                    ? `${item.ClaimsAllowed} Claim`
                    : `${item.ClaimsAllowedZD} Claim`}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              md={3}
              sx={{ borderRight: ".3px solid #DFDFDF", pr: "12px" }}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{ fontWeight: "bold", color: "secondary.main" }}
                gutterBottom
              >
                Add-Ons Covers
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {!(addOns[0] === "") &&
                  addOns.map((item, index) => (
                    <Box
                      component="li"
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box component="div" sx={{ display: "flex" }}>
                        <CheckBoxIcon sx={{ color: "primary.main" }} />

                        {getFullnameAddons(item)}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Grid>
            <Grid
              item
              md={2}
              sx={{ display: "flex", alignItems: "end", justifyContent: "end" }}
            >
              <CardActions sx={{ display: "block", p: 0 }}>
                <Button variant="outlined" size="large" onClick={handleBooknow}>
                  Book Now
                </Button>
              </CardActions>
            </Grid>
          </Grid>
          <Grid container columnSpacing={1}>
            <Grid item md={4} lg={3}>
              <FormGroup row>
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
            <Grid item md={3} sx={{ pt: 1 }}>
              <Garages {...props} />
            </Grid>
            <Grid item md={6} xs={5} sx={{ pt: 1 }}>
              <Stack
                direction="row"
                sx={{
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "end",
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CardsRow;
