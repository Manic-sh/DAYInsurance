import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Moment from "moment";
import { Formik } from "formik";
import { getSnapshot } from "mobx-state-tree";
import React, { useState } from "react";
import * as Yup from "yup";
import { get } from "lodash";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { EventEmitter } from "../../../../services/events";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const generateRegistrationNumber = (registrationCity, RTOID, product) => {
  let city = registrationCity.find((o) => o.RTOID === RTOID);
  city = city.FullRtoCode.split("-").join("");
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

const ModifySearch = (props) => {
  const { store } = props;
  const [open, setOpen] = useState(true);
  // const insurance = getSnapshot(store.insurance);
  const motorCategory = store.insurance.getMotorCategory();

  const savedDetails = store.insurance.getSaveDetails();
  const RTOID = parseInt(savedDetails.RegistrationRTOCode);
  const NCBDiscount = savedDetails.NCBDiscount;
  const IsClaimMade = savedDetails.IsClaimMade;
  const registrationCity = getSnapshot(store.insurance.rtoList);
  const [city, setCityRTO] = useState(
    registrationCity.find((o) => o.RTOID === RTOID)
  );
  const manufacturerlist = store.insurance.getManufacturers();
  const modelsList = store.insurance.getVehicleModels();
  const [models, setModels] = useState(modelsList);

  const isBrandNewVehicle = store.insurance.getIsBrandNewVehicle();

  let reg_min_date = new Date();
  reg_min_date.setFullYear(reg_min_date.getFullYear() - 15);
  const registrationDateMin = reg_min_date;

  let reg_max_date = new Date();
  reg_max_date.setDate(reg_max_date.getDate() + 14);
  const registrationDateMax = reg_max_date;

  // const fuelAndVariantsList = ;
  // const fuelAndVariantsList = getSnapshot(store.insurance.fuelAndVariantsList);
  const [fuelAndVariants, setFuelAndVariantsList] = useState(() =>
    store.insurance.getVehicleVariants()
  );

  const ManufacturerID = parseInt(store.insurance.getManufacturerId());
  const FuelID = savedDetails.FuelID;
  const ModelId = savedDetails.ModelId;
  const VariantID = savedDetails.VariantID;

  let Manufacturer = manufacturerlist.find(
    (m) => m.ManufacturerID === ManufacturerID
  );
  let Model = models.find((m) => m.VehicleID === parseInt(ModelId));
  let Fuel = fuelAndVariants.find((m) => m.FUELID === parseInt(FuelID));
  let variantsFuelData = get(Fuel, "variants", []);

  const getVariantDisplayName = (data) => {
    return data.map((v) => {
      return { ...v, DisplayName: `${v.VariantName} (${v.VehicleCC} cc)` };
    });
  };

  let variantsFuel = getVariantDisplayName(variantsFuelData);

  const [variants, setVariants] = useState(variantsFuel);
  let Variant = variants.find((m) => m.VariantID === parseInt(VariantID));
  const format = "YYYY-MM-DD";
  const RegistrationDate = Moment(
    get(savedDetails, "RegistrationDate"),
    format
  );
  console.log(
    'get(savedDetails, "PreviousPolicyExpiryDate")',
    get(savedDetails, "PreviousPolicyExpiryDate")
  );
  const PreviousPolicyExpiryDate = isBrandNewVehicle
    ? new Date()
    : get(savedDetails, "PreviousPolicyExpiryDate") === ""
    ? new Date()
    : get(savedDetails, "PreviousPolicyExpiryDate");

  console.log(
    "PreviousPolicyExpiryDate",
    PreviousPolicyExpiryDate,
    isBrandNewVehicle
  );

  const [initialValues, setInitialValues] = useState({
    Manufacturer,
    Model,
    Fuel,
    Variant,
    RegistrationDate,
    PreviousPolicyExpiryDate,
    IsClaimMade,
    NCBDiscount,
    // RTOID: city,
  });
  const setFuel = async (Fuel) => {
    // setTimeout(async () => {
    const fuels = get(Fuel, "variants", []);
    setVariants(getVariantDisplayName(fuels));
    setInitialValues({
      ...initialValues,
      Fuel,
      Variant: {
        VariantID: null,
        VariantName: "",
        DisplayName: "",
        VehicleCC: "",
      },
    });
    // }, 500);
  };
  const setVehicleModels = async (value) => {
    // setTimeout(async () => {
    // const ModelId = id;
    const Model = value;
    // let Model = models.find((m) => m.VehicleID === parseInt(ModelId));
    if (Model.VehicleID !== null) {
      const fuels = await store.insurance.fetchVehicleVariants(
        Model.VehicleID,
        motorCategory
      );
      setFuelAndVariantsList(fuels);
    }

    setInitialValues({
      ...initialValues,
      Model,
      Fuel: {
        FUELID: null,
        FUELNAME: "",
        variants: [],
      },
      Variant: {
        VariantID: null,
        VariantName: "",
        DisplayName: "",
        VehicleCC: "",
      },
    });
    // }, 500);
  };
  const setManufacturers = async (id) => {
    // setTimeout(async () => {
    const ManufacturerID = id;
    let Manufacturer = "";
    const manufacturerlist = store.insurance.getManufacturers();
    if (id !== "") {
      const models = await store.insurance.fetchVehicleModel(
        ManufacturerID,
        motorCategory
      );
      setModels(models);
      Manufacturer = manufacturerlist.find(
        (m) => m.ManufacturerID === ManufacturerID
      );
    } else {
      setModels([]);
    }

    setFuelAndVariantsList([]);

    setInitialValues({
      ...initialValues,
      Manufacturer,
      Model: {
        VehicleID: null,
        VehicleName: "",
      },
      Fuel: {
        FUELID: null,
        FUELNAME: "",
        variants: [],
      },
      Variant: {
        VariantID: null,
        VariantName: "",
        DisplayName: "",
        VehicleCC: "",
      },
    });
    // }, 500);
  };

  const SearchSchema = Yup.object().shape({
    Manufacturer: Yup.object().required("Manufacturer is required"),
    Model: Yup.object().required("Modal is required"),
    Fuel: Yup.object().required("Fuel is required"),
    Variant: Yup.object().required("Variant is required"),
    RegistrationDate: Yup.date().required("Registration Date is required"),
    PreviousPolicyExpiryDate: Yup.date().when({
      is: () => {
        console.log("isBrandNewVehicle", isBrandNewVehicle);
        return isBrandNewVehicle ? false : true;
      },
      then: Yup.date().required("Car Registration Date is required"),
    }),
    // RTOID: Yup.string().required("Required Registration City"),
    RTOID: Yup.object().required("Registration City is required"),
    IsClaimMade: Yup.boolean().required("Required"),
  });

  const handleClose = () => {
    setOpen(false);
    setTimeout(async () => {
      props.close();
    }, 500);
  };

  const handleSubmit = async (values) => {
    // console.log("test");
    const product = JSON.parse(sessionStorage.getItem("Product"));
    const registrationNumber = generateRegistrationNumber(
      registrationCity,
      values.RTOID.RTOID,
      product
    );
    await store.insurance.setVehicleModelSelected(values.Model);
    store.insurance.setVariantId(values.Variant);
    store.insurance.setFuelId(values.Fuel);
    store.insurance.setCubicCapacity(values.Variant.VehicleCC);
    store.insurance.setMasterVehicleCode(
      String(parseInt(values.Variant.MasterVehicleCode))
    );
    store.insurance.setVehicleManufacturerSelected(values.Manufacturer);
    store.insurance.setRegistrationDate(
      Moment(values.RegistrationDate).format(format)
    );
    store.insurance.setPreviousPolicyExpiryDate(
      Moment(values.PreviousPolicyExpiryDate).format(format)
    );
    store.insurance.setYear(Moment(values.RegistrationDate).format("YYYY"));
    const insurance = store.insurance;
    savedDetails.VehicleCode = insurance.MasterVehicleCode;
    savedDetails.MakeID = String(insurance.MakeId);
    savedDetails.FuelID = String(insurance.fuelId);
    savedDetails.VariantID = String(insurance.variantId);
    savedDetails.ModelId = String(insurance.ModelId);
    savedDetails.CubicCapacity = String(insurance.CubicCapacity);
    savedDetails.RegistrationDate = Moment(values.RegistrationDate).format(
      format
    );
    savedDetails.ManufacturingDate = Moment(values.RegistrationDate).format(
      format
    );
    savedDetails.PreviousPolicyExpiryDate = Moment(
      values.PreviousPolicyExpiryDate
    ).format(format);
    savedDetails.RegistrationNumber = registrationNumber;
    console.log("submit", values.RTOID);
    savedDetails.RegistrationRTOCode = String(values.RTOID.RTOID);

    savedDetails.IsClaimMade = values.IsClaimMade;
    savedDetails.NCBDiscount = values.NCBDiscount;
    await store.insurance.setSelectedRTO(values.RTOID.RTOID);
    await store.insurance.setSaveDetailRequest();

    const res = await store.insurance.saveDetails(savedDetails);
    store.insurance.setEnqNo(res.data);
    store.insurance.setSaveDetailRequest(savedDetails);
    EventEmitter.dispatch("modifySearch");
    handleClose();
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        scroll={"paper"}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          sx={{
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          color="primary.main"
          id="scroll-dialog-title"
        >
          Modify Your Search
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider light />
        <Formik
          initialValues={{ ...initialValues, RTOID: city }}
          validationSchema={SearchSchema}
          validateOnMount={true}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          enableReinitialize={true}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogContent
                dividers={true}
                // sx={{ height: { sm: "350px", xs: "550px" } }}
                className="inner_scrollbar"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      value={props.values.Manufacturer}
                      name="Manufacturer"
                      onChange={(e, value) => {
                        props.setFieldValue(
                          "Manufacturer",
                          get(value, "ManufacturerID", "")
                        );

                        setManufacturers(get(value, "ManufacturerID", ""));
                      }}
                      isOptionEqualToValue={(option, value) => {
                        return true;
                        //  return option.value === value.value;
                      }}
                      options={manufacturerlist}
                      renderOption={(props, option) => (
                        <li {...props} key={option.ManufacturerID}>
                          {`${option.Manufacturername}`}
                        </li>
                      )}
                      getOptionLabel={(option) => {
                        return get(option, "Manufacturername", "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`${motorCategory} Manufacturer`}
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                          }}
                          error={
                            props.errors.Manufacturer &&
                            props.touched.Manufacturer
                              ? true
                              : false
                          }
                          helperText={
                            props.errors.Manufacturer &&
                            props.touched.Manufacturer
                              ? props.errors.Manufacturer
                              : null
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      name="Model"
                      value={props.values.Model}
                      onChange={(e, value) => {
                        props.setFieldValue("Model", value);
                        setVehicleModels(value);
                      }}
                      isOptionEqualToValue={(option, value) => {
                        return true;
                      }}
                      options={models}
                      renderOption={(props, option) => (
                        <li {...props} key={option.VehicleID}>
                          {`${option.VehicleName}`}
                        </li>
                      )}
                      getOptionLabel={(option) => {
                        return get(option, "VehicleName", "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`${motorCategory} Model`}
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                          }}
                          error={
                            props.errors.Model && props.touched.Model
                              ? true
                              : false
                          }
                          helperText={
                            props.errors.Model && props.touched.Model
                              ? props.errors.Model
                              : null
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      name="Fuel"
                      value={props.values.Fuel}
                      onChange={(e, value) => {
                        props.setFieldValue("Fuel", value);
                        setFuel(value);
                      }}
                      isOptionEqualToValue={(option, value) => {
                        return true;
                      }}
                      options={fuelAndVariants}
                      renderOption={(props, option) => (
                        <li {...props} key={option.FUELID}>
                          {`${option.FUELNAME}`}
                        </li>
                      )}
                      getOptionLabel={(option) => option.FUELNAME}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`${motorCategory} Fuel`}
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                          }}
                          error={
                            props.errors.Fuel && props.touched.Fuel
                              ? true
                              : false
                          }
                          helperText={
                            props.errors.Fuel && props.touched.Fuel
                              ? props.errors.Fuel
                              : null
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      name="Variant"
                      value={props.values.Variant}
                      onChange={(e, value) => {
                        props.setFieldValue("Variant", value);
                      }}
                      isOptionEqualToValue={(option, value) => {
                        return true;
                      }}
                      options={variants}
                      renderOption={(props, option) => (
                        <li {...props} key={option.VariantID}>
                          {option.DisplayName}
                        </li>
                      )}
                      getOptionLabel={(option) => {
                        return option.DisplayName;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`${motorCategory} Variant`}
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                          }}
                          error={
                            props.errors.Variant && props.touched.Variant
                              ? true
                              : false
                          }
                          helperText={
                            props.errors.Variant && props.touched.Variant
                              ? props.errors.Variant
                              : null
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <MobileDatePicker
                            label="Exact registration date of your car"
                            inputFormat="dd/MM/yyyy"
                            value={props.values.RegistrationDate}
                            minDate={registrationDateMin}
                            maxDate={registrationDateMax}
                            onChange={(value) => {
                              props.setFieldValue("RegistrationDate", value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                error={
                                  props.errors.RegistrationDate &&
                                  props.touched.RegistrationDate
                                    ? true
                                    : false
                                }
                                helperText={
                                  props.errors.RegistrationDate &&
                                  props.touched.RegistrationDate
                                    ? props.errors.RegistrationDate
                                    : null
                                }
                              />
                            )}
                          />
                        </Grid>
                        {!isBrandNewVehicle && (
                          <Grid item xs={12} sm={6}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              label="Previous year policy expiry date"
                              value={props.values.PreviousPolicyExpiryDate}
                              onChange={(value) => {
                                props.setFieldValue(
                                  "PreviousPolicyExpiryDate",
                                  value
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  error={
                                    props.errors.PreviousPolicyExpiryDate &&
                                    props.touched.PreviousPolicyExpiryDate
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    props.errors.PreviousPolicyExpiryDate &&
                                    props.touched.PreviousPolicyExpiryDate
                                      ? props.errors.PreviousPolicyExpiryDate
                                      : null
                                  }
                                />
                              )}
                            />
                          </Grid>
                        )}
                      </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container columnSpacing={2} rowSpacing={1}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth component="fieldset">
                          <Typography
                            sx={{
                              textAlign: "left",
                              color: "text.secondary",
                              fontWeight: 500,
                            }}
                            component="p"
                            variant="body1"
                          >
                            Claim Taken Last Year
                          </Typography>
                          <RadioGroup
                            name="IsClaimMade"
                            value={props.values.IsClaimMade}
                            onChange={(e, value) => {
                              value = value === "false" ? false : true;
                              props.setFieldValue("IsClaimMade", value);
                            }}
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { sm: "start", xs: "center" },
                              flexWrap: "wrap",
                            }}
                          >
                            <FormControlLabel
                              value={true}
                              control={<Radio />}
                              label="Yes"
                              sx={{ width: { sm: "auto", xs: "90%" } }}
                            />
                            <FormControlLabel
                              value={false}
                              control={<Radio />}
                              label="No"
                              sx={{ width: { sm: "auto", xs: "90%" } }}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {props.values.IsClaimMade === false && (
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Previous No Claim Bonus
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={props.values.NCBDiscount}
                              label="Previous No Claim Bonus"
                              onChange={(e) => {
                                props.setFieldValue(
                                  "NCBDiscount",
                                  e.target.value
                                );
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
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disableClearable
                      name="RTOID"
                      fullWidth
                      value={props.values.RTOID}
                      onChange={(e, value) => {
                        props.setFieldValue("RTOID", value);
                        setCityRTO(value);
                      }}
                      // isOptionEqualToValue={(option, value) =>
                      //   option.value === value.value
                      // }
                      options={registrationCity}
                      className="custom_autocomplete_container"
                      renderOption={(props, option) => (
                        <li
                          {...props}
                          key={option.RTOID}
                          md="3"
                          className="custom_autocomplete_item"
                        >
                          {`${option.FullRtoCode} ${option.RTOName}`}
                        </li>
                      )}
                      getOptionLabel={(option) => {
                        return typeof option === "object"
                          ? `${option.FullRtoCode} ${option.RTOName}`
                          : "";
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="RTOID"
                          error={
                            props.errors.RTOID && props.touched.RTOID
                              ? true
                              : false
                          }
                          helperText={
                            props.errors.RTOID && props.touched.RTOID
                              ? props.errors.RTOID
                              : null
                          }
                          label="Select Registration City"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                          sx={{ mb: "16px" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  // onClick={handleClose}
                  variant="outlined"
                  sx={{ textTransform: "capitalize" }}
                >
                  Save Modify
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default ModifySearch;
