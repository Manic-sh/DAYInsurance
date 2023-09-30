import React, { useState } from "react";
import { getSnapshot } from "mobx-state-tree";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Typography from "@mui/material/Typography";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import { BusIcon } from "../icons";
import { TrackIcon } from "../icons";
// import { CraneIcon } from "../icons";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black
  }
}));

const Options = {
  pvtCar: "0",
  tw: "1",
  commercial: "2"
};

const Options2 = {
  gcv: "0",
  pcv: "1",
  rickshaw: "2",
  bus: "3",
  truck: "4",
  misc: "5",
  trailer: "6"
};

const Options3 = {
  comprehensive: "0",
  thirdParty: "2",
  standalone_OD: "5"
};

const Options4 = {
  public: "0",
  private: "1",
  both: "2"
};

const MotorCategories = (props) => {
  const name = "selectedOption";
  const name2 = "selectedOption2";
  const name3 = "selectedOption3";
  const name4 = "selectedOption4";

  const [loading, setLoading] = useState(false);
  const { store } = props;

  const motorCategories = getSnapshot(store.insurance.motorCategories)[0];
  let initialValues = {
    selectedOption: Options.pvtCar,
    selectedOption2: Options2.gcv,
    selectedOption4: Options4.public,
    selectedOption3: Options3.comprehensive
  };

  if (motorCategories) {
    initialValues = motorCategories;
  }
  const handleSubmitForm = async (submitForm) => {
    await store.insurance.setIsBrandNewVehicle(true);
    await submitForm();
  };
  const handleisBrandNewVehicle = () => {
    store.insurance.setIsBrandNewVehicle(false);
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ alignItems: { sm: "start", xs: "center" } }}
      >
        <Typography
          variant="h4"
          color="text.secondary"
          className="main_heading"
        >
          Save upto
          <Typography
            component="span"
            color="primary.main"
            sx={{ fontWeight: "bold", fontSize: "2rem", marginLeft: "8px" }}
          >
            80%
          </Typography>{" "}
          on car insurance
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, fontSize: { sm: "1.325rem", xs: "1.12rem" } }}
          color="primary.main"
        >
          Renew in 2 minutes
        </Typography>
      </Grid>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const { store } = props;

          const insurance = store.insurance;

          let productTypeNum = "0";
          let vehicleTypeName = "0";

          if (values.selectedOption !== "2") {
            productTypeNum = values.selectedOption;
          } else {
            switch (values.selectedOption2) {
              case "0":
                productTypeNum = "2";
                break;
              case "1":
                productTypeNum = "3";
                break;
              case "2":
                productTypeNum = "3";
                break;
              case "3":
                productTypeNum = "3";
                break;
              case "4":
                productTypeNum = "2";
                break;
              case "5":
                productTypeNum = "4";
                break;
              case "6":
                productTypeNum = "4";
                break;
              default:
                productTypeNum = "2";
            }
            vehicleTypeName = values.selectedOption4;
          }

          insurance.setFirstFormValues({
            Product: productTypeNum,
            vehicleType: vehicleTypeName,
            coverType: values.selectedOption3
          });
          setLoading(true);
          setTimeout(async () => {
            insurance.setMotorCategories([values]);
            let selectedOption = "CAR";

            var SelectedType;
            switch (values.selectedOption) {
              case "1":
                selectedOption = "TW";
                break;
              case "2":
                selectedOption = "COMMERCIAL";
                break;

              default:
                selectedOption = "CAR";
                break;
            }
            if (selectedOption === "CAR" || selectedOption === "TW") {
              SelectedType = selectedOption;
            }
            if (selectedOption === "COMMERCIAL") {
              let selectedOption2 = "GCV";
              switch (values.selectedOption2) {
                case "1":
                  selectedOption2 = "PCV";
                  break;
                case "2":
                  selectedOption2 = "RICKSHAW";
                  break;
                case "3":
                  selectedOption2 = "BUS";
                  break;
                case "4":
                  selectedOption2 = "TRUCK";
                  break;
                case "5":
                  selectedOption2 = "MISC";
                  break;
                case "6":
                  selectedOption2 = "TRAILER";
                  break;

                default:
                  selectedOption2 = "GCV";
                  break;
              }
              SelectedType = selectedOption2;
            }
            insurance.setMotorCategory(SelectedType);
            // insurance.setMotorCategoryType(selectedOption4);
            const manufacturers = await insurance.fetchManufacturer(
              SelectedType
            );
            setLoading(false);
            await insurance.setManufacturers(manufacturers);
            store.page.changePage(2);
            actions.setSubmitting(false);
            props.onChange(2);
          }, 100);
        }}
      >
        {({ values, setFieldValue, submitForm }) => (
          <Form>
            <Grid
              container
              rowSpacing={1}
              sx={{ justifyContent: { sm: "start", xs: "center" } }}
            >
              <Grid item xs={12}>
                <FormControl fullWidth component="fieldset">
                  <RadioGroup
                    name={name}
                    value={values.selectedOption.toString()}
                    onChange={(event) => {
                      setFieldValue(name, event.currentTarget.value);
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "start",
                      alignItems: "center"
                    }}
                    className="custom_style category_card"
                  >
                    <FormControlLabel
                      value={Options.pvtCar.toString()}
                      className="custom_card"
                      sx={{ flexDirection: "column" }}
                      control={
                        <Radio
                          icon={<DirectionsCarIcon />}
                          checkedIcon={<DirectionsCarIcon />}
                          sx={{
                            "&.Mui-checked": {
                              "&, & + .MuiFormControlLabel-label": {
                                color: "primary.main"
                              }
                            }
                          }}
                        />
                      }
                      label="Pvt Car"
                      title="Private car insurance is a type of motor insurance policy that covers your personal car"
                    />
                    <FormControlLabel
                      value={Options.tw.toString()}
                      className="custom_card"
                      sx={{ flexDirection: "column" }}
                      control={
                        <Radio
                          icon={<TwoWheelerIcon />}
                          checkedIcon={<TwoWheelerIcon />}
                          sx={{
                            "&.Mui-checked": {
                              "&, & + .MuiFormControlLabel-label": {
                                color: "primary.main"
                              }
                            }
                          }}
                        />
                      }
                      label="TW"
                      title="Two wheeler insurance, or bike insurance, is an insurance policy that helps you to cover against damages that may happen to both you and to your two-wheeler due to events like accidents, thefts, fires, or natural disasters. You will also get protection against liabilities arising due to damages to any third-party vehicle, property or person. A two-wheeler insurance covers different types of two-wheelers, like motorcycles, mopeds, scooters and more."
                    />
                    <FormControlLabel
                      value={Options.commercial.toString()}
                      className="custom_card"
                      sx={{ flexDirection: "column" }}
                      control={
                        <Radio
                          icon={<TrackIcon />}
                          checkedIcon={<TrackIcon />}
                          sx={{
                            "&.Mui-checked": {
                              "&, & + .MuiFormControlLabel-label": {
                                color: "primary.main"
                              }
                            }
                          }}
                        />
                      }
                      label="Commercial"
                      title="A Commercial Vehicle Insurance is a customized motor insurance policy to cover for damages and losses caused to or by a commercial vehicle and the respective owner-driver. This could include damages and losses in situations such as accidents, collisions, natural calamities, fires, etc. It is mandatory for all businesses to buy a commercial vehicle insurance for their vehicles, such as for auto-rickshaws, cabs, school buses, tractors, commercial vans and trucks, amongst others."
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {values.selectedOption === "2" && (
                  <Grid container rowSpacing={1} align="start">
                    <Grid item xs={12}>
                      <FormControl fullWidth component="fieldset">
                        <RadioGroup
                          name={name2}
                          value={values.selectedOption2.toString()}
                          onChange={(event) => {
                            setFieldValue(name2, event.currentTarget.value);
                          }}
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { sm: "start", xs: "center" },
                            flexWrap: "wrap"
                          }}
                        >
                          <BootstrapTooltip title="Goods Carrying Vehicle">
                            <FormControlLabel
                              value={Options2.gcv.toString()}
                              control={
                                <Radio
                                  sx={{
                                    display: "none",
                                    "&.Mui-checked": {
                                      "&, & + .MuiFormControlLabel-label": {
                                        color: "primary.main"
                                      }
                                    }
                                  }}
                                />
                              }
                              className="custom_card custom_card2"
                              label="GCV"
                            />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Passenger Carrying Vehicle">
                            <FormControlLabel
                              value={Options2.pcv.toString()}
                              control={
                                <Radio
                                  sx={{
                                    display: "none",
                                    "&.Mui-checked": {
                                      "&, & + .MuiFormControlLabel-label": {
                                        color: "primary.main"
                                      }
                                    }
                                  }}
                                />
                              }
                              className="custom_card custom_card2"
                              label="PCV"
                            />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Auto Rickshaw">
                            <FormControlLabel
                              value={Options2.rickshaw.toString()}
                              control={
                                <Radio
                                  sx={{
                                    display: "none",
                                    "&.Mui-checked": {
                                      "&, & + .MuiFormControlLabel-label": {
                                        color: "primary.main"
                                      }
                                    }
                                  }}
                                />
                              }
                              className="custom_card custom_card2"
                              label="Auto Rickshaw"
                            />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Bus">
                            <FormControlLabel
                              value={Options2.bus.toString()}
                              control={
                                <Radio
                                  sx={{
                                    display: "none",
                                    "&.Mui-checked": {
                                      "&, & + .MuiFormControlLabel-label": {
                                        color: "primary.main"
                                      }
                                    }
                                  }}
                                />
                              }
                              className="custom_card custom_card2"
                              label="Bus"
                            />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Truck">
                            <FormControlLabel
                              value={Options2.truck.toString()}
                              control={
                                <Radio
                                  sx={{
                                    display: "none",
                                    "&.Mui-checked": {
                                      "&, & + .MuiFormControlLabel-label": {
                                        color: "primary.main"
                                      }
                                    }
                                  }}
                                />
                              }
                              className="custom_card custom_card2"
                              label="Truck"
                            />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Misc">
                            <FormControlLabel
                              value={Options2.misc.toString()}
                              control={
                                <Radio
                                  sx={{
                                    display: "none",
                                    "&.Mui-checked": {
                                      "&, & + .MuiFormControlLabel-label": {
                                        color: "primary.main"
                                      }
                                    }
                                  }}
                                />
                              }
                              className="custom_card custom_card2"
                              label="Misc"
                            />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Trailer">
                            <FormControlLabel
                              value={Options2.trailer.toString()}
                              control={
                                <Radio
                                  sx={{
                                    display: "none",
                                    "&.Mui-checked": {
                                      "&, & + .MuiFormControlLabel-label": {
                                        color: "primary.main"
                                      }
                                    }
                                  }}
                                />
                              }
                              className="custom_card custom_card2"
                              label="Trailer"
                            />
                          </BootstrapTooltip>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth component="fieldset">
                        <RadioGroup
                          name={name4}
                          value={values.selectedOption4.toString()}
                          onChange={(event) => {
                            setFieldValue(name4, event.currentTarget.value);
                          }}
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { sm: "start", xs: "center" },
                            flexWrap: "wrap"
                          }}
                        >
                          <FormControlLabel
                            value={Options4.public.toString()}
                            control={<Radio />}
                            label="Public"
                            sx={{ width: { sm: "auto", xs: "90%" } }}
                          />
                          <FormControlLabel
                            value={Options4.private.toString()}
                            control={<Radio />}
                            label="Private"
                            sx={{ width: { sm: "auto", xs: "90%" } }}
                          />

                          <FormControlLabel
                            value={Options4.both.toString()}
                            control={<Radio />}
                            label="Both"
                            sx={{ width: { sm: "auto", xs: "90%" } }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth component="fieldset">
                  <RadioGroup
                    name={name3}
                    value={values.selectedOption3.toString()}
                    onChange={(event) => {
                      setFieldValue(name3, event.currentTarget.value);
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { sm: "start", xs: "center" },
                      flexWrap: "wrap"
                    }}
                  >
                    <FormControlLabel
                      value={Options3.comprehensive.toString()}
                      control={<Radio />}
                      label="Comprehensive"
                      sx={{ width: { sm: "auto", xs: "90%" } }}
                      title="A comprehensive car insurance is an all-inclusive car insurance policy that covers you from both third-party damages and losses and own damages. This includes protection from unforeseen losses such as amid an accident, natural calamity, fire or theft. 
Additionally, with Digit’s Comprehensive Car Insurance, you can customize your policy further with a range of add-on covers such a zero depreciation cover, return to invoice and breakdown assistance among many others.
Know more about:
•	Third-party car insurance
•	Own damage car insurance
"
                    />
                    <FormControlLabel
                      value={Options3.thirdParty.toString()}
                      control={<Radio />}
                      label="Third Party"
                      sx={{ width: { sm: "auto", xs: "90%" } }}
                      title="Third-party car insurance, which is also called third party liability insurance, covers you against any liability which can happen in case of any loss or damage caused to any third-party vehicle, person or property. Unfortunately, it doesn’t cover your own vehicle damages.
A Third-Party Car Insurance is mandatory by the Motor Vehicles Act in India without which you will be liable for a heavy fine; whilst it also protects your pocket from any losses that could arise if your car were to damage any third-party vehicle, person or property. 
For example, if you accidentally damage another car’s headlights, your third-party car insurance will cover for the losses incurred to the third-party due to the same."
                    />
                    <FormControlLabel
                      value={Options3.standalone_OD.toString()}
                      control={<Radio />}
                      label="Standalone OD"
                      sx={{ width: { sm: "auto", xs: "90%" } }}
                      title="As the name suggests, standalone own-damage car insurance is a policy that specifically covers for your own car’s damages and losses. This includes damages and losses caused due to accidents and collisions, natural calamities, fires, and thefts."
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ textAlign: { xs: "center", md: "left" } }}
                >
                  <LoadingButton
                    disabled={loading}
                    type="submit"
                    sx={{ mt: 2, fontSize: 16 }}
                    className="main_btn"
                    endIcon={<DoubleArrowIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    onClick={handleisBrandNewVehicle}
                  >
                    Proceed without Number
                  </LoadingButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ textAlign: { xs: "center", md: "right" } }}
                >
                  <Button
                    onClick={() => handleSubmitForm(submitForm)}
                    type="button"
                    sx={{ mt: 2, fontSize: 16 }}
                    endIcon={<DoubleArrowIcon />}
                    variant="contained"
                  >
                    Brand New Vehicle?
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MotorCategories;
