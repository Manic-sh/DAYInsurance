import { flow, types } from "mobx-state-tree";
// import { unionBy, sortBy } from "lodash";
import {
  GetQuote,
  PostAdditionalDiscounts,
  IDVFilter,
  CustomIDVFilter,
  DiscountFilter,
  AddBiFuelFilter,
  AddAccessoriesFilter,
  AddTPCoversFilter,
  GetIndividualIDV,
  GetDirectQuoteData,
} from "../api/quotes";
import { getSnapshot } from "mobx-state-tree";

export const QuoteItems = types.model("QuoteItems", {
  Addons: types.optional(types.string, "-"),
  AntiTheftDiscount: types.optional(types.number, 0),
  AutomobileMembershipDiscount: types.optional(types.number, 0),
  BasicOwnDamagePremium: types.optional(types.maybeNull(types.number), null),
  BasicPremium: types.optional(types.number, 0),
  BiFuelKitLiabilityPremium: types.optional(types.number, 0),
  BiFuelKitPremium: types.optional(types.number, 0),
  COCPremium: types.optional(types.number, 0),
  ClaimsAllowed: types.optional(types.string, "UNLIMITED"),
  ClaimsAllowedZD: types.optional(types.string, "UNLIMITED"),
  CompulsaryPACoverForOwnerDriverPremium: types.optional(types.number, 0),
  CourtCar: types.optional(types.number, 0),
  CreatedOn: types.optional(types.string, "-"),
  CustQutBrkDetailId: types.optional(types.number, 0),
  CustTrackId: types.optional(types.number, 0),
  DailyAllowancePremium: types.optional(types.number, 0),
  DiscountRate: types.optional(types.number, 0),
  EPPremium: types.optional(types.number, 0),
  ElectricalAccessoriesPremium: types.optional(types.number, 0),
  EmergencyTransport: types.optional(types.maybeNull(types.number), null),
  EnquiryNo: types.optional(types.string, "0"),
  FinalOwnDamagePremium: types.optional(types.number, 0),
  FinalPremium: types.optional(types.number, 0),
  FinalTotalDiscount: types.optional(types.number, 0),
  FinalTotalLiabilityPremium: types.optional(types.number, 0),
  HandicapDiscount: types.optional(types.maybeNull(types.string), null),
  HotelExp: types.optional(types.number, 0),
  InsurerDiscount: types.optional(types.number, 0),
  InvoicePriceCoverPremium: types.optional(types.number, 0),
  IsActive: types.optional(types.boolean, true),
  IsDefaultShow: types.optional(types.boolean, true),
  IsOnline: types.optional(types.boolean, true),
  IsRenewal: types.optional(types.boolean, false),
  KeyReplacement: types.optional(types.number, 0),
  LPBPremium: types.optional(types.number, 0),
  LegalLiabilityToPaidDriverPremium: types.optional(types.number, 0),
  LoadingPremium: types.optional(types.number, 0),
  LoyaltyPoints: types.optional(types.maybeNull(types.string), "0"),
  MaxIDV: types.optional(types.string, "0"),
  MedExp: types.optional(types.number, 0),
  MinIDV: types.optional(types.string, "0"),
  NCBDiscount: types.optional(types.number, 0),
  NCBProtection: types.optional(types.number, 0),
  NonElectricalAccessoriesPremium: types.optional(types.number, 0),
  ODDiscountRate: types.optional(types.maybeNull(types.number), null),
  ODTerm: types.optional(types.number, 0),
  PAForUnnamedPassengerPremium: types.optional(types.number, 0),
  PAPremium: types.optional(types.number, 0),
  PackagePremium: types.optional(types.number, 0),
  PaidDriverPremium: types.optional(types.number, 0),
  PlanId: types.optional(types.number, 0),
  PlanName: types.optional(types.string, "-"),
  ProductCode: types.optional(types.string, "0"),
  ProposalNumber: types.optional(types.string, "0"),
  QuoteReferenceNumber: types.optional(types.number, 0),
  RimPremium: types.optional(types.number, 0),
  RoadsideAssistanceCoverPremium: types.optional(types.number, 0),
  ServiceTax: types.optional(types.number, 0),
  SupplierId: types.optional(types.number, 0),
  SupplierIdv: types.optional(types.number, 0),
  SupplierName: types.optional(types.string, "-"),
  TCPremium: types.optional(types.number, 0),
  THEPremium: types.optional(types.number, 0),
  TPPDLiabilityPremium: types.optional(types.number, 0),
  TPTerm: types.optional(types.number, 0),
  TotalAddOnPremium: types.optional(types.number, 0),
  TotalLiability: types.optional(types.number, 0),
  TotalOwnDamagePremium: types.optional(types.number, 0),
  TotalPremium: types.optional(types.number, 0),
  TowCover: types.optional(types.number, 0),
  UserinfoId: types.optional(types.number, 0),
  VoluntaryDiscount: types.optional(types.number, 0),
  WindShieldPremium: types.optional(types.number, 0),
  IsPlanWise: types.optional(types.boolean, false),
  ZeroDepPremium: types.optional(types.number, 0),
});

