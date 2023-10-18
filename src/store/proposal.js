import { flow, types } from "mobx-state-tree";
import {
  PostProposalDetails,
  PostNomineeDetails,
  PostVehicleDetails,
  PostEmail,
  GetStates,
  GetCity,
  GetPreviousInsurer,
  GetFinancerDetails,
  GetGarages,
  GetBankInfo,
  PostCheckInfo,
  PostProposalService,
  PostSavePlanDetails,
  GetRehitePremium,
  GetNominee,
  GetOccupation,
  GetPinCode,
  GetKYCStatus,
  GetUploadFileTypes,
  PostUploadFiles,
  getTnCData,
} from "../api/proposal";
import Moment from "moment";

const birthDate = Moment(new Date()).subtract(18, "years").calendar();

export const OccupationList = types.model({
  name: types.optional(types.string, ""),
  CODE: types.optional(types.string, ""),
});
export const OwnerDetails = types.model({
  Title: types.optional(types.string, "mr"),
  CustomerName: types.optional(types.string, ""),
  LastName: types.optional(types.string, ""),
  MobileNo: types.optional(types.string, ""),
  EmailId: types.optional(types.string, ""),
  Gender: types.optional(types.string, "M"),
  Occupation: types.optional(types.string, ""),
  occupationlist: types.optional(types.maybe(OccupationList)),
  MaritalStatus: types.optional(types.string, "M"),
  DOB: types.optional(types.string, birthDate),
  VehicleOwnedBy: types.optional(types.string, "1"),
  EnquiryNo: types.optional(types.string, ""),
  GSTNumber: types.optional(types.string, "0"),
  PanNumber: types.optional(types.string, ""),
  AadharNo: types.optional(types.string, ""),
});
export const AnyJsonValue = types.union(
  types.string,
  types.number,
  types.undefined,
  types.null
);

export const Base64String = types.refinement(types.string, (value) => {
  // Add your base64 string validation logic here if needed
  // For example, you can check if the value is a valid base64 string
  return /^data:[\w\/\+]+;base64,/.test(value);
});

export const States = types.model({
  StateName: types.optional(types.string, ""),
  StateID: types.optional(AnyJsonValue),
});

export const FilesType = types.model({
  DocValue: types.optional(types.string, ""),
  FileType: types.optional(types.string, ""),
  IsMandatory: types.optional(types.boolean, false),
});

export const Cities = types.model({
  CityName: types.optional(types.string, ""),
  CityID: types.optional(AnyJsonValue),
});

export const PinCode = types.model({
  Pincode: types.optional(types.string, ""),
});

export const AddressDetails = types.model({
  PanNumber: types.optional(types.string, ""),
  AadharNo: types.optional(types.string, ""),
  FileType: types.optional(AnyJsonValue),
  Address1: types.optional(types.string, ""),
  Address2: types.optional(types.string, ""),
  Address3: types.optional(types.string, ""),
  StateID: types.optional(AnyJsonValue),
  CityID: types.optional(AnyJsonValue),
  PostCode: types.optional(types.string, ""),
  EnquiryNo: types.optional(types.string, ""),
  state: types.optional(types.maybe(States)),
  city: types.optional(types.maybe(Cities)),
});

export const NomineeRelastion = types.model({
  name: types.optional(types.string, ""),
  CODE: types.optional(types.string, ""),
});
export const NomineeDetails = types.model({
  Title: types.optional(types.string, "mr"),
  NomineeName: types.optional(types.string, ""),
  NomineeRelationship: types.optional(types.string, ""),
  nomineeRelastion: types.optional(types.maybe(NomineeRelastion)),
  NomineeAge: types.optional(types.string, ""),
  EnquiryNo: types.optional(types.string, ""),
});

export const PriviousInsurer = types.model({
  FullName: types.optional(types.string, ""),
  SupplierId: types.optional(types.number, 0),
});

export const TP_InsurerList = types.model({
  FullName: types.optional(types.string, ""),
  SupplierId: types.optional(types.number, 0),
});

