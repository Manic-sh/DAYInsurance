import React, { useEffect, useState } from "react";
import { get } from "lodash";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { EventEmitter } from "../../../services/events";
import HorizontalLinearStepper from "./HorizentalStepper";
import Payment from "./Payment";

const Proposal = (props) => {
  const { store } = props;
  const data = store.insurance.getHeaderDetails();
  const [item, setItem] = useState(() => {
    return JSON.parse(sessionStorage.getItem("selectedItem"));
  });

  const updateSelectedQuote = () => {
    const EnqNo = store.insurance.getEnqNo();
    store.quotes.fetchQuote(EnqNo).then((data) => {
      let planId = get(
        JSON.parse(sessionStorage.getItem("selectedItem")),
        "PlanId",
        0
      );
      data.filter((i) => {
        console.log(i.PlanId === planId);
        if (i.PlanId === planId) {
          sessionStorage.setItem("selectedItem", JSON.stringify(i));
          setItem(i);
        }
        return false;
      });
    });
  };

  const [loading, setLoading] = useState(true);
  const EnquiryNo = store.insurance.getEnqNo();
  const init = async () => {
    store.proposal.fetchStates(item.SupplierId);
    store.proposal.fetchUploadFilesType(item.SupplierId, EnquiryNo);
    store.proposal.fetchNomineeRelation(item.SupplierId);
    store.proposal.fetchPreviousInsurer(item.SupplierId);
    store.proposal.fetchFinancerDetails(item.SupplierId);
    await store.proposal.fetchOccupation(item.SupplierId);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await init();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  useEffect(() => {
    EventEmitter.dispatch("IsAuthenticated");
  }, []);
  return (
    <>
      <Box
        component="section"
        className="custom_style"
        sx={{ mt: 0, py: 5, bgcolor: "#eaeef6" }}
      >
        <Container maxWidth="xl">
          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid item xs={12} md={8} sx={{ height: "100%" }}>
              <HorizontalLinearStepper
                {...props}
                item={item}
                itemUpdateCall={updateSelectedQuote}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ height: "100%" }}>
              <Payment item={item} data={data} {...props} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Proposal;
