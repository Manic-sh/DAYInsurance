import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

import { get } from "lodash";
import Moment from "moment";

const DirectQuotes = (props) => {
  const { store } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname;
  const [searchParams] = useSearchParams();
  const getDirectQuotes = async () => {
    if (
      pathName === "/getQuotes" &&
      searchParams.get("enquiryno") !== null &&
      searchParams.get("planid") !== null
    ) {
      console.log("test1");
      let payload = { EnquiryNo: searchParams.get("enquiryno") };
      let data = await store.quotes.fetchDirectQuotes(payload);

      store.insurance.setEnqNo(payload.EnquiryNo);
      let rtoList = await store.insurance.fetchRTO();

      console.log("step0");
      let Data1 = {
        VehicleName: get(data.customervehilcedetails, "ModelName", ""),
        VehicleID: get(data.customervehilcedetails, "ModelId", 0),
      };
      store.insurance.setVehicleModelSelected(Data1);
      console.log("step1");
      let Data2 = {
        RegistrationRTOCode: parseInt(
          get(data.customervehilcedetails, "RegistrationRTOCode", 0)
        ),
        RegistrationDate: get(
          data.customervehilcedetails,
          "RegistrationDate",
          ""
        ),
        PreviousPolicyExpiryDate: get(
          data.customervehilcedetails,
          "PreviousPolicyExpiryDate",
          ""
        ),
        IsClaimMade: get(
          data.vehiclediscounts,
          "IsClaimsMadeInPreviousPolicy",
          false
        ),
        NCBDiscount: get(data.vehiclediscounts, "NCBDiscount", "0").toString(),
        rtoValue: {
          FullRtoCode: get(
            data.customervehilcedetails,
            "RegistrationNumber",
            ""
          ),
        },
      };
      console.log("Data2", Data2);
      store.insurance.setCityAndRto(Data2);
      console.log("step2");

      let RegistrationRTOCode = parseInt(
        get(data.customervehilcedetails, "RegistrationRTOCode", 0)
      );
      console.log("RegistrationRTOCode", RegistrationRTOCode, rtoList);
      const RTO = rtoList.find((v) => {
        return v.RTOID === RegistrationRTOCode;
      });

      console.log("RTO", RTO);
      if (RTO) sessionStorage.setItem("RTO", JSON.stringify(RTO));

      sessionStorage.setItem(
        "ModelName",
        get(data.customervehilcedetails, "Model", "")
      );
      sessionStorage.setItem(
        "Manufacturer",
        get(data.customervehilcedetails, "Make", "")
      );
      sessionStorage.setItem(
        "variantName",
        get(data.customervehilcedetails, "Variant", "") +
          "~" +
          get(data.customervehilcedetails, "CubicCapacity", "")
      );
      sessionStorage.setItem(
        "cubicCapacity",
        get(data.customervehilcedetails, "CubicCapacity", "")
      );

      let mCategory = get(data.customervehilcedetails, "Product", "");
      let product = { 0: "CAR", 1: "Bike", 2: "GCV", 3: "PCV", 4: "Misc" };

      sessionStorage.setItem("motorCategory", get(product, mCategory, ""));

      let fuelType = {
        0: "None",
        3: "CNG",
        4: "Diesel",
        5: "LPG",
        7: "Petrol",
        8: "LPG_Petrol",
        9: "Electric",
      };
      let fuelId = get(data.customervehilcedetails, "FuelTypeId", "");
      sessionStorage.setItem("fuel", get(fuelType, fuelId, ""));
      sessionStorage.setItem(
        "year",
        Moment(get(data.customervehilcedetails, "RegistrationDate", "")).format(
          "YYYY"
        )
      );

      const saveDetailsRequest = {
        // TypeOfPolicy: isBrandNewVehicle ? "0" : "2",
        // MakeID: String(insurance.MakeId),
        // FuelID: String(insurance.fuelId),
        // VariantID: String(insurance.variantId),
        // RegistrationRTOCode: String(values.RTOID),
        // Mobile: "9875654321",
        // PreviousPolicyExpiryDate:
        //   values.PreviousPolicyExpiryDate === ""
        //     ? "1900-01-01"
        //     : Moment(values.PreviousPolicyExpiryDate,['MM-DD-YYYY']).format("YYYY-MM-DD"),
        // RegistrationDate: Moment(values.RegistrationDate,['MM-DD-YYYY']).format("YYYY-MM-DD"),
        // ManufacturingDate: Moment(values.RegistrationDate,['MM-DD-YYYY']).format("YYYY-MM-DD"),
        // VehicleType: insurance.vehicleType,
        // CoverType: insurance.coverType,
        // Product: insurance.Product,
        // ModelId: String(insurance.ModelId),
        // VehicleCode: insurance.MasterVehicleCode,
        // CubicCapacity: String(insurance.CubicCapacity),
        IsClaimMade: Data2.IsClaimMade,
        NCBDiscount: Data2.NCBDiscount,
        // Email: "testmail@gmail.com",
        // CustName: "dummyName",
        // UsageType: insurance.usageType,
        // RegistrationNumber: registrationNumber,
        // OwnedBy: "1", // Default 1
        // PreviousPolicyCategory: "1", // Default 1
        // Userid: get(userInfo, "Userid", ""),
        // Token: get(userInfo, "Token", "")
      };

      store.insurance.setSaveDetailRequest(saveDetailsRequest);

      console.log("data", data);
      navigate("/Quotes");
    } else {
      console.log("test2");
      navigate("/");
    }
  };
  /*eslint-disable */
  useEffect(() => {
    getDirectQuotes();
  }, []);
  /*eslint-enable */

  return (
    <>
      <Box
        component="section"
        sx={{
          pt: { sm: 5, xs: 8 },
          pb: 5,
          bgcolor: "#eaeef6",
        }}
      >
        <Container maxWidth="xl">
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
        </Container>
      </Box>
    </>
  );
};

export default DirectQuotes;