export const FinancerDetails = types.model({
  name: types.optional(types.string, ""),
  CODE: types.optional(types.string, ""),
});
const TpDate = Moment(new Date()).format("YYYY-MM-DD");
export const VehicleDetails = types.model({
  PreviousInsurer: types.optional(types.maybe(PriviousInsurer)),
  PreviousInsurerID: types.optional(types.string, ""),
  PreviousPolicyNumber: types.optional(types.string, ""),
  RegistrationNumber: types.optional(types.string, ""),
  ChasisNumber: types.optional(types.string, ""),
  EngineNumber: types.optional(types.string, ""),
  IsUnderLoan: types.optional(types.boolean, false),
  VehicleOwnedBy: types.optional(types.string, "0"),
  EnquiryNo: types.optional(types.string, ""),
  InstitutionName: types.optional(types.string, ""),
  selectedFinancer: types.optional(types.maybe(FinancerDetails)),
  InstitutionCode: types.optional(types.string, "0"),
  TPEndDate: types.optional(types.string, TpDate), //"1900/01/01"
  TPStartDate: types.optional(types.string, TpDate), //"1900/01/01"
  TP_PolicyNo: types.optional(types.string, ""),
  TP_InsurerList: types.optional(types.maybe(TP_InsurerList)),
  TP_Insurer: types.optional(types.string, ""),
  zeroDepth: types.optional(types.string, "yes"),
  NoOfClaim: types.optional(types.string, "0"),
  OwnershipTransfer: types.optional(types.string, "no"),
  isNCBTransfer: types.optional(types.string, "no"),
  PreRegistrationNumber: types.optional(types.string, ""),
  otherFinancer: types.optional(types.string, ""),
});
export const KYCStatusDetails = types.model({
  KycStatus: types.optional(types.string, ""),
  kycURL: types.optional(types.string, ""),
  CompanyID: types.optional(types.string, ""),
  EnquiryNo: types.optional(types.string, ""),
});

// Define the Terms model
const Term = types.model({
  TermsMessage: types.string,
  Seqno: types.number,
});

// Define the Messages model
const Message = types.model({
  KycMessage: types.string,
});

export const TnC = types.model({
  Messages: types.array(Message),
  Terms: types.array(Term),
});

