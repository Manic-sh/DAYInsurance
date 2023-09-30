// component
import Iconify from "../../component/dashboard/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Book Insurance",
    path: "/Motor",
    icon: getIcon("mdi:shield-car"),
  },
  {
    title: "Manage",
    path: "/dashboard/manage/*",
    icon: getIcon("mdi:tune"),
    children: [
      {
        title: "Profile",
        path: "/dashboard/manage/profile",
        icon: getIcon("mdi:account-details"),
      },
      {
        title: "Change Password",
        path: "/dashboard/manage/password-change",
        icon: getIcon("mdi:form-textbox-password"),
      },
      {
        title: "Add Record Policy",
        path: "/dashboard/manage/add-policy",
        icon: getIcon("mdi:clipboard-list-outline"),
      },
      {
        title: "Add Vehicle",
        path: "/dashboard/manage/add-vehicle",
        icon: getIcon("mdi:playlist-plus"),
      },
      {
        title: "Hold Policies",
        path: "/dashboard/manage/hold-policy",
        icon: getIcon("mdi:motion-pause"),
      },
      // {
      //   title: "QR Forms",
      //   path: "/dashboard/manage/add-vehicle",
      //   icon: getIcon("mdi:list-box-outline"),
      // }
    ],
  },
  {
    title: "Support",
    path: "/dashboard/support/*",
    icon: getIcon("mdi:hand-heart"),
    children: [
      {
        title: "Write Us",
        path: "/dashboard/support/write-us",
        icon: getIcon("mdi:clipboard-edit-outline"),
      },
      {
        title: "Query Status",
        path: "/dashboard/support/query-status",
        icon: getIcon("mdi:head-question-outline"),
      }
    ],
  },
  {
    title: "POS Module",
    path: "/Motor",
    icon: getIcon("mdi:email-seal-outline"),
    children: [
      {
        title: "Training",
        path: "/Motor",
        icon: getIcon("mdi:transit-transfer"),
      },
      {
        title: "P.O.S. Examination",
        path: "/Motor",
        icon: getIcon("mdi:shield-edit-outline"),
      },
      {
        title: "Download Certificates",
        path: "/Motor",
        icon: getIcon("mdi:download-circle-outline"),
      }
    ],
  },
  {
    title: "Reports",
    path: "/dashboard/policies/*",
    icon: getIcon("mdi:chart-areaspline"),
    children: [
      {
        title: "View Policies",
        path: "/dashboard/policies/list",
        icon: getIcon("mdi:briefcase-eye-outline"),
      },
      // {
      //   title: "View Renewals",
      //   path: "/dashboard/policies",
      //   icon: getIcon("mdi:briefcase-eye-outline"),
      // },
      // {
      //   title: "Issued Policy",
      //   path: "/Motor",
      //   icon: getIcon("mdi:office-building-outline"),
      // },
      // {
      //   title: "Not Renewed",
      //   path: "/Motor",
      //   icon: getIcon("mdi:file-cancel-outline"),
      // },
      // {
      //   title: "Vehicle Report",
      //   path: "/Motor",
      //   icon: getIcon("mdi:finance"),
      // },
      // {
      //   title: "Hold Policies",
      //   path: "/Motor",
      //   icon: getIcon("mdi:pause-circle"),
      // }
    ],
  },
  {
    title: "Request Callback",
    path: "/Motor",
    icon: getIcon("mdi:face-agent"),
  },
];

export default navConfig;
