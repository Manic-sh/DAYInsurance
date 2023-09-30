import { flow, getSnapshot, types } from "mobx-state-tree";
import {
  GetManufacturer,
  GetVehicleModel,
  GetVehicleVariantsModel,
  GetRTO,
  PostDetails,
} from "../api/insurance";
import { GetDeclineCompanies } from "../api/proposal";
import { get } from "lodash";

export const MotorCategories = types.model({
  selectedOption: types.optional(types.string, "-"),
  selectedOption2: types.optional(types.string, "-"),
  selectedOption3: types.optional(types.string, "-"),
  selectedOption4: types.optional(types.string, "-"),
  usageType: types.optional(types.string, "-"),
});

export const Manufacturers = types.model({
  Manufacturername: types.optional(types.string, "-"),
  ManufacturerID: types.optional(types.number, 0),
  LogoPath: types.optional(types.string, "-"),
  IsDisplay: types.optional(types.boolean, false),
});

export const Models = types.model({
  VehicleName: types.optional(types.string, "-"),
  VehicleID: types.optional(types.number, 0),
});

export const Variants = types.model({
  VariantName: types.optional(types.string, "-"),
  VariantID: types.optional(types.number, 0),
  VehicleCC: types.optional(types.number, 0),
  MasterVehicleCode: types.optional(types.number, 0),
});

export const Fuel = types.model({
  FUELNAME: types.optional(types.string, "-"),
  FUELID: types.optional(types.number, 0),
  variants: types.optional(types.array(Variants), []),
});

export const RTO = types.model({
  RTOName: types.optional(types.string, "-"),
  RTOID: types.optional(types.number, 0),
  FullRtoCode: types.optional(types.string, "-"),
});

export const DeclineCompDetails = types.model({
  CompanyID: types.optional(types.number, 100),
  CompanyName: types.optional(types.string, ""),
});

