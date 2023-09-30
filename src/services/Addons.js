import { size } from "lodash";

// const AddonsFullName1 = [
//   {
//     title: "Nil Dep Cover",
//     sort: "ZD",
//     data_key: "ZeroDepPremium",
//   },
//   {
//     title: "Key Replacement",
//     sort: "KLR",
//     data_key: "KeyReplacement",
//   },
//   {
//     title: "Road Side Assistance",
//     sort: "RSA",
//     data_key: "RoadsideAssistanceCoverPremium",
//   },
//   {
//     title: "Invoice Cover",
//     sort: "INPC",
//     data_key: "InvoicePriceCoverPremium", //here
//   },
//   {
//     title: "Ncb Protection",
//     sort: "NCB",
//     data_key: "NCBProtection",
//   },
//   {
//     title: "Engine Protector",
//     sort: "EP",
//     data_key: "EPPremium",
//   },
//   {
//     title: "Loss Of Belongings",
//     sort: "LPB",
//     data_key: "LPBPremium",
//   },
//   {
//     title: "Consumables",
//     sort: "COC",
//     data_key: "COCPremium",
//   },
//   {
//     title: "Theft Cover",
//     sort: "THE",
//     data_key: "THEPremium",
//   },
//   {
//     title: "Passenger Assistance",
//     sort: "PA",
//     data_key: "PAPremium",
//   },
//   {
//     title: "Daily Allowance",
//     sort: "DAC",
//     data_key: "DailyAllowancePremium", //wrong key
//   },
//   {
//     title: "Windshield Cover",
//     sort: "WS",
//     data_key: "WindShieldPremium",
//   },
//   {
//     title: "Tyre Cover",
//     sort: "TC",
//     data_key: "TCPremium",
//   },
//   {
//     title: "Rim Damage",
//     sort: "RDC",
//     data_key: "RimPremium",
//   },
//   {
//     title: "Medical Expense",
//     sort: "MED",
//     data_key: "MedExp", //not avaliable
//   },
//   {
//     title: "Towing Cover",
//     sort: "TOW",
//     data_key: "TowCover", //not avaliable
//   },
//   {
//     title: "Courtesy Car",
//     sort: "COU",
//     data_key: "CourtCar", //here
//   },
//   {
//     title: "Hotel Expense",
//     sort: "HTL",
//     data_key: "HotelExp",
//   },
// ];

