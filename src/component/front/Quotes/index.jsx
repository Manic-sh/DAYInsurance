import React, { useEffect, useState } from "react";
import { getSnapshot } from "mobx-state-tree";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import { clone, remove, size } from "lodash";

import { EventEmitter } from "../../../services/events";
import {
  fetchQuotesAPI,
  getFilterData,
  getShowDefaultData,
} from "../common/common";
import ComparePanel from "./compareInsurance/ComparePanel";
import Cards from "./items/Cards";
import CardsRow from "./items/CardsRow";
// import {sortBy,orderBy} from "lodash";
import DeclineCompanies from "./items/DeclineCompanies";
import SkeltoneCard from "./items/SkeltoneCard";
import BreakUp from "./items/BreakUp";


const Quotes = (props) => {
  const { store } = props;


  const [loadingBreakUp, setLoadingBreakUp] = useState(false);
  const [itemBreakUp, setItemBreakUp] = useState([]);

  const breakUpAction = (item, action) => {
    console.log('bcreaction',item,action);
    setItemBreakUp(action ? item : []);
    setLoadingBreakUp(action);
  };

  const [declineCompanies, setDeclineCompanies] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [IsDefault, setDefault] = useState(true);
  const [open, setOpen] = useState(false);
  // let quotes = getSnapshot(store.quotes);
  // let items = quotes.items;
  const [itemQuotes, setItemQuotes] = useState([]);
  /*eslint-disable */
  function getData(items, type = "default") {
    setLoading(true);
    console.log("start here");
    // items = getSnapshot(store.quotes.items);
    items = getFilterData(items, props.sortBy, type, store);
    setItemQuotes(items);
    type === "default" ? setDefault(true) : IsDefault;
    console.log("internal", items);
    size(items) > 0 ? setLoading(false) : "";
    handleRemove();
  }
  // useEffect(() => {
  //   store.insurance.fetchVehicleVariants();
  // }, []);

  useEffect(() => {
    EventEmitter.subscribe("DeclineCompanies", () => {
      handleDeclineCompanies("DeclineCompanies");
      
    });
    EventEmitter.subscribe("LoadingStatus", (status) => {
      setLoadingState(status);
    });
  }, []);
  const handleDeclineCompanies = () => {
    const DeclineCompaniesData = store.insurance.getDeclineCompaniesData();
    setDeclineCompanies(DeclineCompaniesData);
  };

  /*eslint-disable */
  useEffect(() => {
    fetchQuotesAPI(props.store, getData, "default");

    EventEmitter.subscribe("filterByCompany", (data) => {
      filterByCompany(data, "staticFilter");
      setLoadingState(false);
    });
    EventEmitter.subscribe("filterByAddOns", (data) => {
      filterByAddOns(data, "staticFilter");
      setLoadingState(false);
    });
    EventEmitter.subscribe("filterByIDV", () => callGetQuotes("filterByIDV"));
    EventEmitter.subscribe("filterByDiscount", () => {
      callGetQuotes("filterByDiscount");
      setLoadingState(false);
    });
    EventEmitter.subscribe("filterByAddBiFuel", () => {
      callGetQuotes("filterByAddBiFuel");
      setLoadingState(false);
    });
    EventEmitter.subscribe("filterByLiability", () => {
      callGetQuotes("filterByLiability");
      setLoadingState(false);
    });
    EventEmitter.subscribe("shortingFilter", (data) => shortingFilter(data));
    EventEmitter.subscribe("modifySearch", () =>
      setTimeout(async () => {
        setLoading(true);
        setDefault(true);
        setItemQuotes([]);
        callGetQuotes("default");
        setLoadingState(false);
        // await getQuotes();
      }, 300)
    );
    EventEmitter.dispatch("IsAuthenticated");
  }, []);

  useEffect(() => {
    size(itemQuotes) > 0
      ? store.quotes.setIsApplyFilter(false)
      : store.quotes.setIsApplyFilter(true);
    EventEmitter.dispatch("IsApplyFilter");
  }, [itemQuotes]);
  /*eslint-enable */

  const callGetQuotes = (type) => {
    fetchQuotesAPI(props.store, getData, type);
    // setDefault(false);
  };

  const callStaticFilter = (type) => {
    let items = getSnapshot(store.quotes.items);
    console.log("itemscalll staticFilter", items);
    items = getFilterData(items, props.sortBy, type, store);
    setItemQuotes(items);
    handleRemove();
    // setDefault(false);
  };
  // const callGetQuotes = async () => {
  //   await getQuotes();
  //   setDefault(false);
  // };
  const shortingFilter = (data) => {
    let items = getSnapshot(store.quotes.items);
    let item_list = getShowDefaultData(items, data, "shortingFilter");
    // let  item_list = getFilterData(items, data, 'shortingFilter', store);
    setItemQuotes(item_list);
  };

  const filterByCompany = async (data, type) => {
    console.log("medata---------", data);
    console.log("medatatype---------", type);
    setDefault(true);
    await store.quotes.setCompanySelected(data);
    data.length > 0 ? setDefault(false) : setDefault(true);
    callStaticFilter(type);

  };

  const filterByAddOns = async (data, type) => {
    setDefault(true);
    await store.quotes.setAddOnSelected(data);
    data.length > 0 ? setDefault(false) : setDefault(true);
    callStaticFilter(type);
  };

  // const getQuotes = async () => {
  //   const EnqNo = store.insurance.getEnqNo();
  //   await store.quotes.fetchQuote(EnqNo);
  //   quotes = getSnapshot(store.quotes);
  //   items = quotes.items;
  //   setItemQuotes(items);
  //   setLoading(false);
  // };

  let sendEmailProduct = clone(getSnapshot(store.quotes.sendEmailProduct));
  /*eslint-disable */
  const [sendEmailArray, setSendEmailArray] = useState(sendEmailProduct);
  /*eslint-enable */
  const handleChangeSendEmail = (checked, value) => {
    sendEmailProduct = clone(getSnapshot(store.quotes.sendEmailProduct));
    if (checked) {
      sendEmailProduct.push(value);
    } else {
      remove(sendEmailProduct, (n) => {
        return n.CustQutBrkDetailId === value.CustQutBrkDetailId;
      });
    }
    store.quotes.setSendEmailProduct(sendEmailProduct);
    sendEmailProduct = clone(getSnapshot(store.quotes.sendEmailProduct));
    setSendEmailArray(sendEmailProduct);
  };

  const isCheckedSendEmail = (value) => {
    return sendEmailProduct.some((p) => p.CustQutBrkDetailId === value);
  };

  let compareProduct = clone(getSnapshot(store.quotes.compareProduct));
  const [compareArray, setCompareArray] = useState(compareProduct);

  const handleChange = (checked, value) => {
    console.log('switchall action');
    compareProduct = clone(getSnapshot(store.quotes.compareProduct));
    if (checked) {
      if (size(compareProduct) < 5) {
        compareProduct.push(value);
      } else {
        setOpen(true);
      }
    } else {
      remove(compareProduct, (n) => {
        return n.CustQutBrkDetailId === value.CustQutBrkDetailId;
      });
    }
    store.quotes.setCompareProduct(compareProduct);
    compareProduct = clone(getSnapshot(store.quotes.compareProduct));
    setCompareArray(compareProduct);
  };

  const isChecked = (value) => {
    return compareProduct.some((p) => p.CustQutBrkDetailId === value);
  };
  const handleRemove = (value) => {
    compareProduct = clone(getSnapshot(store.quotes.compareProduct));
    if (value) {
      remove(compareProduct, (n) => {
        return n.CustQutBrkDetailId === value.CustQutBrkDetailId;
      });
    } else {
      compareProduct = [];
    }
    store.quotes.setCompareProduct(compareProduct);
    compareProduct = clone(getSnapshot(store.quotes.compareProduct));
    setCompareArray(compareProduct);
  };

  const IsListView = store.proposal.IsListView ? true : false;
  return (
    <>
      <Box
        component="section"
        sx={{
          mt: { md: 17, sm: 20, xs: 25 },
          pt: { sm: 5, xs: 8 },
          pb: 5,
          bgcolor: "#eaeef6",
        }}
      >
        <Container maxWidth="xl">
          {loadingState && (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box sx={{ width: "50%", pb: { sm: 5, xs: 4 } }}>
                <LinearProgress />
              </Box>
            </Grid>
          )}
          <Grid container spacing={2}>
            {loading
              ? [0, 1, 2, 4].map((s, j) => (
                  <Grid key={j + s} item xs={12} sm={6} md={4} lg={3}>
                    <SkeltoneCard />
                  </Grid>
                ))
              : !IsListView
              ? itemQuotes.map((o, i) => {
                  return (
                    <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                      <Cards
                        {...props}
                        item={o}
                        checked={isChecked(o.CustQutBrkDetailId)}
                        checkedSendEmail={isCheckedSendEmail(
                          o.CustQutBrkDetailId
                        )}
                        handleChange={handleChange}
                        handleChangeSendEmail={handleChangeSendEmail}
                        customGetData={getData}
                        breakUpAction={breakUpAction}
                      />
                    </Grid>
                  );
                })
              : itemQuotes.map((o, i) => {
                  return (
                    <Grid
                      key={i}
                      item
                      xs={12}
                      sx={{ display: { xs: "none", md: "block" } }}
                    >
                      <CardsRow
                        {...props}
                        item={o}
                        checked={isChecked(o.CustQutBrkDetailId)}
                        checkedSendEmail={isCheckedSendEmail(
                          o.CustQutBrkDetailId
                        )}
                        handleChange={handleChange}
                        handleChangeSendEmail={handleChangeSendEmail}
                        breakUpAction={breakUpAction}
                      />
                    </Grid>
                  );
                })}
          </Grid>
        </Container>
        {size(compareArray) > 0 && (
          <ComparePanel items={compareArray} handleRemove={handleRemove} />
        )}
        {size(declineCompanies) > 0 && (
          <DeclineCompanies items={declineCompanies} />
        )}
        {loadingBreakUp && <BreakUp item={itemBreakUp} {...props}  breakUpAction={breakUpAction}  />}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Add to compare must be two or less than five"
      />
    </>
  );
};

export default Quotes;