export const Insurance = types
  .model({
    motorCategories: types.optional(types.array(MotorCategories), []),
    manufacturers: types.optional(types.array(Manufacturers), []),
    vehicleModels: types.optional(types.array(Models), []),
    vehicleVariants: types.optional(types.array(Fuel), []),
    rtoList: types.optional(types.array(RTO), []),
    fuelId: types.optional(types.number, 0),
    variantId: types.optional(types.number, 0),
    ModelId: types.optional(types.number, 0),
    year: types.optional(types.number, 0),
    vehicleModelSelected: types.optional(types.string, ""),
    CubicCapacity: types.optional(types.number, 0),
    MakeId: types.optional(types.number, 0),
    isBrandNewVehicle: types.optional(types.boolean, false),
    RegistrationRTOCode: types.optional(types.number, 0),
    RegistrationDate: types.optional(types.string, ""),
    ManufacturingDate: types.optional(types.string, ""),
    PreviousPolicyExpiryDate: types.optional(types.string, ""),
    IsClaimMade: types.optional(types.boolean, false),
    NCBDiscount: types.optional(types.string, "0"),
    Email: types.optional(types.string, ""),
    CustName: types.optional(types.string, ""),
    Mobile: types.optional(types.string, ""),
    Product: types.optional(types.string, "0"),
    vehicleType: types.optional(types.string, "0"),
    coverType: types.optional(types.string, "0"),
    usageType: types.optional(types.string, "KFZOT"),
    MasterVehicleCode: types.optional(types.string, ""),
    EnqNo: types.optional(types.string, ""),
    declineCompDetails: types.optional(types.array(DeclineCompDetails), []),
  })
  .actions((self) => ({
    setMotorCategories(motorCategories) {
      self.motorCategories = motorCategories;
    },
    setManufacturers(manufacturers) {
      self.manufacturers = manufacturers;
    },
    getManufacturers() {
      return self.manufacturers;
    },
    setVehicleModels(vehicleModels) {
      // console.log('vehicleModels',vehicleModels);
      self.vehicleModels = vehicleModels;
    },
    getVehicleModels() {
      return getSnapshot(self.vehicleModels);
    },
    setMotorCategory(value) {
      sessionStorage.setItem("motorCategory", value);
    },
    getMotorCategory() {
      return sessionStorage.getItem("motorCategory");
    },
    setMotorCategoryType(value) {
      console.log("setMotorCategory", value);
      sessionStorage.setItem("motorCategoryType", value);
    },
    getMotorCategoryType() {
      return sessionStorage.getItem("motorCategoryType");
    },
    setVehicleModelSelected(values) {
      self.vehicleModelSelected = get(values, "VehicleName", "");
      self.ModelId = get(values, "VehicleID", 0);
      sessionStorage.setItem("ModelName", get(values, "VehicleName", ""));
    },
    setVehicleVariants(vehicleVariants) {
      self.vehicleVariants = vehicleVariants;
    },
    getVehicleVariants() {
      return getSnapshot(self.vehicleVariants);
    },
    setCubicCapacity(value) {
      self.CubicCapacity = value;
      sessionStorage.setItem("cubicCapacity", value);
    },
    setMasterVehicleCode(value) {
      self.MasterVehicleCode = value;
    },
    setVehicleManufacturerSelected(values) {
      self.vehicleManufacturerSelected = values.Manufacturername;
      self.MakeId = values.ManufacturerID;
      sessionStorage.setItem("Manufacturer", values.Manufacturername);
      sessionStorage.setItem("ManufacturerId", values.ManufacturerID);
    },
    setFuelId(values) {
      self.fuelId = values.FUELID;
      sessionStorage.setItem("fuel", values.FUELNAME);
    },
    setVariantId(values) {
      self.variantId = values.VariantID;
      sessionStorage.setItem("variantName", values.VariantName);
      sessionStorage.setItem("variantId", values.VariantID);
    },
    setYear(year) {
      self.year = parseInt(year);
      sessionStorage.setItem("year", year);
    },
    getYear() {
      return sessionStorage.getItem("year");
    },
    setSelectedRTO(value) {
      const rtoList = getSnapshot(self.rtoList);
      const RTO = rtoList.find((v) => v.RTOID === value);
      if (RTO) sessionStorage.setItem("RTO", JSON.stringify(RTO));
    },
    setRTO(rtoList) {
      self.rtoList = rtoList;
    },
    setIsBrandNewVehicle(isBrandNewVehicle) {
      self.isBrandNewVehicle = isBrandNewVehicle;
      sessionStorage.setItem(
        "isBrandNewVehicle",
        JSON.stringify(isBrandNewVehicle)
      );
    },
    getIsBrandNewVehicle() {
      return JSON.parse(sessionStorage.getItem("isBrandNewVehicle"));
    },
    setFirstFormValues(values) {
      self.Product = values.Product;
      self.vehicleType = values.vehicleType;
      self.coverType = values.coverType;
      sessionStorage.setItem("Product", JSON.stringify(values.Product));
    },
    setCityAndRto(values) {
      self.RegistrationRTOCode = values.RegistrationRTOCode;
      self.RegistrationDate = String(values.RegistrationDate);
      self.PreviousPolicyExpiryDate = String(values.PreviousPolicyExpiryDate);
      self.IsClaimMade = values.IsClaimMade;
      self.NCBDiscount = values.NCBDiscount;
      sessionStorage.setItem(
        "RegistrationRTOCode",
        values.rtoValue.FullRtoCode
      );
      sessionStorage.setItem("RegistrationDate", values.RegistrationDate);
      sessionStorage.setItem(
        "PreviousPolicyExpiryDate",
        values.PreviousPolicyExpiryDate
      );
      sessionStorage.setItem("IsClaimMade", values.IsClaimMade);
      sessionStorage.setItem("NCBDiscount", values.NCBDiscount);
    },
    setRegistrationDate(values) {
      self.RegistrationDate = String(values);
      sessionStorage.setItem("RegistrationDate", values);
      self.ManufacturingDate = String(values);
      sessionStorage.setItem("ManufacturingDate", values);
    },
    setPreviousPolicyExpiryDate(values) {
      self.PreviousPolicyExpiryDate = String(values);
      sessionStorage.setItem("PreviousPolicyExpiryDate", values);
    },
    setUserDetails(values) {
      self.Email = values.Email;
      self.CustName = values.CustName;
      self.Mobile = values.Mobile;
    },
    setEnqNo(EnqNo) {
      self.EnqNo = EnqNo;
      sessionStorage.setItem("EnqNo", EnqNo);
    },
    getEnqNo() {
      return sessionStorage.getItem("EnqNo");
    },
    getSaveDetails() {
      return JSON.parse(sessionStorage.getItem("SaveDetailRequest"));
    },
    getManufacturerId() {
      return sessionStorage.getItem("ManufacturerId");
    },
    setSaveDetailRequest(req) {
      sessionStorage.setItem("SaveDetailRequest", JSON.stringify(req));
    },
    getSaveDetailRequest() {
      return JSON.parse(sessionStorage.getItem("SaveDetailRequest"));
    },
    getDeclineCompaniesData() {
      return JSON.parse(sessionStorage.getItem("DeclineCompanies"));
    },
    getHeaderDetails() {
      return {
        modelName: sessionStorage.getItem("ModelName"),
        manufacturer: sessionStorage.getItem("Manufacturer"),
        variantName: sessionStorage.getItem("variantName"),
        cubicCapacity: sessionStorage.getItem("cubicCapacity"),
        motorCategory: sessionStorage.getItem("motorCategory"),
        fuel: sessionStorage.getItem("fuel"),
        year: sessionStorage.getItem("year"),
        RTO: JSON.parse(sessionStorage.getItem("RTO")),
      };
    },
    fetchManufacturer: flow(function* fetchManufacturer(payload) {
      try {
        const data = yield GetManufacturer(payload);
        self.setManufacturers(data);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchVehicleModel: flow(function* fetchVehicleModel(payload, SubType) {
      try {
        const data = yield GetVehicleModel(payload, SubType);
        self.setVehicleModels(data);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchVehicleVariants: flow(function* fetchVehicleVariants(
      payload,
      SubType
    ) {
      try {
        const data = yield GetVehicleVariantsModel(payload, SubType);
        // console.log('data >>> ', data)
        self.setVehicleVariants(data);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchRTO: flow(function* fetchRTO() {
      try {
        const data = yield GetRTO();
        self.setRTO(data);
        return data;
      } catch (error) {
        return error;
      }
    }),
    saveDetails: flow(function* saveDetails(payload) {
      try {
        const data = yield PostDetails(payload);
        self.setEnqNo(data.data);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchDeclineCompanies: flow(function* fetchDeclineCompanies(EnquiryNo) {
      try {
        const data = yield GetDeclineCompanies(EnquiryNo);
        self.declineCompDetails = data;
        sessionStorage.setItem("DeclineCompanies", JSON.stringify(data));
        return data;
      } catch (error) {
        return error;
      }
    }),
  }));
