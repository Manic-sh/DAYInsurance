import axios from "axios";
import AxiosDefault from "../services/AxiosDefault";
const APILOGINENDPOINT = process.env.REACT_APP_LOGIN_API_END_POINT;
export const PostLoginDetails = async (data) => {
  const resData = Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");
  const options = {
    url: `${APILOGINENDPOINT}/token`,
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: resData,
  };
  const responsedata = await axios(options);

  return responsedata;
};

export const GetUserInfo = async (payload) => {
  try {
    const responsedata = await AxiosDefault({
      method: "POST",
      data: payload,
      url: `${APILOGINENDPOINT}/api/test/method1`,
    });
    return responsedata.data;
  } catch (err) {
    console.log('axios error', err.message);
  }
};
