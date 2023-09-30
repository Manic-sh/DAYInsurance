import AddLocationIcon from "@mui/icons-material/AddLocation";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import footerLogo from "../../../assets/images/logo/footer_logo.png";

const Footer = () => {
  return (
    <>
      <Box
        comonent="footer"
        sx={{ width: "100%", padding: "20px 20px 0 20px" }}
        className="main_footer"
      >
        <Grid container spacing={2} mb={2} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4} lg={3} xl={3}
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              flexWrap: "wrap"
            }}
          >
            <Grid
              sx={{
                display: { sm: "flex", xs: "block" },
                alignitems: "center",
                justifyContent: "center"
              }}
            >
              <Grid component="div" className="footer_logo_block">
                <Box
                  component="img"
                  src={footerLogo}
                  className="img_fluid"
                ></Box>
              </Grid>
              <Grid component="div">
                <Typography variant="h6" component="h6">
                  Direct Broker
                </Typography>
                <Typography variant="body2" component="p">
                  (Life and General)
                </Typography>
                <Typography variant="body2" component="p">
                  Code No. DB 581/14,
                </Typography>
                <Typography variant="body2" component="p">
                  IRDAL License Number 502
                </Typography>
                <Typography variant="body2" component="p">
                  Valid Till: 19/11/2023
                </Typography>
                <Typography variant="body2" component="p">
                  ISNP Certified on: 31/12/2020
                </Typography>
                <Typography variant="body2" component="p">
                  CIN:{" "}
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ fontWeight: 600 }}
                  >
                    U74900DL2013PTC261404
                  </Typography>
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2, textAlign: { xs: "start" } }}>
              <Link href="#/" className="social_icon">
                <WhatsAppIcon />
              </Link>
              <Link href="#/" className="social_icon">
                <InstagramIcon />
              </Link>
              <Link href="#/" className="social_icon">
                <FacebookIcon />
              </Link>
              <Link href="#/" className="social_icon">
                <LinkedInIcon />
              </Link>
              <Link href="#/" className="social_icon">
                <TwitterIcon />
              </Link>
              <Link href="#/" className="social_icon">
                <YouTubeIcon />
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8} lg={6} xl={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems:"start" ,
              textAlign: "start"
            }}
          >
            <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
              Our Day Insurance
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              Copyright © 2021 D.A.Y INSURANCE BROKER PVT LTD, All Rights
              Reserved
            </Typography>
            <Typography variant="subtitle2" component="p" sx={{ mb: 2 }}>
              Principal Place of Business:{" "}
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: "bold", ml: 1 }}
              >
                {" "}
                DSM 59, DLF TOWER SHIVAJI MARG KARAMPURA DELHI 110015
              </Typography>
            </Typography>
            <Typography variant="subtitle2" component="p" gutterBottom>
              Insurance is the subject matter of solicitation. Visitors are
              hereby informed that their information submitted on the website
              may be shared with insurers. The product information for
              comparison displayed on this website is of the insurers with whom
              our company has an agreement.
            </Typography>
            <Typography variant="subtitle2" component="p">
              Product information is authentic and solely based on the
              information received from the Insurer © Copyright 2021{" "}
              <Link to="http://www."> www.insurancepolicy4u.com.</Link> All
              Rights Reserved. All savings provided by insurers.
            </Typography>
          </Grid>

          <Grid item xs={12} lg={3} xl={2}>
            <Box component="div">
              <Typography variant="h6" component="h6">
                Contact
              </Typography>
              <List sx={{ py: 0 }}>
                <ListItem sx={{ p: 0 }}>
                  <ListItemAvatar>
                    <PhoneIcon />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: "text.secondary" }}
                    primary="Phone"
                    secondary={
                      <>
                        <Link
                          href="tel: 8588853301"
                          underline="none"
                          variant="body2"
                          color="text.secondary"
                        >
                          8588853301
                        </Link>
                      </>
                    }
                  />
                </ListItem>
                <ListItem sx={{ p: 0 }}>
                  <ListItemAvatar>
                    <EmailIcon />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: "text.secondary" }}
                    primary="Email"
                    secondary={
                      <>
                        <Link
                          href="mailto: info@dayibpl.com"
                          underline="none"
                          variant="body2"
                          color="text.secondary"
                        >
                          info@dayibpl.com
                        </Link>
                      </>
                    }
                  />
                </ListItem>
                <ListItem sx={{ p: 0 }}>
                  <ListItemAvatar>
                    <AddLocationIcon />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: "text.secondary" }}
                    primary="Address"
                    secondary="DSM 059, DLF TOWERS, SHIVAJI MARG, MOTI NAGAR, KARAMPURA DELHI 110015"
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
        <Box component="div" sx={{ py: 3 }} className="footer_bottom">
          <Container maxWidth="xl">
            <Grid container>
              <Grid item xs={12} md={6} mb={1}>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ fontSize: { xs: "12px", sm: "15px" } }}
                >
                  © 2022 all Rights Reserved to{" "}
                  <Link href="#/" sx={{ fontWeight: 600 }} color="primary.main">
                    INSURANCEPOLICY4U
                  </Link>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ textAlign: { xs: "start", md: "end" } }}
              >
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ fontSize: { xs: "12px", sm: "15px" } }}
                >
                  Design and Developed by{" "}
                  <Link
                    href="https://oshitechsolution.com"
                    target="_blank"
                    sx={{ fontWeight: 600 }}
                    color="primary.main"
                  >
                    OSHI TECH SOLUTION
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
