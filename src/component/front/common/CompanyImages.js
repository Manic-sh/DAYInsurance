import Aegon_Religare_logo from "../../../assets/images/insurance_company/Aegon_Religare_logo.png";
import BAJAJ from "../../../assets/images/insurance_company/BAJAJ.png";
import BAJAJ_logo from "../../../assets/images/insurance_company/BAJAJ_logo.png";
import BhartiAxa from "../../../assets/images/insurance_company/BhartiAxa.png";
import BhartiAxa2 from "../../../assets/images/insurance_company/BhartiAxa2.png";
import Birla from "../../../assets/images/insurance_company/Birla.png";
import Cholamandlam from "../../../assets/images/insurance_company/Cholamandlam.jpg";
import COCO from "../../../assets/images/insurance_company/COCO.png";
import edelwise from "../../../assets/images/insurance_company/edelwise.png";
import Future from "../../../assets/images/insurance_company/Future.png";
import GoDigit from "../../../assets/images/insurance_company/GoDigit.png";
import HDFC from "../../../assets/images/insurance_company/HDFC.png";
import HDFC_Life_logo from "../../../assets/images/insurance_company/HDFC_Life_logo.png";
import icici from "../../../assets/images/insurance_company/icici.png";
import ICICI_Lombard from "../../../assets/images/insurance_company/ICICI Lombard .png";
import IDBI_logo from "../../../assets/images/insurance_company/IDBI_logo.png";
import Iffco from "../../../assets/images/insurance_company/Iffco.png";
import Kotak from "../../../assets/images/insurance_company/Kotak.png";
import Liberty_Videocon from "../../../assets/images/insurance_company/Liberty Videocon.png";
import magma from "../../../assets/images/insurance_company/magma.png";
import MAGMAHDI from "../../../assets/images/insurance_company/MAGMAHDI.png";
import MAX_logo from "../../../assets/images/insurance_company/MAX_logo.png";
import national from "../../../assets/images/insurance_company/national.png";
import newindia from "../../../assets/images/insurance_company/newindia.png";
import NIA from "../../../assets/images/insurance_company/NIA.png";
import NIC from "../../../assets/images/insurance_company/NIC.png";
import OICL from "../../../assets/images/insurance_company/OICL.png";
import oriental from "../../../assets/images/insurance_company/oriental.png";
import Raheja from "../../../assets/images/insurance_company/Raheja.png";
import reliance1 from "../../../assets/images/insurance_company/reliance1.png";
import Reliance from "../../../assets/images/insurance_company/Reliance.png";
import Sompo from "../../../assets/images/insurance_company/Sompo.png";
import SriRam from "../../../assets/images/insurance_company/SriRam.png";
import SUNDARAM from "../../../assets/images/insurance_company/SUNDARAM.png";
import tata from "../../../assets/images/insurance_company/tata.png";
import United from "../../../assets/images/insurance_company/United.png";
import universal from "../../../assets/images/insurance_company/universal.png";
import NoImage from "../../../assets/images/insurance_company/noimage.png";

import { get, find } from "lodash";
const imgName = [
  {
    title: "GoDigit",
    path: GoDigit
  },
  {
    title: "BAJAJ",
    path: BAJAJ
  },
  {
    title: "BAJAJ_logo",
    path: BAJAJ_logo
  },
  {
    title: "BhartiAxa",
    path: BhartiAxa
  },
  {
    title: "BhartiAxa2",
    path: BhartiAxa2
  },
  {
    title: "Aegon_Religare_logo",
    path: Aegon_Religare_logo
  },
  {
    title: "Birla",
    path: Birla
  },
  {
    title: "Cholamandlam",
    path: Cholamandlam
  },
  {
    title: "COCO",
    path: COCO
  },
  {
    title: "edelwise",
    path: edelwise
  },
  {
    title: "Future",
    path: Future
  },
  {
    title: "HDFC",
    path: HDFC
  },
  {
    title: "ICICI Lombard ",
    path: ICICI_Lombard
  },
  {
    title: "Liberty Videocon",
    path: Liberty_Videocon
  },
  {
    title: "HDFC_Life_logo",
    path: HDFC_Life_logo
  },
  {
    title: "icici",
    path: icici
  },
  {
    title: "IDBI_logo",
    path: IDBI_logo
  },
  {
    title: "Iffco",
    path: Iffco
  },
  {
    title: "Kotak",
    path: Kotak
  },
  {
    title: "magma",
    path: magma
  },
  {
    title: "MAGMAHDI",
    path: MAGMAHDI
  },
  {
    title: "MAX_logo",
    path: MAX_logo
  },
  {
    title: "national",
    path: national
  },
  {
    title: "newindia",
    path: newindia
  },
  {
    title: "NIA",
    path: NIA
  },
  {
    title: "NIC",
    path: NIC
  },
  {
    title: "OICL",
    path: OICL
  },
  {
    title: "oriental",
    path: oriental
  },
  {
    title: "Raheja",
    path: Raheja
  },
  {
    title: "reliance1",
    path: reliance1
  },
  {
    title: "Reliance",
    path: Reliance
  },
  {
    title: "Sompo",
    path: Sompo
  },
  {
    title: "SriRam",
    path: SriRam
  },
  {
    title: "SUNDARAM",
    path: SUNDARAM
  },
  {
    title: "tata",
    path: tata
  },
  {
    title: "United",
    path: United
  },
  {
    title: "universal",
    path: universal
  }
];
const getCompanyImgName = (supplierName) => {
  const findImg = find(imgName, { title: supplierName });
  return get(findImg, "path", NoImage);
};
export default getCompanyImgName;
