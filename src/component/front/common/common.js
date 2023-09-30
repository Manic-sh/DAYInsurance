import { sortBy, orderBy, clone } from "lodash";
import { getSnapshot } from "mobx-state-tree";
import { EventEmitter } from "../../../services/events";
/*eslint-disable */
export const fetchQuotesAPI = (store, callBack, type) => {
  EventEmitter.dispatch("LoadingStatus",true);
  const EnqNo = store.insurance.getEnqNo();
  var i = 0;
  let myInterval = setInterval(async() => {
    if (i < 15) {
      store.quotes.fetchQuote(EnqNo).then((data) => {
        // console.log("apidata", data);
        // console.log("apicall", i);
        callBack(data, type);
      });
    } else {
      EventEmitter.dispatch("LoadingStatus",false);
      await store.insurance.fetchDeclineCompanies(EnqNo);
      EventEmitter.dispatch("DeclineCompanies");
      clearInterval(myInterval);
    }
    i++;
  }, 3000);

  return;
};

export const getUniqueResult = (item_list) => {
  // item_list = sortBy(item_list, ["PackagePremium", "SupplierName"]);
  let items = [];
  item_list.map((v) => {
    var findItem = items.find((x) => x.SupplierId === v.SupplierId);
    if (!findItem) items.push(v);
    return v;
  });
  // items = items.filter((w) => w.IsDefaultShow);
  return items;
};
//staticFilter
export const getFilterData = (items, filter_case, type, store) => {
  console.log("filtertype1", type);
  console.log("filterdataaaaaa>>>>", items);
  let staticResponse = getStaticFilter(items, store);
  items = staticResponse.items;
  console.log("afterStatic>>>>", items);
  switch (type) {
    case "filterByIDV":
      // console.log("beforefilterByIDV", items);
      items = getFilterByIDV(items);
      // console.log("filterByIDV", items);
      break;
    // case "filterByDiscount":
    //   items = getFilterByDiscount(items);
    //   // console.log("filterByDiscount", items);
    //   break;
    // case "filterByAddBiFuel":
    //   console.log("staticResponsebifuel=====",staticResponse);
    //   items = getShowDefaultData(items, filter_case, "staticFilter");
    //   // items = getFilterByAddBiFuel(items);
    //   // console.log("filterByAddBiFuel", items);
    //   break;
    // case "filterByLiability":
    //   items = getFilterByLiability(items);
    //   // console.log("filterByLiability", items);
      // break;
    default:
      console.log("staticResponsebiDefault--=====",staticResponse);
      type = staticResponse.flag ? "staticFilter" : "default";
      console.log(type)
      console.log(filter_case)
      // type = staticResponse.flag ? "staticFilter" : type;
      items = getShowDefaultData(items, filter_case, type);
      // console.log("default", items);
      break;
  }
  console.log("final-return>>>>", items);
  return items;
};

export const getStaticFilter = (items, store) => {
  let flagStaticFilter = false;
  const companies = getSnapshot(store.quotes.getCompanySelected());
  console.log("companies", companies);
  console.log("items", items);
  if (companies.length > 0) {
    items = sortBy(items, ["PackagePremium"]);
    // items = unionBy(items, "SupplierName");
    items = items.filter((el) => {
      return companies.indexOf(el.SupplierName) >= 0;
    });
    flagStaticFilter = true;
  }

  const addOns = getSnapshot(store.quotes.getAddOnSelected());
  console.log("addOns11", addOns);
  let newItems = items;
  if (addOns.length > 0) {
    let item_data_filter = removeMaxFilter(newItems, addOns);
    console.log("item_data_filter", item_data_filter);
    newItems = [];
    item_data_filter.map((el) => {
      let newEl = clone(el);
      // console.log("el", el.Addons);
      const val = el.Addons.split(",").filter((e) => {
        // console.log("addOns.indexOf(e)", addOns.indexOf(e), "eeeee", e);
        return addOns.indexOf(e) >= 0;
      });
      newEl.addOnCounts = val.length;
      newEl.addOnLengthDefault = el.Addons.split(",").length;
      if (val.length > 0) newItems.push(newEl);
    });
    console.log("newItems", newItems);
    newItems = orderBy(
      newItems,
      ["addOnCounts", "addOnLengthDefault", "PackagePremium"],
      ["desc", "asc", "asc"]
    );
    flagStaticFilter = true;
  }
  console.log("static-addon-filger", "flagStaticFilter", flagStaticFilter);
  return { items: newItems, flag: flagStaticFilter };
};

