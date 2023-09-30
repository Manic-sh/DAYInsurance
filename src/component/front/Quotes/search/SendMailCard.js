import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getCompanyImgName from "../../common/CompanyImages";

const SendMailCard = (props) => {
  const { sendEmailProduct } = props;
  console.log('sendEmailProduct',sendEmailProduct);
  return (
    <>
      {sendEmailProduct.map((item, i) => (
        <Box
          key={i}
          component="div"
          sx={{
            bgcolor: "#eeeeee",
            p: 1,
            mb: 1,
            borderRadius: "8px",
            display: "flex",
            alignItems: { sm: "start", xs: "center" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" }
          }}
        >
          <Box component="div" sx={{ width: "120px", height: "60px" }}>
            <Box
              component="img"
              alt={item.SupplierName}
              src={getCompanyImgName(item.SupplierName)}
              className="img_fluid"
              sx={{ height: "60px", borderRadius: "5px" }}
            />
          </Box>
          <Box
            component="div"
            sx={{
              display: { sm: "block", xs: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", sm: "auto" }
            }}
          >
            <Typography variant="body2">Sum insured Value</Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              ₹ {item.SupplierIdv}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              display: { sm: "block", xs: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", sm: "auto" }
            }}
          >
            <Typography variant="body2">Basic OD</Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              ₹ {item.BasicPremium}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              display: { sm: "block", xs: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", sm: "auto" }
            }}
          >
            <Typography variant="body2">OD Discount</Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
               {item.ODDiscountRate ? (`₹ ${item.ODDiscountRate}`):''}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              display: { sm: "block", xs: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", sm: "auto" }
            }}
          >
            <Typography variant="body2">Total Premium</Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              ₹ {item.FinalPremium}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default SendMailCard;
