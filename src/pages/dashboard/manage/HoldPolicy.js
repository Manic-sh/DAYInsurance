import React, { useMemo, useEffect, useState } from "react";
import Moment from "moment";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useSelector, useDispatch } from "react-redux";

import { setReportsData } from "../../../store/redux/dashboard/reports/ReportsSlice";
import useAuth from "../../../hooks/useAuth";

import {
  Card,
  Stack,
  LinearProgress,
  Container,
  Typography,
} from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../../component/dashboard/Page";

import DatePicker from "../../../component/dashboard/tools/DatePicker";


// import fileDownload from "js-file-download";


const HoldPolicy = () => {
  const dispatch = useDispatch();
  const { Auth } = useAuth();
  const isLoading = useSelector((state) => state.reports_data.loading);
  const listData = useSelector((state) => {
    return state.reports_data.loading ? [] : state.reports_data.data.Report;
  });

  // const fileDownload = (params, a) => {};

  const columnsData = useMemo(
    () => [
      {
        field: "RecordNo",
        headerName: "Record No",
        width: 120,
        editable: false,
      },
      {
        field: "PolicyNo",
        headerName: "Policy No",
        width: 240,
        editable: false,
        renderCell: (params) => {
          return (
            <Button
              variant="text"
              onClick={() => {
                //  console.log(file_data);
                // fileDownload(file_data, params.row.PolicyNo + ".pdf", "pdf");
              }}
              endIcon={<CloudDownloadIcon />}
            >
              {params.row.PolicyNo}
            </Button>
          );
        },
      },
      {
        field: "CoverNoteNo",
        headerName: "Cover Note No",
        width: 120,
        editable: false,
      },
      {
        field: "StartDate",
        headerName: "Start Date",
        width: 90,
        editable: false,
        renderCell: (param) => {
          return Moment(param.row.StartDate).format("YYYY-MM-DD");
        },
      },
      {
        field: "EndDate",
        headerName: "End Date",
        width: 90,
        editable: false,
        renderCell: (param) => {
          return Moment(param.row.EndDate).format("YYYY-MM-DD");
        },
      },
      {
        field: "PolicyHolder",
        headerName: "Policy Holder",
        width: 200,
        editable: false,
      },
      {
        field: "Product",
        headerName: "Product",
        width: 120,
        editable: false,
      },
      {
        field: "MemberID",
        headerName: "Party",
        width: 240,
        editable: false,
      },
      {
        field: "MemberName",
        headerName: "Party Name",
        width: 160,
        editable: false,
      },
      {
        field: "Insurer",
        headerName: "Company",
        width: 120,
        editable: false,
      },
      {
        field: "Premium",
        headerName: "Basic",
        width: 70,
        editable: false,
      },
      {
        field: "TP",
        headerName: "T.P",
        width: 70,
        editable: false,
      },
      {
        field: "Taxes",
        headerName: "Tax",
        width: 70,
        editable: false,
      },
      {
        field: "Schg",
        headerName: "Service Charges",
        width: 70,
        editable: false,
      },
      {
        field: "VehNum",
        headerName: "Vehicle no",
        width: 140,
        editable: false,
      },
      {
        field: "ReferenceNo",
        headerName: "Reference No",
        width: 140,
        editable: false,
      },
      // {
      //   // field: "actions",
      //   width: 140,
      //   headerName: "Download",
      //   type: "actions",
      //   renderCell: (params) => {
      //     console.log("sdf>>", params);
      //     return (
      //       <Button
      //       variant="contained"
      //         onClick={() =>
      //           fileDownload(params.row.RecordNo, params.row.RecordNo)
      //         }
      //         endIcon={<CloudDownloadIcon/>}
      //       >
      //         Download
      //       </Button>
      //     );
      //     // return <Link to={params.row.RecordNo} >Download</Link>;
      //   },
      // },
    ],
    []
  );



  const MinDate = Moment().subtract(1, "y").toDate();
  const MaxDate = Moment().add(1, "y").toDate();

  const [FilterStartDate, setFilterStartDate] = useState(MinDate);
  const [FilterEndDate, setFilterEndDate] = useState(MaxDate);

  const handleStartDateChange = (v) => {
    Moment(v).isBefore(FilterEndDate) && setFilterStartDate(v);
  };
  const handleEndDateChange = (v) => {
    Moment(v).isAfter(FilterStartDate) && setFilterEndDate(v);
  };

  useEffect(() => {
    dispatch(
      setReportsData({
        Userid: Auth.data.Userid,
        ReportType: 'RENEWAL',
        StartDate: Moment(FilterStartDate).format("YYYY-MM-DD"),
        EndDate: Moment(FilterEndDate).format("YYYY-MM-DD"),
      })
    );
  }, [dispatch, Auth, FilterStartDate, FilterEndDate]);

  const pageTitle ='Hold Policy'

  return (
    <>
      <Page
        title={pageTitle}
        style={{ height: " 100%", width: "100%" }}
      >
        <Container style={{ height: " 100%", width: "100%" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              {pageTitle}
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap-reverse"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <DatePicker
                  FilterName="Start Date"
                  FilterDate={FilterStartDate}
                  FilterMinDate={MinDate}
                  FilterMaxDate={MaxDate}
                  handleFilterChange={handleStartDateChange}
                />
                <DatePicker
                  FilterName="End Date"
                  FilterDate={FilterEndDate}
                  FilterMinDate={MinDate}
                  FilterMaxDate={MaxDate}
                  handleFilterChange={handleEndDateChange}
                />
              </Stack>
            </Stack>
          </Stack>

          <Card style={{ height: " 100%", width: "100%" }}>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={listData}
                rowHeight={56}
                columns={columnsData}
                getRowId={(row) => row.RecordNo}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                loading={isLoading}
                components={{
                  Toolbar: GridToolbar,
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No Records
                    </Stack>
                  ),
                  NoResultsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No Records
                    </Stack>
                  ),
                  LoadingOverlay: LinearProgress,
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
              />
            </div>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default HoldPolicy;
