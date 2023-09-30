import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React from "react";

const SkeltoneCard = () => {
  return (
    <>
      <Card
      className="offer_card"
      variant="outlined"
      sx={{
        bgcolor: "#fff",
        borderRadius: "16px",
        padding: "10px",
        height: "100%"
      }}
    >
      <CardContent sx={{ position: "relative", p: 2 }} className="card_body">
      <Skeleton
            animation="wave"
            variant="rectangular"
            width={90}
            height={35}
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              borderRadius: "25px 12px 0 25px"
            }}
          />

          <Skeleton
            animation="wave"
            variant="rectangular"
            width={200}
            height={115}
            sx={{ mx: "auto", mt: 3, borderRadius: "10px" }}
          />

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
            <Skeleton animation="wave" width={150} height={25} />
<Skeleton animation="wave" width={80} height={25} />
          </Grid>

          <Grid item xs={12}>
          <Skeleton animation="wave" width={190} height={25} />
          </Grid>

          <Grid item xs={12}>
            <FormGroup>
              <Skeleton
                  animation="wave"
                  width={150}
                  height={30}
                  sx={{ mt: 1 }}
                />
                <Skeleton
                  animation="wave"
                  width={200}
                  height={25}
                  sx={{ mt: "5px" }}
                />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <CardActions sx={{ display: "block", p: 0 }}>
            <Skeleton animation="wave" width={"100%"} height={75} />
            <Stack
                  direction="row"
                  sx={{
                    flexWrap: "nowrap",
                    aliignItems: "center",
                    justifyContent: "space-between",
                  }}
                  spacing={1}
                >
                  <Skeleton height={40} width="40%" sx={{borderRadius: "50px"}}/>
                  <Skeleton height={40} width="40%" sx={{borderRadius: "50px"}}/>
                  <Skeleton height={40} width="20%" sx={{borderRadius: "50px"}}/>
                </Stack>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </>
  );
};

export default SkeltoneCard;
