import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { get,size } from "lodash";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddonsFullName from "../../../../services/Addons";
import AdditionalData,{getAdditionalTooltip} from "../../../../services/AdditionalTitle";
import getCompanyImgName from "../../common/CompanyImages";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BreakUp = (props) => {
  const { store } = props;
  const data = props.item;
  const [open] = useState(true);
  const [scroll] = useState("paper");

  // const handleClickOpen = (scrollType) => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };

  const handleClose = () => {
    props.breakUpAction([], false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  let navigate = useNavigate();
  const EnquiryNo = store.insurance.getEnqNo();
  const planid = data.PlanId;
  const handleBooknow = () => {
    store.proposal.savePlanDetails(EnquiryNo, planid);
    sessionStorage.setItem("selectedItem", JSON.stringify(data));
    navigate(`/Proposal`);
  };
  return (
    <>
      {/* <Link
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
        onClick={handleClickOpen("body")}
      >
        Break Up
      </Link> */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          sx={{
            fontSize: "18px",
            display: "flex",
            alignItems: { md: "center", xs: "start" },
            justifyContent: "space-between",
          }}
          color="primary.main"
          id="scroll-dialog-title"
        >
          <Grid container>
            <Grid item xs={12} md={6}>
              Premium Breakup
            </Grid>
            <Grid item xs={12} md={6}>
              {data.LoyaltyPoints !== "0" && data.LoyaltyPoints !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" component="p" sx={{ mr: 2 }}>
                    Loyalty Points
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.LoyaltyPoints}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider light />
        <DialogContent
          dividers={scroll === "paper"}
          className="inner_scrollbar"
        >
          <Grid container spacing={2} pb={1}>
            <Grid item xs={12} sm={6}>
              <Box
                component="div"
                sx={{
                  width: "120px",
                  height: "auto",
                  mx: { sm: "0", xs: "auto" },
                }}
              >
                <Box
                  component="img"
                  src={getCompanyImgName(data.SupplierName)}
                  className="img_fluid"
                  sx={{ borderRadius: "5px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                {getAdditionalTitle("SupplierIdv")}
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "18px" }}
                  color="primary.main"
                >
                  ₹ {data.SupplierIdv}
                </Typography>
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" component="p">
                  Premium (exc. GST)
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "18px" }}
                  color="primary.main"
                >
                  ₹ {data.PackagePremium}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider light />
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6" gutterBottom>
                Base Cover
              </Typography>
              {data.BasicPremium !== 0 && data.BasicPremium !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  {getAdditionalTitle("BasicPremium")}
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.BasicPremium}
                  </Typography>
                </Box>
              )}
              {data.BiFuelKitLiabilityPremium !== 0 &&
                data.BiFuelKitLiabilityPremium !== null && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1" component="p">
                      Bi Fuel Tp
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ₹ {data.BiFuelKitLiabilityPremium}
                    </Typography>
                  </Box>
                )}
              {data.BiFuelKitPremium !== 0 && data.BiFuelKitPremium !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" component="p">
                    Bi Fuel
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.BiFuelKitPremium}
                  </Typography>
                </Box>
              )}
              {data.CompulsaryPACoverForOwnerDriverPremium !== 0 &&
                data.CompulsaryPACoverForOwnerDriverPremium !== null && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    {getAdditionalTitle("CompulsaryPACoverForOwnerDriverPremium")}
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ₹ {data.CompulsaryPACoverForOwnerDriverPremium}
                    </Typography>
                  </Box>
                )}
              {data.ElectricalAccessoriesPremium !== 0 &&
                data.ElectricalAccessoriesPremium !== null && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1" component="p">
                      Electrical Accessory
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ₹ {data.ElectricalAccessoriesPremium}
                    </Typography>
                  </Box>
                )}
              {data.LegalLiabilityToPaidDriverPremium !== 0 &&
                data.LegalLiabilityToPaidDriverPremium !== null && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    {getAdditionalTitle("LegalLiabilityToPaidDriverPremium")}
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ₹ {data.LegalLiabilityToPaidDriverPremium}
                    </Typography>
                  </Box>
                )}
              {data.NonElectricalAccessoriesPremium !== 0 &&
                data.NonElectricalAccessoriesPremium !== null && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1" component="p">
                      Non Elec Accessory
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ₹ {data.NonElectricalAccessoriesPremium}
                    </Typography>
                  </Box>
                )}
              {data.PAForUnnamedPassengerPremium !== 0 &&
                data.PAForUnnamedPassengerPremium !== null && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                  {getAdditionalTitle("PAForUnnamedPassengerPremium")}
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ₹ {data.PAForUnnamedPassengerPremium}
                    </Typography>
                  </Box>
                )}
              {data.TPPDLiabilityPremium !== 0 &&
                data.TPPDLiabilityPremium !== null && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    {getAdditionalTitle("TPPDLiabilityPremium")}
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ₹ {data.TPPDLiabilityPremium}
                    </Typography>
                  </Box>
                )}

              <Divider light />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" component="h6" gutterBottom>
                Discounts
              </Typography>
              {data.AntiTheftDiscount !== 0 && data.AntiTheftDiscount !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" component="p">
                    Anti Theft Discount
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.AntiTheftDiscount}
                  </Typography>
                </Box>
              )}
              {data.AutomobileMembershipDiscount !== 0 &&
                data.AutomobileMembershipDiscount !== null && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1" component="p">
                      Aai Discount
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ₹ {data.AutomobileMembershipDiscount}
                    </Typography>
                  </Box>
                )}
              {data.HandicapDiscount !== "0" && data.HandicapDiscount !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" component="p">
                    Handicap Discount
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.HandicapDiscount}
                  </Typography>
                </Box>
              )}
              {data.InsurerDiscount !== 0 && data.InsurerDiscount !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" component="p">
                    Insurer discount
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.InsurerDiscount}
                  </Typography>
                </Box>
              )}
              {data.LoadingPremium !== 0 && data.LoadingPremium !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" component="p">
                    Loading
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.LoadingPremium}
                  </Typography>
                </Box>
              )}
              {data.NCBDiscount !== 0 && data.NCBDiscount !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" component="p" title={getAdditionalTooltip("NCBDiscount")}>
                    NCB {`(${data.DiscountRate}%)`}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.NCBDiscount}
                  </Typography>
                </Box>
              )}
              {data.ODDiscountRate !== 0 && data.ODDiscountRate !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" component="p">
                    Insurer Discount Per
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.ODDiscountRate}
                  </Typography>
                </Box>
              )}
              {data.VoluntaryDiscount !== 0 && data.VoluntaryDiscount !== null && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" component="p">
                    Voluntry Discount
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    ₹ {data.VoluntaryDiscount}
                  </Typography>
                </Box>
              )}
              <Divider light />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" component="h6" gutterBottom>
                Addons & Accessories
              </Typography>
              {getAddOnForPlan(data)}

              {/* {((data.ZeroDepPremium !== 0 && data.ZeroDepPremium !== null) ||
                data.Addons.search("ZD") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("ZD")}
                  >
                    Nil Dep Cover
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.ZeroDepPremium !== 0 && data.ZeroDepPremium !== null
                      ? "₹ " + data.ZeroDepPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.COCPremium !== 0 && data.COCPremium !== null) ||
                data.Addons.search("COC") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("COC")}
                  >
                    Consumables
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.COCPremium !== 0 && data.COCPremium !== null
                      ? "₹ " + data.COCPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.DailyAllowancePremium !== 0 &&
                data.DailyAllowancePremium !== null) ||
                data.Addons.search("DAC") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("DAC")}
                  >
                    Daily Allowance
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.DailyAllowancePremium !== 0 &&
                    data.DailyAllowancePremium !== null
                      ? "₹ " + data.DailyAllowancePremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.EPPremium !== 0 && data.EPPremium !== null) ||
                data.Addons.search("EP") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("EP")}
                  >
                    Engine Protector
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.EPPremium !== 0 && data.EPPremium !== null
                      ? "₹ " + data.EPPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.InvoicePriceCoverPremium !== 0 &&
                data.InvoicePriceCoverPremium !== null) ||
                data.Addons.search("INPC") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("INPC")}
                  >
                    Invoice Cover
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.InvoicePriceCoverPremium !== 0 &&
                    data.InvoicePriceCoverPremium !== null
                      ? "₹ " + data.InvoicePriceCoverPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.KeyReplacement !== 0 && data.KeyReplacement !== null) ||
                data.Addons.search("KLR") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("KLR")}
                  >
                    Key Replacement
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.KeyReplacement !== 0 && data.KeyReplacement !== null
                      ? "₹ " + data.KeyReplacement
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.LPBPremium !== 0 && data.LPBPremium !== null) ||
                data.Addons.search("LPB") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("LPB")}
                  >
                    Loss Of Belongings
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.LPBPremium !== 0 && data.LPBPremium !== null
                      ? "₹ " + data.LPBPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.NCBProtection !== 0 && data.NCBProtection !== null) ||
                data.Addons.search("NCB") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("NCB")}
                  >
                    Ncb Protection
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.NCBProtection !== 0 && data.NCBProtection !== null
                      ? "₹ " + data.NCBProtection
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.PAPremium !== 0 && data.PAPremium !== null) ||
                data.Addons.search("PA") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("PA")}
                  >
                    Passenger Assistance
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.PAPremium !== 0 && data.PAPremium !== null
                      ? "₹ " + data.PAPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.RimPremium !== 0 && data.RimPremium !== null) ||
                data.Addons.search("RDC") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("RDC")}
                  >
                    Rim Damage
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.RimPremium !== 0 && data.RimPremium !== null
                      ? "₹ " + data.RimPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.RoadsideAssistanceCoverPremium !== 0 &&
                data.RoadsideAssistanceCoverPremium !== null) ||
                data.Addons.search("RSA") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("RSA")}
                  >
                    Road Side Assistance
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.RoadsideAssistanceCoverPremium !== 0 &&
                    data.RoadsideAssistanceCoverPremium !== null
                      ? "₹ " + data.RoadsideAssistanceCoverPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.TCPremium !== 0 && data.TCPremium !== null) ||
                data.Addons.search("TC") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("TC")}
                  >
                    Tyre Cover
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.TCPremium !== 0 && data.TCPremium !== null
                      ? "₹ " + data.TCPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.THEPremium !== 0 && data.THEPremium !== null) ||
                data.Addons.search("THE") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("THE")}
                  >
                    Theft Cover
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.THEPremium !== 0 && data.THEPremium !== null
                      ? "₹ " + data.THEPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.WindShieldPremium !== 0 &&
                data.WindShieldPremium !== null) ||
                data.Addons.search("WS") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("WS")}
                  >
                    Windsheild Cover
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.WindShieldPremium !== 0 &&
                    data.WindShieldPremium !== null
                      ? "₹ " + data.WindShieldPremium
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}

              {((data.MedExp !== 0 && data.MedExp !== null) ||
                data.Addons.search("MED") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("MED")}
                  >
                    Medical Expense
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.MedExp !== 0 && data.MedExp !== null
                      ? "₹ " + data.MedExp
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.CourtCar !== 0 && data.CourtCar !== null) ||
                data.Addons.search("COU") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("COU")}
                  >
                    courtesy car
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.CourtCar !== 0 && data.CourtCar !== null
                      ? "₹ " + data.CourtCar
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.HotelExp !== 0 && data.HotelExp !== null) ||
                data.Addons.search("HTL") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("HTL")}
                  >
                    Hotel Expense
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.HotelExp !== 0 && data.HotelExp !== null
                      ? "₹ " + data.HotelExp
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )}
              {((data.TowCover !== 0 && data.TowCover !== null) ||
                data.Addons.search("TOW") >= 0) && (
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    title={getAddOnTooltip("TOW")}
                  >
                    Towing Cover
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                  >
                    {data.TowCover !== 0 && data.TowCover !== null
                      ? "₹ " + data.TowCover
                      : data.IsPlanWise
                      ? "Included"
                      : "Not Available"}
                  </Typography>
                </Box>
              )} */}
              <Divider light />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" component="h6" gutterBottom>
                Premium Details
              </Typography>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body1" component="p">
                  Net
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  color="text.secondary"
                >
                  ₹ {data.PackagePremium}
                </Typography>
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body1" component="p">
                  GST
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  color="text.secondary"
                >
                  ₹ {data.ServiceTax}
                </Typography>
              </Box>
              <Divider light />
            </Grid>

            <Grid item xs={12} align="end">
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "20px", color: "#000" }}
                >
                  Final
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  color="primary.main"
                  sx={{ fontSize: "20px" }}
                >
                  <Typography component="span" sx={{ fontSize: "20px", ml: 1 }}>
                    ₹
                  </Typography>
                  {data.FinalPremium}
                </Typography>
              </Box>
              <Button variant="outlined" onClick={handleBooknow}>
                Book Now
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

const getAddOnForPlan = (data) => {
  let addonList = "";
  addonList = AddonsFullName.map((value, index) => {
    let dataKeyValue = value.data_key;
    let dataKey = get(data, `${dataKeyValue}`, "");
    // let dataKey = data[dataKeyValue];
    console.log("dataKey", dataKey, dataKeyValue);
    return (
      ((dataKey !== 0 && dataKey !== null) ||
        data.Addons.search(value.sort) >= 0) && (
        <Box
          key={index}
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="body1" component="p" title={value.tooltip}>
            {value.title}
          </Typography>
          <Typography variant="body1" component="p" color="text.secondary">
            {dataKey !== 0 && dataKey !== null
              ? "₹ " + dataKey
              : data.IsPlanWise
              ? "Included"
              : "Not Available"}
          </Typography>
        </Box>
      )
    );
  });

  return addonList;
};

const getAdditionalTitle = (data_key) => {
  const r = AdditionalData.find((item) => {
    return item.data_key === data_key;
  });
  let tooltip = size(r) > 0 ? r.tooltip : "";
  let title = size(r) > 0 ? r.title : "";

  return (
    <Typography variant="body1" component="p" title={tooltip}>
      {title}
    </Typography>
  );
};

export default BreakUp;
