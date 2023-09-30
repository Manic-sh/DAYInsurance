import { size } from "lodash";
// {getAdditionalTitle("SupplierIdv")}
const AdditionalData = [ {
    title: "Basic OD",
    data_key: "BasicPremium",
    tooltip:
      " OD Insurance is a motor insurance policy that is intended to safeguard your car against unforeseen own damages. This policy offers car insurance coverage for own damages sustained by your car due to road accidents, fire, natural calamities, or any other mishap.",
  },
  {
    title: "IDV",
    data_key: "SupplierIdv",
    tooltip: "Insured Declared Value or sum insured of the vehicle ",
  },
  {
    title: "Third Party",
    data_key: "TPPDLiabilityPremium",
    tooltip:
      "Third-party insurance is the basic insurance cover that takes care only of third-party damages. The recipient of the claim is not the policyholder but another person or vehicle affected by the first party’s insured car.",
  },
  {
    title: "NCB",
    data_key: "NCBDiscount",
    tooltip:
      "No Claim Bonus or NCB is a reward given by an insurance company to an insured for not raising any claim requests during a policy year. The NCB is a discount ranging between 20%-50% and is given to the insured while renewing a policy. The NCB discount is offered on the premium amount during renewal.",
  },
  {
    title: "Claims Allowed",
    data_key: "ClaimsAllowed",
    tooltip: "No Of Claims Allowed",
  },
  {
    title: "Pa Cover",
    data_key: "CompulsaryPACoverForOwnerDriverPremium",
    tooltip: "Personal Accident Cover upto 15 lakh",
  },
  {
    title: "Paid Driver",
    data_key: "LegalLiabilityToPaidDriverPremium",
    tooltip: "Paid Driver Cover",
  },
  {
    title: "Unname Passenger Cover",
    data_key: "PAForUnnamedPassengerPremium",
    tooltip: "Personal Accident  Cover For Unnamed Passengers",
  }];


  const getAdditionalTooltip = (data_key) => {
    const r = AdditionalData.find((item) => {
      return item.data_key === data_key;
    });
    return size(r) > 0 ? r.tooltip : "";
  };
  
  export default AdditionalData;
  export { getAdditionalTooltip };

  