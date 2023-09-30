import axios from "axios";
const APIENDPOINT = process.env.REACT_APP_API_END_POINT;

export const GetManufacturer = async (manufacturerType) => {
  const {
    data: { Manufacturer: responseBody }
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetManufacturer?Type=${manufacturerType}`
  );
  return responseBody;
};

export const GetVehicleModel = async (ManufactID,SubType) => {
  console.log('responseBodySubType',ManufactID,SubType);
  const {
    data: { Vehicles: responseBody }
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetVehicles?ManufactID=${ManufactID}&VehicleSubtype=${SubType}`
  );
  console.log('responseBody',responseBody);
  return responseBody;
};

export const GetVehicleVariantsModel = async (VehicleID,SubType) => {
  const {
    data: { Fuels: responseBody }
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetFuels?VehicleID=${VehicleID}&type=${SubType}`
  );
  const finalResponseData = [];
  await Promise.all(
    await responseBody.map(async (item) => {
      const {
        data: { Variants: responseBodyVariants }
      } = await axios.get(
        `${APIENDPOINT}/api/proposal/GetVariants?VehicleID=${VehicleID}&FuelID=${item.FUELID}&type=${SubType}`
      );
      const newObject = {
        FUELID: item.FUELID,
        FUELNAME: item.FUELNAME,
        variants: responseBodyVariants
      };
      finalResponseData.push(newObject);
      console.log('finalResponseData',finalResponseData);
    })
  );
  return finalResponseData;
};

export const GetRTO = async () => {
  const {
    data: { RTOS: responseBody }
  } = await axios.get(`${APIENDPOINT}/api/proposal/GetRTO`);
  return responseBody;
};

export const PostDetails = async (data) => {
  const responsedata = await axios.post(`${APIENDPOINT}/api/prequote/Savedetails`, data)
  return responsedata
}

export const GetQuote = async (EnqNo) => {
  const data = await axios.get(
    `${APIENDPOINT}/api/quote/fetchquotes?enquiryno=${EnqNo}`
  );  
  return data.data;
};
