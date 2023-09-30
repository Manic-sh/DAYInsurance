import axios from "axios";
const APIENDPOINT = process.env.REACT_APP_API_END_POINT;

export const GetQuote = async (EnqNo) => {
  const data = await axios.get(
    `${APIENDPOINT}/api/quote/fetchquotes?enquiryno=${EnqNo}`
  );    
  return data.data;
};

export const PostAdditionalDiscounts = async (data) => {
  const res = await axios.post(
    `${APIENDPOINT}/api/Quote/AdditionalDiscounts`, data
  );    
  return res.data;
};

export const IDVFilter = async (data) => {
  const res = await axios.post(
    `${APIENDPOINT}/api/quote/UpdateIDVAndNCB`, data
  );    
  return res.data;
};

export const CustomIDVFilter = async (data) => {
  const res = await axios.post(
    `${APIENDPOINT}/api/quote/UpdateCustomIDVCompanyWise`, data
  );    
  return res.data;
};


export const DiscountFilter = async (data) => {
  const res = await axios.post(
    `${APIENDPOINT}/api/Quote/AdditionalDiscounts`, data
  );    
  return res.data;
};

export const AddBiFuelFilter = async (data) => {
  const res = await axios.post(
    `${APIENDPOINT}/api/quote/AddBiFuel`, data
  );    
  return res.data;
};

export const AddAccessoriesFilter = async (data) => {
  const res = await axios.post(
    `${APIENDPOINT}/api/quote/AddAccessories`, data
  );    
  return res.data;
};
export const AddTPCoversFilter = async (data) => {
  const res = await axios.post(
    `${APIENDPOINT}/api/quote/AddTPCovers`, data
  );    
  return res.data;
};
export const GetIndividualIDV = async (data) => {
  const {data: { CustomIDVRange: responseBody }} = await axios.get(
    `${APIENDPOINT}/api/proposal/GetIndividualIDV?EnquiryNo=${data.EnquiryNo}&companyid=${data.companyid}`
  );    
  return responseBody;
};
export const GetDirectQuoteData = async (data) => {
  const {data: responseBody } = await axios.get(
    `${APIENDPOINT}/api/proposal/DisplayAllInfo?Enquiryno=${data.EnquiryNo}`
  );   
  return responseBody;
};