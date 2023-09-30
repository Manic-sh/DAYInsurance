import AxiosDefault from "../../../services/AxiosDefault";
const API_PATH = process.env.REACT_APP_LOGIN_API_END_POINT;

export const apiGetReportsData = async (payload) => {
  try {
    return await AxiosDefault({
      method: "POST",
      data: payload,
      url: `${API_PATH}/api/test/GetPolicyReports`,
    });
  } catch (error) {
    console.log("Error! " + error.message);
  }
};
