import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { EventEmitter } from "../../../services/events";
import ThankyouImg from "../../../assets/images/thankyou-img.png";

const Thankyou = () => {
  const [Pdfurl, setPdfUrl] = useState();
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  const currentUrl = window.location.href;
  var url = new URL(currentUrl);
  var policyno = "";
  var EnquiryNo = "";
  var finalPremium = "";
  var paymentStatus = "";
  let IsOnlineMethod = false;
  if (
    currentUrl.indexOf("policyno") > -1 &&
    currentUrl.indexOf("Status") > -1 &&
    currentUrl.indexOf("Amount") > -1 &&
    currentUrl.indexOf("TID") > -1
  ) {
    policyno = url.searchParams.get("policyno");
    paymentStatus = url.searchParams.get("Status");
    finalPremium = url.searchParams.get("Amount");
    EnquiryNo = url.searchParams.get("TID");
    IsOnlineMethod = true;
  } else if (
    currentUrl.indexOf("EnquiryNo") > -1 &&
    currentUrl.indexOf("Chequestatus") > -1 &&
    currentUrl.indexOf("finalPremium") > -1 &&
    currentUrl.indexOf("chequePolicyNo") > -1
  ) {
    EnquiryNo = url.searchParams.get("EnquiryNo");
    paymentStatus = "On Hold";
    finalPremium = url.searchParams.get("finalPremium");
    policyno = "On Hold";
  }
  useEffect(() => {
    EventEmitter.dispatch("IsAuthenticated");
  }, []);
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await axios.get(
          `https://uatservices.insurancepolicy4u.com/api/proposal/GetPolicyPDF?EnquiryNo=${EnquiryNo}`
        );
        setLoading(false);
        loading === false && setShowBtn(true);
        setPdfUrl(res.data);
      } catch (e) {}
    };
    IsOnlineMethod && callApi();
    EnquiryNo.length === 0 && navigate("/Motor");
  }, [IsOnlineMethod, EnquiryNo, navigate, loading]);

  return (
    <>
      <Backdrop
        sx={{ color: "primary.main", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ mt: 13, mb: 5 }} className="custom_style">
        <Container maxWidth="lg">
          <Grid container sx={{ p: 0 }} spacing={2}>
            <Grid
              item
              xs={12}
              md={7}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box component="div">
                <Typography variant="h2" sx={{ mb: 1 }}>
                  You're all set!
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      component="span"
                      sx={{
                        display: "block",
                        p: "8px 16px",
                        background: "#FCEAD9",
                        borderRadius: "5px"
                      }}
                    >
                      <Typography variant="body1">
                        Enquiry No :{EnquiryNo}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      component="span"
                      sx={{
                        display: "block",
                        p: "8px 16px",
                        background: "#FCEAD9",
                        borderRadius: "5px"
                      }}
                    >
                      <Typography variant="body1">
                        Premium : {finalPremium}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      component="span"
                      sx={{
                        display: "block",
                        p: "8px 16px",
                        background: "#FCEAD9",
                        borderRadius: "5px"
                      }}
                    >
                      <Typography variant="body1">
                        Policy No : {policyno}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      component="span"
                      sx={{
                        display: "block",
                        p: "8px 16px",
                        background: "#FCEAD9",
                        borderRadius: "5px"
                      }}
                    >
                      <Typography variant="body1">
                        Status : {paymentStatus}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Thanks for being awesome,
                </Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  we hope you enjoy your purchase !
                </Typography>
                {showBtn && (
                  <Button
                    variant="outlined"
                    target="_blank"
                    download={Pdfurl}
                    href={Pdfurl}
                  >
                    Download Policy
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={5} textAlign="center">
              <Box
                component="img"
                src={ThankyouImg}
                className="insurance_img img_fluid"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Thankyou;