export const Proposal = types
  .model({
    ownerDetails: types.optional(OwnerDetails, {}),
    addressDetails: types.optional(AddressDetails, {}),
    nomineeDetails: types.optional(NomineeDetails, {}),
    vehicleDetails: types.optional(VehicleDetails, {}),
    occupationlistes: types.optional(types.array(OccupationList), []),
    nomineeRelastiones: types.optional(types.array(NomineeRelastion), []),
    states: types.optional(types.array(States), []),
    uploadFilesType: types.optional(types.array(FilesType), []),
    cities: types.optional(types.array(Cities), []),
    priviousInsurer: types.optional(types.array(PriviousInsurer), []),
    financerDetails: types.optional(types.array(FinancerDetails), []),
    IsListView: types.optional(types.boolean, false),
    pinCode: types.optional(types.array(PinCode), []),
    tnc: types.optional(TnC, {}),
  })

  .actions((self) => ({
    setOwnerDetails(values) {
      self.ownerDetails = values;
    },
    setAddressDetails(addressvalues) {
      self.addressDetails = addressvalues;
    },
    setNomineeDetails(nomineevalues) {
      self.nomineeDetails = nomineevalues;
    },
    setVehicleDetails(vehiclevalues) {
      self.vehicleDetails = vehiclevalues;
    },
    setUploadFileDetails(fileInfo) {
      self.uploadFileDetails = fileInfo;
    },
    setTnCDetails(tnc) {
      self.tnc = tnc;
      console.log("Self", tnc);
    },
    setIsListView(value) {
      self.IsListView = value;
    },
    savePlanDetails: flow(function* savePlanDetails(EnquiryNo, planid) {
      try {
        const data = yield PostSavePlanDetails(EnquiryNo, planid);
        return data;
      } catch (error) {
        return error;
      }
    }),
    saveProposalDetails: flow(function* saveProposalDetails(payload) {
      try {
        const data = yield PostProposalDetails(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    saveNomineeDetails: flow(function* saveNomineeDetails(payload) {
      try {
        const data = yield PostNomineeDetails(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    saveVehicleDetails: flow(function* saveVehicleDetails(payload) {
      try {
        const data = yield PostVehicleDetails(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchOccupation: flow(function* fetchOccupation(payload) {
      try {
        const data = yield GetOccupation(payload);
        self.occupationlistes = data;
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchNomineeRelation: flow(function* fetchNomineeRelation(payload) {
      try {
        const data = yield GetNominee(payload);
        self.nomineeRelastiones = data;
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchStates: flow(function* fetchStates(payload) {
      try {
        const data = yield GetStates(payload);
        self.states = data;
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchCity: flow(function* fetchCity(Companyid, stateID) {
      try {
        const data = yield GetCity(Companyid, stateID);
        self.cities = data;
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchPinCode: flow(function* fetchPinCode(CompanyId, stateID, CityID) {
      try {
        const data = yield GetPinCode(CompanyId, stateID, CityID);
        console.log("zip", data);
        // let array = []
        let pinList = data.map((d) => {
          return { Pincode: String(d.Pincode) };
        });
        console.log("call >>>>> ", pinList);
        self.pinCode = pinList;
        return pinList;
      } catch (error) {
        return error;
      }
    }),
    fetchPreviousInsurer: flow(function* fetchPreviousInsurer(
      Companyid,
      stateID
    ) {
      try {
        const data = yield GetPreviousInsurer(Companyid, stateID);
        self.priviousInsurer = data;
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchFinancerDetails: flow(function* fetchFinancerDetails(
      Companyid,
      stateID
    ) {
      try {
        const data = yield GetFinancerDetails(Companyid, stateID);
        self.financerDetails = data;
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchGarages: flow(function* fetchGarages(Companyid, searchby, searchtext) {
      try {
        const data = yield GetGarages(Companyid, searchby, searchtext);
        return data;
      } catch (error) {
        return error;
      }
    }),
    sendEmail: flow(function* sendEmail(payload) {
      try {
        const data = yield PostEmail(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchBankInfo: flow(function* fetchBankInfo(Companyid) {
      try {
        const data = yield GetBankInfo(Companyid);
        return data;
      } catch (error) {
        return error;
      }
    }),
    saveCheckInfo: flow(function* saveCheckInfo(Companyid) {
      try {
        const data = yield PostCheckInfo(Companyid);
        return data;
      } catch (error) {
        return error;
      }
    }),
    saveProposalService: flow(function* saveProposalService(payload) {
      try {
        const data = yield PostProposalService(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchRehitePremium: flow(function* fetchRehitePremium(payload) {
      try {
        const data = yield GetRehitePremium(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchKYCStatus: flow(function* fetchKYCStatus(Companyid, EnquiryNo) {
      try {
        const data = yield GetKYCStatus(Companyid, EnquiryNo);
        self.KYCStatusDetails = data;
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchUploadFilesType: flow(function* fetchUploadFilesType(
      Companyid,
      EnquiryNo
    ) {
      try {
        const data = yield GetUploadFileTypes(Companyid, EnquiryNo);
        self.uploadFilesType = data;

        return data;
      } catch (error) {
        return error;
      }
    }),
    saveUploadedFile: flow(function* saveUploadedFile(payload) {
      try {
        const data = yield PostUploadFiles(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    getPlanTnCData: flow(function* getPlanTnCData(EnquiryNo, planid) {
      try {
        const data = yield getTnCData(EnquiryNo, planid);
        self.tnc = data;
        return data;
      } catch (error) {
        return error;
      }
    }),
  }));
