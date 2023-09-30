// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import Link from '@mui/material/Link';
// utils
// components
import Iconify from "../Iconify";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetContact.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetContact({
  name,
  number,
  icon,
  type,
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 1,
        boxShadow: 0,
        textAlign: "center",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="subtitle2" sx={{ opacity: 0.72, mb: 1 }}>
        {type}
      </Typography>
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
          mb: 1,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h5">{name}</Typography>

      <Typography variant="a" sx={{ opacity: 0.72 }}>
        <Link href={`tel:${number}`} color="inherit" style={{ textDecoration: 'none' }}>
        <Iconify icon='mdi:phone' width={15} height={15} sx={{p:0}} /> {number}
        </Link>
      </Typography>
    </Card>
  );
}
