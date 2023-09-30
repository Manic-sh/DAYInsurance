import React, { useMemo, useEffect, useState } from "react";
import Moment from "moment";

import {
  Card,
  Stack,
  LinearProgress,
  Container,
  Typography,
} from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";


import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useSelector, useDispatch } from "react-redux";

import { setQueryList } from "../../../store/redux/dashboard/support/QuerySlice";
import useAuth from "../../../hooks/useAuth";

import Page from "../../../component/dashboard/Page";
import QueryStatusModal from "../../../component/dashboard/support/QueryStatusModal"

const QueryStatus = () => {
  const dispatch = useDispatch();
  const { Auth } = useAuth();
  const isLoading = useSelector((state) => state.query_list_data.loading);
  const listData = useSelector((state) => {
    return state.query_list_data.loading
      ? []
      : state.query_list_data.data.Report;
  });

  const columnsData = useMemo(
    () => [
      {
        field: "PolicyNo",
        headerName: "Ticket ID",
        width: 120,
        editable: false,
      },
      {
        field: "CoverNoteNo",
        headerName: "Reason",
        width: 240,
        editable: false,
        renderCell: (params) => {
          return (
            <Button
              variant="text"
              onClick={() => {
                handleClickOpen();
              }}
              endIcon={<OpenInNewIcon />}
            >
              {params.row.PolicyNo}
            </Button>
          );
        },
      },
      {
        field: "MemberID",
        headerName: "Policy No",
        width: 120,
        editable: false,
      },
      {
        field: "PolicyHolder",
        headerName: "Remarks",
        width: 120,
        editable: false,
      },
      {
        field: "StartDate",
        headerName: "Generate Date",
        width: 120,
        editable: false,
      },
      {
        field: "Insurer",
        headerName: "Status",
        width: 120,
        editable: false,
      },
    ],
    []
  );
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };


  useEffect(() => {
    dispatch(
      setQueryList({
        Userid: Auth.data.Userid,
        ReportType: "RENEWAL",
        StartDate: Moment(new Date()).format("YYYY-MM-DD"),
        EndDate: Moment(new Date()).add(1, "year").format("YYYY-MM-DD"),
      })
    );
  }, [dispatch, Auth]);

  const pageTitle = "My Queries";
  return (
    <>
      <Page title={pageTitle} style={{ height: " 100%", width: "100%" }}>
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
            <QueryStatusModal handleClose={()=>handleClose()} open={open} />
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default QueryStatus;
