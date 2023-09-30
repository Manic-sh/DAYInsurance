import React, { useState } from "react";
import { getSnapshot } from "mobx-state-tree";
import Moment from "moment";
import { get } from "lodash";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";


const generateRegistrationNumber = (registrationCity, RTOID, product) => {
  RTOID = parseInt(RTOID);
  let city = registrationCity.find((o) => {
    return o.RTOID === RTOID;
  });
  city = city ? city.FullRtoCode.split("-").join("") : "";
  let productType = "LA";
  if (product === "0") {
    productType = "CA";
  } else if (product === "1") {
    productType = "SA";
  }
  let randomNumber = Math.floor(1000 + Math.random() * 9000); // Four digit random number
  const registrationNumber = city + productType + randomNumber;
  return registrationNumber;
};

const CityAndRto = (props) => {
  const { store } = props;
  const insurance = getSnapshot(store.insurance);
  const IsClaimMade = get(insurance, "IsClaimMade", true);
  const savedDetails = store.insurance.getSaveDetails();
  const RTOID = get(savedDetails, "RegistrationRTOCode", "");
  const NCBDiscount = get(savedDetails, "NCBDiscount", "0");
  const userInfo = store.login.getUserInfo();
  
  console.log('insurance',insurance);

  const PreviousPolicyExpiryDate = get(
    insurance,
    "PreviousPolicyExpiryDate",
    ""
  );
  const isBrandNewVehicle = insurance.isBrandNewVehicle;

  let reg_date = new Date();
  !isBrandNewVehicle && reg_date.setDate(reg_date.getDate() - 300);
  

  const InitialRegistrationDate =
    get(insurance, "RegistrationDate") === ""
      ? reg_date
      : get(insurance, "RegistrationDate");

  
      console.log('RegistrationDate',InitialRegistrationDate);

      const registrationCity = insurance.rtoList;
  let selectedValue = registrationCity.find(
    (item) => item.RTOID === parseInt(RTOID)
  );
  selectedValue = selectedValue ? selectedValue : null;
  

  let reg_min_date = new Date();
  
  // isBrandNewVehicle
  //   ? reg_min_date.setDate(reg_min_date.getDate() - 14)
  //   : reg_min_date.setFullYear(reg_min_date.getFullYear() - 15);

    reg_min_date.setFullYear(reg_min_date.getFullYear() - 15);
  const registrationDateMin = reg_min_date;

  let reg_max_date = new Date();
  reg_max_date.setDate(reg_max_date.getDate() + 14);
  const registrationDateMax = reg_max_date;

  const [considerAsBrandNew, setConsiderAsBrandNew] = useState(
    isBrandNewVehicle ? true : false
  );

  const checkRegistrationDate = (newRegValue) => {
    let c_date = new Date();
    c_date.setHours(0);
    c_date.setMinutes(0);
    c_date.setSeconds(0);
    c_date.setDate(c_date.getDate() - 14);
    let date_result = Date.parse(c_date) <= Date.parse(newRegValue);

    setConsiderAsBrandNew(date_result);
    store.insurance.setIsBrandNewVehicle(date_result);

    if (date_result) {
      let schema_flag = {
        RTOID: Yup.string().required("Required Registration City"),
        RegistrationDate: Yup.date()
          .nullable()
          .required("Required Registered Date")
      };
      setSchema(Yup.object().shape(schema_flag));
    } else {
      let schema_flag = {
        RTOID: Yup.string().required("Required Registration City"),
        RegistrationDate: Yup.date()
          .nullable()
          .required("Required Registered Date"),
        PreviousPolicyExpiryDate: Yup.date()
          .nullable()
          .required("Required Expire Date"),
        IsClaimMade: Yup.boolean().required("Required")
      };
      setSchema(Yup.object().shape(schema_flag));
    }
  };
  const schemaObj = {
    RTOID: Yup.string().required("Required Registration City"),
    RegistrationDate: Yup.date().nullable().required("Required Registered Date")
  };

  if (!considerAsBrandNew) {
    schemaObj.PreviousPolicyExpiryDate = Yup.date()
      .nullable()
      .required("Required Expire Date");
    schemaObj.IsClaimMade = Yup.boolean().required("Required");
  }
  const [Schema, setSchema] = useState(Yup.object().shape(schemaObj));

  const handleSubmit = async (values) => {

    store.insurance.setYear(Moment(values.RegistrationDate,['DD/MM/YYYY']).format("YYYY"));
    store.insurance.setSelectedRTO(values.RTOID);
    const registrationNumber = generateRegistrationNumber(
      registrationCity,
      values.RTOID,
      insurance.Product
    );
   const current_date = Moment(new Date()).format('YYYY/MM/DD');
    const saveDetailsRequest = {
      TypeOfPolicy: isBrandNewVehicle ? "0" : "2",
      MakeID: String(insurance.MakeId),
      FuelID: String(insurance.fuelId),
      VariantID: String(insurance.variantId),
      RegistrationRTOCode: String(values.RTOID),
      Mobile: "9875654321",
      PreviousPolicyExpiryDate:
        values.PreviousPolicyExpiryDate === "" || PreviousPolicyExpiryDate ==='Invalid date'
          ? current_date
          : Moment(values.PreviousPolicyExpiryDate,['DD/MM/YYYY']).format("YYYY/MM/DD"),
      RegistrationDate: Moment(values.RegistrationDate,['DD/MM/YYYY']).format("YYYY/MM/DD"),
      ManufacturingDate: Moment(values.RegistrationDate,['DD/MM/YYYY']).format("YYYY/MM/DD"),
      VehicleType: insurance.vehicleType,
      CoverType: insurance.coverType,
      Product: insurance.Product,
      ModelId: String(insurance.ModelId),
      VehicleCode: insurance.MasterVehicleCode,
      CubicCapacity: String(insurance.CubicCapacity),
      // IsClaimMade: values.IsClaimMade === "true" ? true : false,
      IsClaimMade: values.IsClaimMade,
      NCBDiscount: values.NCBDiscount,
      Email: "testmail@gmail.com",
      CustName: "dummyName",
      UsageType: insurance.usageType,
      RegistrationNumber: registrationNumber,
      OwnedBy: "1", // Default 1
      PreviousPolicyCategory: "1", // Default 1
      Userid: get(userInfo, "Userid", ""),
      Token: get(userInfo, "Token", "")
    };
    console.log('saveDetailsRequest',saveDetailsRequest)
    const res = await store.insurance.saveDetails(saveDetailsRequest);
    store.insurance.setEnqNo(res.data);
    store.insurance.setSaveDetailRequest(saveDetailsRequest);
  };
  const goBack = () => {
    store.page.changePage(4);
    props.onChange(4);
  };

  const [rtoValue, setRTOValue] = useState(selectedValue);
  return (
    <>
      <Grid
        container
        sx={{
          alignItems: "start",
          mb: 2,
          flexDirection: "row",
          justifyContent: "start",
          flexWrap: "nowrap"
        }}
      >
        <ArrowCircleLeftOutlinedIcon
          onClick={goBack}
          sx={{
            color: "primary.main",
            mr: 1,
            fontSize: { xs: "25px", sm: "30px" },
            cursor: "pointer"
          }}
        />
        <Typography
          variant="h4"
          color="text.secondary"
          className="main_heading"
          sx={{ textAlign: "left" }}
        >
          Select City And RTO
        </Typography>
      </Grid>
      <Formik
        initialValues={{
          rtoValue: rtoValue,
          RTOID,
          RegistrationDate: isBrandNewVehicle
            ? Moment(new Date(InitialRegistrationDate))
            : Moment(new Date(InitialRegistrationDate))
                .subtract(45, "days"),
          PreviousPolicyExpiryDate: Moment(PreviousPolicyExpiryDate,['YYYY/MM/DD']).format("DD/MM/YYYY"),
          IsClaimMade: IsClaimMade,
          NCBDiscount: NCBDiscount
        }}
        validationSchema={Schema}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            store.insurance.setCityAndRto(values);
            await handleSubmit(values);
            store.page.changePage(7);
            props.onChange(7);
          }, 100);
        }}
      >
        {({ values, setFieldValue, errors, touched, dirty, isValid }) => (
          <Form>
            <Grid container rowSpacing={1}>
              <Grid item xs={12}>
                <Autocomplete
                  id="free-solo-2-demo"
                  disableClearable
                  name="rtoValue"
                  fullWidth
                  value={rtoValue}
                  onChange={(e, value) => {
                    setFieldValue("RTOID", value.RTOID);
                    setFieldValue("rtoValue", value);
                    setRTOValue(value);
                  }}
                  options={registrationCity}
                  isOptionEqualToValue={(option, value) =>
                    option.RTOName === value.RTOName
                  }
                  className="custom_autocomplete_container"
                  getOptionLabel={(registrationCity) =>
                    `${registrationCity.FullRtoCode} ${registrationCity.RTOName}`
                  }
                  renderOption={(props, registrationCity) => (
                    <li
                      {...props}
                      key={registrationCity.RTOID}
                      md="3"
                      className="custom_autocomplete_item"
                    >
                      {`${registrationCity.FullRtoCode} ${registrationCity.RTOName}`}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="RTOID"
                      error={errors.RTOID && touched.RTOID ? true : false}
                      helperText={
                        errors.RTOID && touched.RTOID ? errors.RTOID : null
                      }
                      label="Select Registration City"
                      InputProps={{
                        ...params.InputProps,
                        type: "search"
                      }}
                      sx={{ mb: "16px" }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: "16px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                        label="Registered Date"
                        name="RegistrationDate"
                        disableCloseOnSelect={false}
                        value={values.RegistrationDate}
                        minDate={registrationDateMin}
                        maxDate={registrationDateMax}
                        onChange={(newValue) => {
                          setFieldValue("RegistrationDate", newValue);
                          checkRegistrationDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            name="RegistrationDate"
                            error={
                              errors.RegistrationDate &&
                              touched.RegistrationDate
                                ? true
                                : false
                            }
                            helperText={
                              errors.RegistrationDate &&
                              touched.RegistrationDate
                                ? errors.RegistrationDate
                                : null
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {!considerAsBrandNew && (
                        <MobileDatePicker
                          inputFormat="dd/MM/yyyy"
                          label="Previous policy Expire Date"
                          value={values.PreviousPolicyExpiryDate}
                          name="PreviousPolicyExpiryDate"
                          disableCloseOnSelect={false}
                          minDate={new Date(values.RegistrationDate)}
                          onChange={(newValue) => {
                            setFieldValue("PreviousPolicyExpiryDate", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              name="PreviousPolicyExpiryDate"
                              error={
                                errors.PreviousPolicyExpiryDate &&
                                touched.PreviousPolicyExpiryDate
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.PreviousPolicyExpiryDate &&
                                touched.PreviousPolicyExpiryDate
                                  ? errors.PreviousPolicyExpiryDate
                                  : null
                              }
                            />
                          )}
                        />
                      )}
                    </Grid>
                  </Grid>
              </Grid>
              {!considerAsBrandNew && (
                <Grid item xs={12}>
                  <Grid container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth component="fieldset">
                        <Typography
                          sx={{
                            textAlign: "left",
                            color: "text.secondary",
                            fontWeight: 500
                          }}
                          component="p"
                          variant="body1"
                        >
                          Claim Taken Last Year
                        </Typography>
                        <RadioGroup
                          name="IsClaimMade"
                          value={values.IsClaimMade}
                          onChange={(e, value) => {
                            value = value === "false" ? false : true;
                            setFieldValue("IsClaimMade", value);
                          }}
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { sm: "start", xs: "center" },
                            flexWrap: "wrap"
                          }}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Yes"
                            sx={{ width: { sm: "auto", xs: "90%" } }}
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="No"
                            sx={{ width: { sm: "auto", xs: "90%" } }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} align="start">
                      {values.IsClaimMade === false && (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Previous No Claim Bonus
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.NCBDiscount}
                            label="Previous No Claim Bonus"
                            onChange={(e) => {
                              setFieldValue("NCBDiscount", e.target.value);
                            }}
                          >
                            <MenuItem value={"0"}>0%</MenuItem>
                            <MenuItem value={"20"}>20%</MenuItem>
                            <MenuItem value={"25"}>25%</MenuItem>
                            <MenuItem value={"35"}>35%</MenuItem>
                            <MenuItem value={"45"}>45%</MenuItem>
                            <MenuItem value={"50"}>50%</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sx={{ textAlign: { sm: "start", xs: "center" } }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  // disabled={!dirty || !isValid}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CityAndRto;
