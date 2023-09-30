import React from "react";
import { useSelector } from "react-redux";

// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";

// components
import Page from "../../component/dashboard/Page";
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppWidgetContact,
} from "../../component/dashboard/dashboard";

// ----------------------------------------------------------------------

const Dashboard = (props) => {
  const theme = useTheme();
  const dashboard_data = useSelector((state) => state.dashboard_data);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        {!dashboard_data.loading && (
          <Grid container spacing={3} pb={5}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetContact
                name={dashboard_data.data.MotorPersonName}
                number={dashboard_data.data.MotorPersonContact}
                icon={"mdi:car"}
                type="For Motor"
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetContact
                name={dashboard_data.data.HealthPersonName}
                number={dashboard_data.data.HealthPersonContact}
                icon={"mdi:hand-heart"}
                type="For Health"
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetContact
                name={dashboard_data.data.RMName}
                number={dashboard_data.data.RMPhone}
                icon={"mdi:handshake"}
                type="Relationship Manager"
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetContact
                name={dashboard_data.data.OtherPersonName}
                number={dashboard_data.data.OtherPersonContact}
                icon={"mdi:face-agent"}
                type="For Queries"
                color="info"
              />
            </Grid>
          </Grid>
        )}

        <Grid container spacing={3}>
          {!dashboard_data.loading && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Policy Issued Within 1 Month"
                  total={dashboard_data.data.CNT_POL_ISSUED}
                  icon={"mdi:shield-car"}
                  color="warning"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Policy Renewals Within 1 Month"
                  total={dashboard_data.data.CNT_POL_RENEWAL}
                  color="warning"
                  icon={"mdi:shield-car"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Not Renewed Within 1 Month"
                  total={dashboard_data.data.CNT_POL_NOTRENEWAL}
                  color="warning"
                  icon={"mdi:shield-car"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Policies Issued Till Date"
                  total={dashboard_data.data.CNT_POL_ISSUED_1_YEAR}
                  color="warning"
                  icon={"mdi:shield-car"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="Support Tickets"
                  total={dashboard_data.data.CNT_SUP_TKT}
                  color="error"
                  icon={"mdi:face-agent"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="PUC Expiring within 20 Days"
                  total={dashboard_data.data.CNT_PUC_EXPIRY}
                  color="error"
                  icon={"mdi:timer-sand-complete"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="Vehicle Service Within 20 Days"
                  total={dashboard_data.data.CNT_SERV_EXPIRY}
                  color="error"
                  icon={"mdi:timer-sand-complete"}
                />
              </Grid>
            </>
          )}
          {!dashboard_data.loading && (
            <Grid item xs={12} md={6} lg={6}>
              <AppWebsiteVisits
                title="Sales Monthwise"
                subheader=""
                chartLabels={dashboard_data.data.chartLabels.map(
                  (value, index) => {
                    return value.monthdate;
                  }
                )}
                chartData={dashboard_data.data.chartData}
              />
            </Grid>
          )}
          {!dashboard_data.loading && (
            <Grid item xs={12} md={6} lg={6}>
              <AppWebsiteVisits
                title="Sales Monthwise Amount"
                subheader=""
                chartLabels={dashboard_data.data.chartLabels_2.map(
                  (value, index) => {
                    return value.monthdate;
                  }
                )}
                chartData={dashboard_data.data.chartData_2}
              />
            </Grid>
          )}
          {!dashboard_data.loading && (
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="Total Policies"
                chartData={
                  dashboard_data.data.piechart
                }
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.chart.blue[0],
                  theme.palette.chart.violet[0],
                  theme.palette.chart.yellow[0],
                ]}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