const AddonsFullName = [
  {
    title: "LOSS OF KEY",
    sort: "KLR",
    data_key: "KeyReplacement",
    tooltip:
      "Car keys have evolved over the years. They are not just a metal piece with grooves to unlock or start the car engine. Sophisticated and technologically advanced car keys are the new norm, especially the electronic keys. They are known as Frequency Operated Buttons (FOBs). If they are lost or misplaced, replacing them is quite expensive. Insurance companies are evolving along with modern times and are covering such car keys through the option of add-on covers. The coverage for your car keys is known as Key Replacement Cover in car insurance.",
  },
  {
    title: "ROAD SIDE ASSISTANCE",
    sort: "RSA",
    data_key: "RoadsideAssistanceCoverPremium",
    tooltip:
      "When your car breaks down in the middle of the road. There’s no mechanic or garage nearby where you can approach for help. In such a scenario, a roadside assistance cover is your most trusted. Many insurance companies nowadays offer 24 X 7 emergency assistance services like refuelling, tyre change, towing, arranging for a mechanic etc. in case of sudden breakdowns. This particular add-on cover can be very helpful during emergencies when your car suddenly breaks down in the middle of a road and you require professional assistance.",
  },
  {
    title: "INVOICE COVER",
    sort: "INPC",
    data_key: "InvoicePriceCoverPremium",//here
    tooltip:
      "This add-on is particularly helpful to recover financial losses when your car is damaged beyond repair. With this additional rider, you can get the original invoice value of your car in case of a total loss. Usually you don't get the road tax and registration fees which you paid while purchasing the insurance policy. You only get the insured declared value of your car. However, the return to invoice cover gives you the full invoice value. It allows you to bridge the gap between the declared insurance value and the actual value of the car.",
  },
  {
    title: "NCB PROTECTION",
    sort: "NCB",
    data_key: "NCBProtection",
    tooltip:
      " This add-on cover protects the NCB discount which the policyholder is eligible upon renewal for the next policy year, otherwise which would be lost, in the event of claim/s made in the policy year",
  },
  {
    title: "ZERO DEP",
    sort: "ZD",
    data_key: "ZeroDepPremium",
    tooltip:
      "A car’s value begins to depreciate once it exits the showroom. Over the years, it comes down significantly. In case of any insurance claim, the insurer would compensate you after factoring in the depreciated amount. However, things are different with a zero depreciation cover. It helps to protect your car against all kinds of physical damages without taking into consideration the depreciation factor.",
  },
  {
    title: "ENGINE PROTECTOR",
    sort: "EP",
    data_key: "EPPremium",
    tooltip:
      "The engine is undoubtedly the heart of any car. Surprisingly, ordinary comprehensive car insurance policies do not offer any coverage for damages to the engine. Thus, adding an engine protection cover becomes crucial to safeguard this vital part of your car from the damages. This insurance cover is beneficial for expensive cars, whose engine repair costs can be very high. It takes care of costs against damages to engine parts, differential parts and gear box parts. A standard car insurance policy doesn’t generally cover these.",
  },
  {
    title: "LOSS OF PERSONAL BELONGING",
    sort: "LPB",
    data_key: "LPBPremium",
    tooltip:
      "Many people travel in a car with expensive laptops, smartphones, tablets, jewellery etc. An accident or calamity can damage these expensive gadgets and items beyond repair. Generally, such damages are excluded by standard insurance policies. However, by opting for personal belongings cover by paying a nominal extra premium, you can protect your costly belongings from damages or theft.",
  },
  {
    title: "CONSUMABLES",
    sort: "COC",
    data_key: "COCPremium",
    tooltip:
      "Consumables are those commodities which have a specific use for a limited period. Once these items are used, they may not be used again in the future. These items are required to be replaced regularly due to wear and tear. Some examples of such items are engine oil, ball bearings, nuts, bolts, washers, brake oil, screws, grease, AC refrigerant etc.",
  },
  {
    title: "THEFT",
    sort: "THE",
    data_key: "THEPremium",
    tooltip: "Theft Cover",
  },
  {
    title: "PASSGENER ASSISTANCE",
    sort: "PA",
    data_key: "PAPremium",
    tooltip:
      "Sometimes, accidents can lead to disability, which prevents a person from carrying out daily tasks. During such a scenario, cost of treatment and daily expenses can be tough to cover out of pocket. A personal accident cover enables you to protect yourself financially against such situations.",
  },
  {
    title: "DAILY ALLOWANCE",
    sort: "DAC",
    data_key: "DailyAllowancePremium",  //wrong key
    tooltip: "",
  },
  {
    title: "WIND SHIELD",
    sort: "WS",
    data_key: "WindShieldPremium",
    tooltip: "",
  },
  {
    title: "TYRE COVER",
    sort: "TC",
    data_key: "TCPremium",
    tooltip: "",
  },
  {
    title: "RIM COVER",
    sort: "RDC",
    data_key: "RimPremium",
    tooltip: "",
  },
  {
    title: "MEDICAL EXPENSES",
    sort: "MED",
    data_key: "MedExp",//not avaliable
    tooltip: "",
  },
  {
    title: "TOWING COVER",
    sort: "TOW",
    data_key: "TowCover", //not avaliable
    tooltip: "",
  },
  {
    title: "COURTESY CAR",
    sort: "COU",
    data_key: "CourtCar",
    tooltip: "",
  },
  {
    title: "HOTEL EXPENSE",
    sort: "HTL",
    data_key: "HotelExp",
    tooltip: "",
  },

 
];




const getAddOnTooltip = (sort) => {
  const r = AddonsFullName.find((item) => {
    return item.sort === sort;
  });
  return size(r) > 0 ? r.tooltip : "";
};

export default AddonsFullName;
export { getAddOnTooltip };
