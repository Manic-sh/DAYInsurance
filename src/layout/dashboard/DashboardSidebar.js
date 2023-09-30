import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
// mock
import ImgAvatar from "../../assets/dashboard/images/avatars/avatar_default.jpg";
// hooks
import useAuth from "../../hooks/useAuth";
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../component/dashboard/Logo";
import Scrollbar from "../../component/dashboard/Scrollbar";
import NavSection from "../../component/dashboard/NavSection";
//
import navConfig from "./NavConfig";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { Auth } = useAuth();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Scrollbar
        forceVisible="y"
        sx={{
          height: 1,
          "& .simplebar-content": {
            height: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
          <Logo />
        </Box>

        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none" component={RouterLink} to="#">
            <AccountStyle>
              <Avatar src={ImgAvatar} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {Auth.data.Title} {Auth.data.Name} {Auth.data.LastName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {Auth.data.Role}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </Box>

        <NavSection navConfig={navConfig} />
        <Box sx={{ flexGrow: 1 }} />
      </Scrollbar>
    </>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