const removeMaxFilter = (item_list, addOns) => {
  let filter_count = addOns.length;
  let items = item_list.filter((el) => {
    if (el.IsPlanWise === true) {
      return true;
    }
    return el.Addons.split(",").length <= filter_count;
  });
  return items;
};

export const getShowDefaultData = (items, filter_case, type) => {
  switch (filter_case) {
    case "PREMIUM_LH":
      console.log("triiggg");
      items = sortBy(items, ["FinalPremium"]);
      break;
    case "PREMIUM_HL":
      items = sortBy(items, ["FinalPremium"]).reverse();
      break;
    case "IDVLH":
      items = sortBy(items, ["SupplierIdv"]);
      break;
    case "IDVHL":
      items = sortBy(items, ["SupplierIdv"]).reverse();
      break;
    case "ODDISCOUNT_HL":
      items = sortBy(items, ["SupplierIdv"]).reverse();
      break;
    case "ODDISCOUNT_LH":
      items = sortBy(items, ["SupplierIdv"]);
      break;
    case "COMPANY_ASC":
      items = sortBy(items, ["SupplierName"]);
      break;
    case "COMPANY_DESC":
      items = sortBy(items, ["SupplierName"]).reverse();
      break;
    case "staticFilter":
      break;
    default:
      console.log("hellooooodefault", type);
      if (type === "default") {
        items = items.filter((w) => w.IsDefaultShow);
        items = getUniqueResult(items);
        items = sortBy(items, ["PackagePremium", "SupplierName"]);
        console.log("defaultfilter33333333333333333");
      }
      break;
  }
  console.log("hellooooo", filter_case);
  console.log("helloooootype", type);
  // items = sortBy(items, ["PackagePremium", "SupplierName"]);
  items = getUniqueResult(items);
  // items = sortBy(items, ["PackagePremium", "SupplierName"]);
  return items;
};

export const getFilterByIDV = (items) => {
  //maxIDV
  let type = sessionStorage.getItem("selectedIdvType");
  console.log("idvtypevalue", type);
  switch (type) {
    case "recommendedIDV":
      // items = sortBy(items, ["SupplierIdv"]).reverse();
      items = orderBy(
        items,
        ["SupplierIdv", "PackagePremium", "SupplierName"],
        ["desc", "asc", "asc"]
      );
      // console.log('r1',items);
      break;
    case "MaximumIDV":
      // items = sortBy(items, ["MaxIDV"]).reverse();
      // items = orderBy(items, ["MaxIDV", "PackagePremium", "SupplierName"],['desc','asc','asc']);
      items = orderBy(
        items,
        ["SupplierIdv", "PackagePremium", "SupplierName"],
        ["desc", "asc", "asc"]
      );
      // items.map((v)=>console.log(v.SupplierId,v.SupplierName,v.SupplierIdv))
      // console.log('r2',items);
      break;
    case "LowestIDV":
      // items = sortBy(items, ["MinIDV"]);
      items = orderBy(
        items,
        ["SupplierIdv", "PackagePremium", "SupplierName"],
        ["asc", "asc", "asc"]
      );
      // console.log('r3',items);
      break;
    default:
      // items = sortBy(items, ["SupplierIdv"]).reverse();
      items = orderBy(
        items,
        ["SupplierIdv", "PackagePremium", "SupplierName"],
        ["desc", "asc", "asc"]
      );
      // console.log('r4',items);
      break;
  }

  items = getUniqueResult(items);
  items = sortBy(items, ["PackagePremium", "SupplierName"]);
  // console.log('unique',items);
  return items;
};

// export const getFilterByDiscount = (items) => {
//   console.log("discount");
//   // items = sortBy(items, ["PackagePremium", "SupplierName"]);
//   items = orderBy(
//     items,
//     ["InsurerDiscount", "PackagePremium", "SupplierName"],
//     ["desc", "asc", "asc"]
//   );
//   items = getUniqueResult(items);
//   return items;
// };

// export const getFilterByAddBiFuel = (items) => {
//   items = orderBy(
//     items,
//     ["SupplierIdv", "PackagePremium", "SupplierName"],
//     ["desc", "asc", "asc"]
//   );

//   console.log("getFilterByAddBiFuel>>>>>",items);
//   items = getUniqueResult(items);
//   return items;
// };

// export const getFilterByLiability = (items) => {
//   items = orderBy(items, ["PackagePremium", "SupplierName"], ["asc", "asc"]);
//   items = getUniqueResult(items);
//   return items;
// };