const DirectQuoteModel = types.model({
  data: types.optional(types.string,''),
});


export const Quotes = types
  .model({
    items: types.optional(types.array(QuoteItems), []),
    compareProduct: types.optional(types.array(QuoteItems), []),
    sendEmailProduct: types.optional(types.array(QuoteItems), []),
    companySelected: types.optional(types.array(types.string), []),
    addOnSelected: types.optional(types.array(types.string), []),
    IsApplyFilter: types.optional(types.boolean, true),
    DirectQuoteData: types.optional(types.array(DirectQuoteModel), []),
  })
  .actions((self) => ({
    setQuotes(values) {
      // let items = unionBy(values, self.getQuotes(), "CustQutBrkDetailId");
      // const companies = getSnapshot(self.companySelected);
      // if (companies.length > 0) {
      //   items = sortBy(items, ["PackagePremium"]);
      //   items = unionBy(items, "SupplierName");
      //   items = items.filter((el) => {
      //     return companies.indexOf(el.SupplierName) >= 0;
      //   });
      // }
      // const addOns = getSnapshot(self.addOnSelected);
      // if (addOns.length > 0) {
      //   items = items.filter((el) => {
      //     const val = el.Addons.split(",").filter((e) => {
      //       return addOns.indexOf(e) >= 0;
      //     });
      //     if (val.length > 0) return el;
      //     return false;
      //   });
      // }
      self.items = values;
    },
    getQuotes() {
      return getSnapshot(self.items);
    },
    setCompareProduct(value) {
      self.compareProduct = value;
    },
    setSendEmailProduct(value) {
      self.sendEmailProduct = value;
    },
    setCompanySelected(value) {
      self.companySelected = value;
    },
    setAddOnSelected(value) {
      self.addOnSelected = value;
    },
    setIsApplyFilter(value) {
      self.IsApplyFilter = value;
    },
    getIsApplyFilter() {
      return self.IsApplyFilter;
    },
    setSelectedIdvType(value) {
      sessionStorage.setItem("selectedIdvType", value);
    },
    getSelectedIdvType() {
      return sessionStorage.getItem("selectedIdvType");
    },
    setCustomIdvValue(value) {
      sessionStorage.setItem("CustomIdvValue", value);
    },
    getCustomIdvValue() {
      return sessionStorage.getItem("CustomIdvValue");
    },
    getAddOnSelected() {
      return self.addOnSelected;
    },
    getCompanySelected() {
      return self.companySelected;
    },
    setDiscountFilterDetails(req) {
      sessionStorage.setItem("DiscountFilterDetails", JSON.stringify(req));
    },
    getDiscountFilterDetails() {
      return JSON.parse(sessionStorage.getItem("DiscountFilterDetails"));
    },
    setCngFilterDetails(req) {
      sessionStorage.setItem("CngFilterDetails", JSON.stringify(req));
    },
    getCngFilterDetails() {
      return JSON.parse(sessionStorage.getItem("CngFilterDetails"));
    },
    setLiabilityFilterDetails(req) {
      sessionStorage.setItem("LiabilityFilterDetails", JSON.stringify(req));
    },
    getLiabilityFilterDetails() {
      return JSON.parse(sessionStorage.getItem("LiabilityFilterDetails"));
    },
    fetchQuote: flow(function* fetchQuote(payload) {
      try {
        const data = yield GetQuote(payload);

        self.setQuotes(data);
        return data;
      } catch (error) {
        return error;
      }
    }),
    additionalDiscounts: flow(function* additionalDiscounts(payload) {
      try {
        const data = yield PostAdditionalDiscounts(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    postIDVFilter: flow(function* postIDVFilter(payload) {
      try {
        const data = yield IDVFilter(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    postCustomIDVFilter: flow(function* postCustomIDVFilter(payload) {
      try {
        const data = yield CustomIDVFilter(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    postDiscountFilter: flow(function* postDiscountFilter(payload) {
      try {
        const data = yield DiscountFilter(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    postAddBiFuelFilter: flow(function* postAddBiFuelFilter(payload) {
      try {
        const data = yield AddBiFuelFilter(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    postAddAccessoriesFilter: flow(function* postAddAccessoriesFilter(payload) {
      try {
        const data = yield AddAccessoriesFilter(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    postLiabilityFilter: flow(function* postLiabilityFilter(payload) {
      try {
        const data = yield AddTPCoversFilter(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchIndividualIDV: flow(function* fetchIndividualIDV(payload) {
      try {
        const data = yield GetIndividualIDV(payload);
        return data;
      } catch (error) {
        return error;
      }
    }),
    fetchDirectQuotes: flow(function* fetchDirectQuotes(payload) {
      try {
        const data = yield GetDirectQuoteData(payload);

      //  console.log(typeof data );
    //    self.DirectQuoteData = [data];
        return data;
      } catch (error) {
        return error;
      }
    }),
    getDirectQuoteData() {
      // return self.DirectQuoteData;
    },
  }));
