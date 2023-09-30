import { useSelector } from "react-redux";

// @mui
import { Badge, IconButton } from "@mui/material";

// components
import Iconify from "../../component/dashboard/Iconify";


export default function NotificationsPopover() {
  const dashboard_data = useSelector((state) => state.dashboard_data);

  return (
    <>
      <IconButton color="default" sx={{ width: 40, height: 40 }} >
        {!dashboard_data.loading && (
          <Badge
            badgeContent={dashboard_data.data.CNT_POL_RENEWAL}
            color="error"
           
          >
            <Iconify icon="eva:bell-fill" width={20} height={20} />
          </Badge>
        )}
      </IconButton>
    </>
  );
}
