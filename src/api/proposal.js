import axios from "axios";
const APIENDPOINT = process.env.REACT_APP_API_END_POINT;

export const PostSavePlanDetails = async (EnquiryNo, planid) => {
  const responsedata = await axios.post(
    `${APIENDPOINT}/api/proposal/SavePlan?EnquiryNo=${EnquiryNo}&planid=${planid}`,
    [{ EnquiryNo: EnquiryNo, planid: planid }]
  );
  return responsedata;
};

export const PostProposalDetails = async (data) => {
  const responsedata = await axios.post(
    `${APIENDPOINT}/api/proposal/InsertVisitorDetails`,
    data
  );
  return responsedata;
};

export const PostNomineeDetails = async (data) => {
  const responsedata = await axios.post(
    `${APIENDPOINT}/api/proposal/InsertNomineeDetails`,
    data
  );
  return responsedata;
};
export const PostVehicleDetails = async (data) => {
  const responsedata = await axios.post(
    `${APIENDPOINT}/api/proposal/InsertVehicleAdditionalDetails`,
    data
  );
  return responsedata;
};
export const GetOccupation = async (Companyid) => {
  const {
    data: { Occupation: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetOccupation?Companyid=${Companyid}`
  );
  let res = responseBody.filter((v, i, a) => {
    return a.findIndex((v2) => v2.CODE === v.CODE) === i;
  });
  return res;
};
export const GetNominee = async (Companyid) => {
  const {
    data: { Nominee: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetNomineeRelationship?Companyid=${Companyid}`
  );
  return responseBody;
};

export const GetStates = async (Companyid) => {
  // Companyid = 124;
  const {
    data: { StateName: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetInsurerState?Companyid=${Companyid}`
  );
  return responseBody;
};

export const GetCity = async (Companyid, stateID) => {
  // Companyid = 124;
  const {
    data: { CityName: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetInsurerCity?Companyid=${Companyid}&stateID=${stateID}`
  );
  return responseBody;
};

export const GetPreviousInsurer = async (Companyid) => {
  // Companyid = 124;
  const {
    data: { PreviousComp: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetPreviousInsurer?Companyid=${Companyid}`
  );
  let res = responseBody.filter((v, i, a) => {
    return a.findIndex((v2) => v2.SupplierId === v.SupplierId) === i;
  });
  return res;
};

export const GetFinancerDetails = async (Companyid) => {
  // Companyid = 124;
  const {
    data: { Financier: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetFinancerDetails?Companyid=${Companyid}`
  );
  return responseBody;
};
export const GetGarages = async (Companyid, searchby, searchtext) => {
  // Companyid = 124;
  const {
    data: { GarageList: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetGarageList?searchby=${searchby}&searchtext=${searchtext}&Companyid=${Companyid}`
  );
  return responseBody;
};

export const PostEmail = async (data) => {
  const {
    data: { Financier: responseBody },
  } = await axios.post(`${APIENDPOINT}/api/proposal/SendEmail?`, data);
  return responseBody;
};

export const GetDeclineCompanies = async (EnquiryNo) => {
  const {
    data: { DeclineComp: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetDeclineCompanies?EnquiryNo=${EnquiryNo}`
  );
  return responseBody;
};

export const GetBankInfo = async (Companyid) => {
  const {
    data: { Bankinfo: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetBankInfo?Companyid=${Companyid}`
  );
  return responseBody;
};

export const PostCheckInfo = async (data) => {
  const responseBody = await axios.post(
    `${APIENDPOINT}/api/proposal/InsertOfflinePaymentDetails`,
    data
  );
  return responseBody;
};

export const PostProposalService = async (data) => {
  const responseBody = await axios.post(
    `${APIENDPOINT}/api/proposal/HitProposalService?EnquiryNo=${data.EnquiryNo}&Planid=${data.Planid}&Userid=${data.Userid}`
  );
  return responseBody.data;
};

export const GetRehitePremium = async (data) => {
  const {
    data: { FinalPremium: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetRehitePremium?EnquiryNo=${data.EnquiryNo}&Planid=${data.PlanId}`
  );
  return responseBody;
};
export const GetPinCode = async (CompanyId, stateID, CityID) => {
  try {
    const {
      data: { PinCode: responseBody },
    } = await axios.get(
      `${APIENDPOINT}/api/proposal/GetInsurerPincode?Companyid=${CompanyId}&stateID=${stateID}&CityID=${CityID}`
    );
    return responseBody;
  } catch (error) {
    return [];
  }
};

export const GetKYCStatus = async (CompanyId, EnquiryNo) => {
  // Companyid = 124;
  const responseBody = await axios.post(
    `${APIENDPOINT}/api/proposal/CheckKYCStatus?Enquiryno=${EnquiryNo}&CompanyID=${CompanyId}`
  );
  return responseBody;
};

export const GetUploadFileTypes = async (CompanyId, EnquiryNo) => {
  // Companyid = 124;
  const {
    data: { FilesType: responseBody },
  } = await axios.get(
    `${APIENDPOINT}/api/proposal/GetFileTypes?Enquiryno=${EnquiryNo}&CompanyID=${CompanyId}`
  );
  return responseBody;
};

export const PostUploadFiles = async (data) => {
  const responsedata = await axios.post(
    `${APIENDPOINT}/api/proposal/UploadCustomerKYCDocs`,
    data
  );
  return responsedata;
};

export const getTnCData = async (EnquiryNo, planid) => {
  const responsedata = await axios.post(
    `${APIENDPOINT}/api/proposal/SavePlan?Enquiryno=${EnquiryNo}&planid=${planid}`
  );
  return responsedata;
};
