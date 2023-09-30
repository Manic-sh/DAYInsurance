import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CompareOffers from "./CompareOffers";
import getCompanyImgName from "../../common/CompanyImages";

const ComparePanel = (props) => {
  const items = props.items;
  return (
    <>
      <Box
        component="div"
        sx={{
          backgroundColor: "#FFFFFF",
          padding: "2px 8px 8px 8px",
          textAlign: "right"
        }}
        className="fixed_bottom custom_style"
      >
        <IconButton aria-label="delete" onClick={() => props.handleRemove()}>
          <CloseIcon />
        </IconButton>
        <Container maxWidth="xl">
          <Grid container spacing={2} align="center" justifyContent="center">
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignitems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap"
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {items.map((o, i) => (
                  <Box key={i} component="div" sx={{ width: "150px" }}>
                    <Box
                      component="div"
                      sx={{ width: "120px", position: "relative" }}
                    >
                      <Box
                        component="img"
                        alt={o.SupplierName}
                        src={getCompanyImgName(o.SupplierName)}
                        className="img_fluid"
                        sx={{ borderRadius: "5px" }}
                      />

                      <IconButton
                        aria-label="delete"
                        sx={{
                          cursor: "pointer",
                          position: "absolute",
                          top: "-8px",
                          right: "-15px",
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          "&:hover": {
                            bgcolor: "primary.main"
                          }
                        }}
                        onClick={() => props.handleRemove(o)}
                      >
                        <CloseIcon sx={{ fontSize: "14px" }} />
                      </IconButton>
                    </Box>
                    <Typography variant="body1" component="p" py={1}>
                      {o.FinalPremium} /-
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box component="div">
                <CompareOffers items={items} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ComparePanel;
