import AxiosDefault from "../../../services/AxiosDefault";
const API_PATH = process.env.REACT_APP_LOGIN_API_END_POINT;

export const apiGetProductList = async (payload) => {
  try {
    return await AxiosDefault({
      method: "POST",
      data: payload,
      url: `${API_PATH}/api/test/GetProductsList`,
    });
  } catch (error) {
    console.log("Error! " + error.message);
  }
};

export const apiGetInsurerList = async (payload) => {
  try {
    return await AxiosDefault({
      method: "POST",
      data: payload,
      url: `${API_PATH}/api/test/GetInsurerList`,
    });
  } catch (error) {
    console.log("Error! " + error.message);
  }
};

export const addRecordPolicy = async (payload) => {
  try {
    const res = await AxiosDefault({
      method: "POST",
      data: payload,
      url: `${API_PATH}/api/test/AddRecordPolicy`,
    });
    return res.data;
  } catch (error) {
    console.log("Error! " + error.message);
  }
};
