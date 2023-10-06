import React, { useState, useEffect, Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import HelpIcon from "@mui/icons-material/Help";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { get, size, toLower } from "lodash";
import AddonsFullName from "../../../services/Addons";
import AdditionalData, {
  getAdditionalTooltip,
} from "../../../services/AdditionalTitle";
import { EventEmitter } from "../../../services/events";
import HeaderDetail from "../Quotes/navigation/HeaderDetail";
import ChequeDetails from "./ChequeDetails";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import getCompanyImgName from "../common/CompanyImages";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const Payment = (props) => {
  const { item } = props;
  const { store } = props;
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState("online");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [html, setHtml] = useState("");
  const [kycStatus, setKYCStatus] = useState(true);
  const [tncData, setTNCData] = useState(null);
  const [checkedTerms, setCheckedTerms] = useState([]);
  const selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
  const addOns = get(selectedItem, "Addons", "").split(",");
  const userInfo = store.login.getUserInfo();
  const [openKycModal, setOpenKycModal] = React.useState(false);
  const handleKycModalOpen = () => setOpenKycModal(true);
  const handleKycModalClose = () => setOpenKycModal(false);

  useEffect(() => {
    EventEmitter.subscribe("showPaymentMethod", (data) =>
      setShowPaymentButton(data)
    );
    EventEmitter.subscribe("tncData", (data) => {
      setTNCData(data);
      setCheckedTerms(data?.Terms.map(() => false) || []);
    });
  }, [showPaymentButton, html]);

  const allTermsChecked = checkedTerms.every((isChecked) => isChecked);

  const handleCheckboxChange = (index) => (e) => {
    const updatedCheckedTerms = [...checkedTerms];
    updatedCheckedTerms[index] = e.target.checked;
    setCheckedTerms(updatedCheckedTerms);
  };

  const getFullnameAddons = (addOns) => {
    const r = AddonsFullName.find((item) => {
      return item.sort === addOns;
    });
    return get(r, "title", "");
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setPaymentMethods(event.target.value);
  };

  const handleChequePopup = () => {
    if (checkedTerms) {
      EventEmitter.dispatch("showCheckDetail");
    } else {
      setSnackbarMessage("Accept term and condition to proceed further !!!!!!");
      setShowSnackbar(true);
    }
  };
  const handlePayNow = async () => {
    if (checkedTerms) {
      const EnqNo = store.insurance.getEnqNo();
      const payload = {
        EnquiryNo: parseInt(269357),
        Planid: parseInt(item.PlanId),
        Userid: get(userInfo, "Userid", ""),
      };
      setLoading(true);
      const hitRes = await store.proposal.saveProposalService(payload);
      if (toLower(hitRes?.KYCStatus) === "fail") {
        setKYCStatus(false);
        const url = hitRes?.KycUrl;
        setOpenKycModal(true);
        setLoading(false);
      } else if (hitRes.PaymentURLType === "HTML") {
        setHtml(hitRes.PaymentURL);
        const formId = document
          .getElementById("payment-form")
          .getElementsByTagName("form")[0];
        formId.submit();
      } else if (hitRes.PaymentURLType === "URL") {
        const url = hitRes.PaymentURL;
        window.location.href = url;
      } else {
        setLoading(false);
        setSnackbarMessage("Please Try Again Later !!!");
        setShowSnackbar(true);
      }
    } else {
      setSnackbarMessage("Accept term and condition to proceed further !!!!!!");
      setShowSnackbar(true);
    }
  };

  const handleKYCCheck = async () => {
    const EnqNo = store.insurance.getEnqNo();
    const CompanyId = 124; // Companyid = 124;
    const KycDetails = await store.proposal.fetchKYCStatus(CompanyId, EnqNo);

    if (KycDetails?.data?.data?.Kycstatus === "Fail") {
      const url = KycDetails?.data?.data?.KycURL;
      window.open(url, "_blank");
      console.log("KYC Status call API");
    } else {
      setKYCStatus(true);
    }
  };
  console.log(tncData);
  return (
    <>
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        className="custom_boxshadow2"
        sx={{
          width: "100%",
          bgcolor: "#fff",
          p: 2,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <div id="payment-form" dangerouslySetInnerHTML={{ __html: html }}></div>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Plan Features</Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            variant="body1"
            gutterBottom
            color="text.secondary"
            sx={{ fontWeight: "500" }}
          >
            Important Plan Features
          </Typography>
          <HeaderDetail {...props} sx={{ mb: 2 }} />
          <Box
            component="div"
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              flexWrap: "wrap",
            }}
          >
            {addOns.map((a, i) => {
              return (
                <Box
                  component="span"
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <Typography variant="body1" component="p">
                    {getFullnameAddons(a)}
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ mx: 1, display: "inline-block" }}
                    >
                      |
                    </Typography>
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Collapse>
      </Box>
      <Box
        className="custom_boxshadow2"
        sx={{ width: "100%", bgcolor: "#fff", p: 2, borderRadius: 2 }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Your Plan Summary</Typography>
              <Box component="div" sx={{ width: "150px", height: "auto" }}>
                <Box
                  component="img"
                  alt={item.SupplierName}
                  src={getCompanyImgName(item.SupplierName)}
                  className="img_fluid"
                  sx={{ borderRadius: "5px" }}
                />
              </Box>
            </Box>

            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
                width: "100%",
              }}
            >
              <Box component="div">{getAdditionalTitle("SupplierIdv")}</Box>
              <Box component="div">
                <Typography
                  variant="h6"
                  component="h6"
                  color="primary.main"
                  sx={{ fontSize: "16px" }}
                >
                  ₹
                  <Typography component="span" sx={{ fontSize: "16px", ml: 1 }}>
                    {item.SupplierIdv}
                  </Typography>
                </Typography>
              </Box>
            </Box>

            <Divider light sx={{ my: 1 }} />
            {item.BasicPremium !== 0 && item.BasicPremium !== null && (
              <>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    width: "100%",
                  }}
                >
                  <Box component="div">
                    {getAdditionalTitle("BasicPremium")}
                  </Box>
                  <Box component="div">
                    <Typography
                      variant="h6"
                      component="h6"
                      color="primary.main"
                      sx={{ fontSize: "16px" }}
                    >
                      ₹
                      <Typography
                        component="span"
                        sx={{ fontSize: "16px", ml: 1 }}
                      >
                        {item.BasicPremium}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>

                <Divider light sx={{ my: 1 }} />
              </>
            )}
            {item.BiFuelKitLiabilityPremium !== 0 &&
              item.BiFuelKitLiabilityPremium !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      <Typography variant="body1" component="p">
                        Bi Fuel Tp
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.BiFuelKitLiabilityPremium}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.BiFuelKitPremium !== 0 && item.BiFuelKitPremium !== null && (
              <>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    width: "100%",
                  }}
                >
                  <Box component="div">
                    <Typography variant="body1" component="p">
                      Bi Fuel
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography
                      variant="h6"
                      component="h6"
                      color="primary.main"
                      sx={{ fontSize: "16px" }}
                    >
                      ₹
                      <Typography
                        component="span"
                        sx={{ fontSize: "16px", ml: 1 }}
                      >
                        {item.BiFuelKitPremium}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>

                <Divider light sx={{ my: 1 }} />
              </>
            )}
            {item.CompulsaryPACoverForOwnerDriverPremium !== 0 &&
              item.CompulsaryPACoverForOwnerDriverPremium !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      {getAdditionalTitle(
                        "CompulsaryPACoverForOwnerDriverPremium"
                      )}
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.CompulsaryPACoverForOwnerDriverPremium}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.ElectricalAccessoriesPremium !== 0 &&
              item.ElectricalAccessoriesPremium !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      <Typography variant="body1" component="p">
                        Electrical Accessory
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.ElectricalAccessoriesPremium}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.LegalLiabilityToPaidDriverPremium !== 0 &&
              item.LegalLiabilityToPaidDriverPremium !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      {getAdditionalTitle("LegalLiabilityToPaidDriverPremium")}
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.LegalLiabilityToPaidDriverPremium}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.NonElectricalAccessoriesPremium !== 0 &&
              item.NonElectricalAccessoriesPremium !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      <Typography variant="body1" component="p">
                        Non Elec Accessory
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.NonElectricalAccessoriesPremium}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.PAForUnnamedPassengerPremium !== 0 &&
              item.PAForUnnamedPassengerPremium !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      {getAdditionalTitle("PAForUnnamedPassengerPremium")}
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.PAForUnnamedPassengerPremium}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.AntiTheftDiscount !== 0 &&
              item.AntiTheftDiscount !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      <Typography variant="body1" component="p">
                        Anti Theft Discount
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.AntiTheftDiscount}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.AutomobileMembershipDiscount !== 0 &&
              item.AutomobileMembershipDiscount !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      <Typography variant="body1" component="p">
                        Aai Discount
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.AutomobileMembershipDiscount}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.HandicapDiscount !== "0" &&
              item.HandicapDiscount !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      <Typography variant="body1" component="p">
                        Handicap Discount
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography
                        color="primary.main"
                        component="span"
                        sx={{ fontSize: "16px", ml: 1 }}
                      >
                        ₹ {item.HandicapDiscount}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {item.InsurerDiscount !== 0 && item.InsurerDiscount !== null && (
              <>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    width: "100%",
                  }}
                >
                  <Box component="div">
                    <Typography variant="body1" component="p">
                      Insurer Discount
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography
                      variant="h6"
                      component="h6"
                      color="primary.main"
                      sx={{ fontSize: "16px" }}
                    >
                      ₹
                      <Typography
                        component="span"
                        sx={{ fontSize: "16px", ml: 1 }}
                      >
                        {item.InsurerDiscount}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>

                <Divider light sx={{ my: 1 }} />
              </>
            )}
            {item.LoadingPremium !== 0 && item.LoadingPremium !== null && (
              <>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    width: "100%",
                  }}
                >
                  <Box component="div">
                    <Typography variant="body1" component="p">
                      Loading
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography
                      variant="h6"
                      component="h6"
                      color="primary.main"
                      sx={{ fontSize: "16px" }}
                    >
                      ₹
                      <Typography
                        component="span"
                        sx={{ fontSize: "16px", ml: 1 }}
                      >
                        {item.LoadingPremium}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>

                <Divider light sx={{ my: 1 }} />
              </>
            )}
            {item.ODDiscountRate !== 0 && item.ODDiscountRate !== null && (
              <>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    width: "100%",
                  }}
                >
                  <Box component="div">
                    <Typography variant="body1" component="p">
                      Insurer Discount Per
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography
                      variant="h6"
                      component="h6"
                      color="primary.main"
                      sx={{ fontSize: "16px" }}
                    >
                      ₹
                      <Typography
                        component="span"
                        sx={{ fontSize: "16px", ml: 1 }}
                      >
                        {item.ODDiscountRate}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>

                <Divider light sx={{ my: 1 }} />
              </>
            )}
            {item.VoluntaryDiscount !== 0 &&
              item.VoluntaryDiscount !== null && (
                <>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                      width: "100%",
                    }}
                  >
                    <Box component="div">
                      <Typography variant="body1" component="p">
                        Voluntry Discount
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography
                        variant="h6"
                        component="h6"
                        color="primary.main"
                        sx={{ fontSize: "16px" }}
                      >
                        ₹
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px", ml: 1 }}
                        >
                          {item.VoluntaryDiscount}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>

                  <Divider light sx={{ my: 1 }} />
                </>
              )}
            {getAddOnForPlan(item)}

            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
                width: "100%",
              }}
            >
              <Box component="div">
                <Typography
                  variant="body1"
                  component="p"
                  title={getAdditionalTooltip("NCBDiscount")}
                >
                  NCB {`(${item.DiscountRate}%)`}
                </Typography>
              </Box>
              <Box component="div">
                <Typography
                  variant="h6"
                  component="h6"
                  color="primary.main"
                  sx={{ fontSize: "16px" }}
                >
                  ₹
                  <Typography component="span" sx={{ fontSize: "16px", ml: 1 }}>
                    {item.NCBDiscount}
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Divider light />
          </Grid>
          <Grid item xs={12}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                my: 1,
              }}
            >
              <Box component="div">
                <Typography variant="body2" component="p">
                  Premium Amount
                </Typography>
              </Box>
              <Box component="div">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "18px" }}
                >
                  <Typography component="span" sx={{ fontSize: "18px", ml: 1 }}>
                    ₹
                  </Typography>
                  {item.PackagePremium}
                </Typography>
              </Box>
            </Box>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                my: 1,
              }}
            >
              <Box component="div">
                <Typography variant="body2" component="p">
                  GST
                </Typography>
              </Box>
              <Box component="div">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "18px" }}
                >
                  <Typography component="span" sx={{ fontSize: "18px", ml: 1 }}>
                    ₹
                  </Typography>
                  {item.ServiceTax}
                </Typography>
              </Box>
            </Box>
            <Divider light />
          </Grid>
          <Grid item xs={12}>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                my: 1,
              }}
            >
              <Box component="div">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "20px" }}
                  color="primary.main"
                >
                  You'll Pay
                </Typography>
              </Box>
              <Box component="div">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "22px" }}
                  color="primary.main"
                >
                  ₹ {item.FinalPremium}
                  <Typography
                    component="span"
                    sx={{ fontSize: "25px", ml: 1 }}
                  ></Typography>
                </Typography>
              </Box>
            </Box>
            {item.LoyaltyPoints !== "0" && item.LoyaltyPoints !== null && (
              <>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    width: "100%",
                  }}
                >
                  <Box component="div">
                    <Typography variant="body1" component="p">
                      Loyalty Points
                    </Typography>
                  </Box>
                  <Box component="div">
                    <Typography
                      variant="h6"
                      component="h6"
                      color="primary.main"
                      sx={{ fontSize: "16px" }}
                    >
                      ₹
                      <Typography
                        component="span"
                        sx={{ fontSize: "16px", ml: 1 }}
                      >
                        {item.LoyaltyPoints}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>

                <Divider light sx={{ my: 1 }} />
              </>
            )}
          </Grid>
          {showPaymentButton && (
            <>
              <Grid item xs={12}>
                <Divider light />
                <FormGroup
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                  }}
                >
                  {tncData?.Terms.map((terms, idx) => (
                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Checkbox
                        onChange={handleCheckboxChange(idx)}
                        checked={checkedTerms[idx]}
                        checkedIcon={<LibraryAddCheckIcon />}
                      />
                      <Typography variant="body2" pt={1}>
                        I agree to the{" "}
                        <Link mx={1} href="#/">
                          Terms & Conditions
                        </Link>
                        {terms?.TermsMessage}
                      </Typography>
                    </Box>
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={12} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Payment Methods
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paymentMethods}
                    name="paymentMethods"
                    label="Select Payment Methods"
                    onChange={handleChange}
                  >
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="cheque">Cheque</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} mt={1} align="center">
                {paymentMethods === "cheque" ? (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleChequePopup()}
                  >
                    Cheque
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePayNow()}
                    variant="contained"
                    fullWidth
                    disabled={!kycStatus || !allTermsChecked}
                  >
                    Pay Now
                  </Button>
                )}
                {/* <Button variant="text" color="primary" onClick={handleKYCCheck}>
                  Check KYC Status
                </Button> */}
                <ChequeDetails open={false} item={item} {...props} />
              </Grid>
            </>
          )}
        </Grid>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          action={action}
          TransitionComponent={SlideTransition}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      {showPaymentButton && (
        <>
          <Box
            className="custom_boxshadow2"
            sx={{
              width: "100%",
              bgcolor: "#fff",
              p: 2,
              borderRadius: 2,
              mt: 2,
            }}
          >
            <Grid item xs={12}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                {tncData?.Messages.map((msg, idx) => (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                    }}
                    key={idx} // Add a unique key if available
                  >
                    <IconButton size="small" aria-label="step" color="inherit">
                      <HelpIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2">{msg?.KycMessage}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Box>
        </>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openKycModal}
        onClose={handleKycModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openKycModal}>
          <Box sx={style}>
            <Button onClick={handleKycModalClose}>Close</Button>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const getAddOnForPlan = (item) => {
  let addonList = "";
  addonList = AddonsFullName.map((value, index) => {
    let dataKeyValue = value.data_key;
    let dataKey = get(item, `${dataKeyValue}`, "");
    // let dataKey = data[dataKeyValue];
    // console.log("dataKey", dataKey, dataKeyValue);
    return (
      ((dataKey !== 0 && dataKey !== null) ||
        item.Addons.search(value.sort) >= 0) && (
        <div key={index}>
          <Box
            component="div"
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
              width: "100%",
            }}
          >
            <Box component="div">
              <Typography variant="body1" component="p" title={value.tooltip}>
                {value.title}
              </Typography>
            </Box>
            <Box component="div">
              <Typography
                component="p"
                sx={{ fontSize: "16px" }}
                color="primary.main"
              >
                {dataKey !== 0 && dataKey !== null
                  ? "₹ " + dataKey
                  : item.IsPlanWise
                  ? "Included"
                  : "Not Available"}
              </Typography>
            </Box>
          </Box>

          <Divider light sx={{ my: 1 }} />
        </div>
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

export default Payment;
