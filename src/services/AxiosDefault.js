import axios from "axios";
import { Cookies } from "react-cookie";

const AxiosDefaultSetting = async ({ method, data, url }) => {
  const cookie = new Cookies();
  const APIENDPOINT = process.env.REACT_APP_API_END_POINT;

  const AxiosDefault = axios.create({
    baseURL: APIENDPOINT,
    timeout: 5000,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  AxiosDefault.interceptors.request.use(
    async function (config) {
      try {
        const result = cookie.get("access_token");
        if (result && result.length > 0) {
          config.headers.authorization = "Bearer " + result;
        }
      } catch (error) {
        console.log(error);
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  AxiosDefault.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response.status === 401) {
        try {
          const expiryTime = new Date(new Date().getTime() - 100000);
          cookie.remove("access_token");
          cookie.set("access_token", "", {
            expires: expiryTime,
          });
          cookie.set(
            "user_data",
            {},
            {
              expires: expiryTime,
            }
          );
          window.location.replace('/');
          window.location = "/";
        } catch (e) {
          return e;
        }
      }
      return Promise.reject(error);
    }
  );
  return await AxiosDefault({
    method,
    data,
    url,
  });
};

export default AxiosDefaultSetting;
