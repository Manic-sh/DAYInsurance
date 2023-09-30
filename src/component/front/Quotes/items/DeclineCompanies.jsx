import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const DeclineCompanies = (props) => {
  const items = props.items;
  return (
    <>
      <Box component="section" sx={{ py: 4, mt: 4, bgcolor: "#fff" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Decline Companies
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              {items.map((item, i) => {
                return (
                  <Box
                    component="span"
                    key={i}
                    sx={{
                      p: "8px 15px",
                      mx: "5px",
                      my: 1,
                      bgcolor: "#e7ebf0",
                      borderRadius: "8px"
                    }}
                  >
                    <Typography variant="body1" component="p">
                      {item.CompanyName}
                    </Typography>
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default DeclineCompanies;
