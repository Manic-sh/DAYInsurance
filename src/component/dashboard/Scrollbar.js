import PropTypes from "prop-types";
import SimpleBarReact from "simplebar-react";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import 'simplebar/dist/simplebar.min.css';

// ----------------------------------------------------------------------

const RootStyle = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  overflowY: "hidden",
  // " ::-webkit-scrollbar": {
  //   display: "none",
  // },
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
//   "& .simplebar-content-wrapper::-webkit-scrollbar":{
//     display: "none",
//   },
// "& .simplebar-content-wrapper":{
//   "-ms-overflow-style": "none",  /* IE and Edge */
//   "scrollbar-width": "none"  /* Firefox */
// }

}));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflow: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}
