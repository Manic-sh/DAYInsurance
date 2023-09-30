import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import getCompanyImgName from "../../common/CompanyImages";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D88A3B",
    color: theme.palette.common.white,
    verticalAlign: "inherit",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fff0e0"
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const CompareDataTable = (props) => {
  const { items } = props;
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" ,mt: 2 }}>
        <TableContainer sx={{ maxHeight: "86vh" }}  className="inner_scrollbar">
          <Table orientation="verticle" stickyHeader size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="left"
                  sx={{ maxWidth: "130px", padding: "8px" }}
                >
                  SUPPLIER
                </StyledTableCell>
                {items.map((o, i) => (
                  <StyledTableCell
                    key={i}
                    align="left"
                    sx={{ maxWidth: "150px", padding: "8px" }}
                  >
                    <Box sx={{ width: "35%", minWidth: "100px" ,textAlign: "center" }}>
                      <Box
                        component="img"
                        alt={o.SupplierName}
                        src={getCompanyImgName(o.SupplierName)}
                        className="img_fluid"
                        sx={{ borderRadius: "2px" }}
                      />
                    </Box>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <TableCell>Sun insured</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.SupplierIdv !== 0 && o.SupplierIdv !== null ? o.SupplierIdv : <CloseIcon/> }</TableCell>
                ))}
              </StyledTableRow>
              <StyledTableRow>
                <TableCell>Third Party Cover Premium</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.TPPDLiabilityPremium !== 0 && o.TPPDLiabilityPremium !== null ? o.TPPDLiabilityPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>PA Owner Driver</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.CompulsaryPACoverForOwnerDriverPremium !== 0 && o.CompulsaryPACoverForOwnerDriverPremium !== null ? o.CompulsaryPACoverForOwnerDriverPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Legal Liability Driver</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.LegalLiabilityToPaidDriverPremium !== 0 && o.LegalLiabilityToPaidDriverPremium !== null ? o.LegalLiabilityToPaidDriverPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>NCB Discount</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.NCBDiscount !== 0 && o.NCBDiscount !== null ? o.NCBDiscount : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Insurer Discount</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.InsurerDiscount !== 0 && o.InsurerDiscount !== null ? o.InsurerDiscount : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Anti-theft Discount</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.AntiTheftDiscount !== 0 && o.AntiTheftDiscount !== null ? o.AntiTheftDiscount : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Voluntary Deductible</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.VoluntaryDiscount !== 0 && o.VoluntaryDiscount !== null ? o.VoluntaryDiscount : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Automobile Discount</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.AutomobileMembershipDiscount !== 0 && o.AutomobileMembershipDiscount !== null ? o.AutomobileMembershipDiscount : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Zero Dept</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.ZeroDepPremium !== 0 && o.ZeroDepPremium !== null ? o.ZeroDepPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Key Loss</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.KeyReplacement !== 0 && o.KeyReplacement !== null ? o.KeyReplacement : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Road Side Assistance</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.RoadsideAssistanceCoverPremium !== 0 && o.RoadsideAssistanceCoverPremium !== null ? o.RoadsideAssistanceCoverPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Engine Cover</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.EPPremium !== 0 && o.EPPremium !== null ? o.EPPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Passenger Assistant</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.PAPremium !== 0 && o.PAPremium !== null ? o.PAPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>

              <StyledTableRow>
                <TableCell>Consumable</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.COCPremium !== 0 && o.COCPremium !== null ? o.COCPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>
              <StyledTableRow>
                <TableCell>CNG/LPG OD Premium</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.BiFuelKitPremium !== 0 && o.BiFuelKitPremium !== null ? o.BiFuelKitPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>
              <StyledTableRow>
                <TableCell>CNG/LPG TP Premium</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.BiFuelKitLiabilityPremium !== 0 && o.BiFuelKitLiabilityPremium !== null ? o.BiFuelKitLiabilityPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>
              <StyledTableRow>
                <TableCell>Non Electrical Accessories</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.NonElectricalAccessoriesPremium !== 0 && o.NonElectricalAccessoriesPremium !== null ? o.NonElectricalAccessoriesPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>
              <StyledTableRow>
                <TableCell>Electrical Accessories</TableCell>
                {items.map((o, i) => (
                  <TableCell key={i}>{o.ElectricalAccessoriesPremium !== 0 && o.ElectricalAccessoriesPremium !== null ? o.ElectricalAccessoriesPremium : <CloseIcon/>}</TableCell>
                ))}
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default CompareDataTable;
