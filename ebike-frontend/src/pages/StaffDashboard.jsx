import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Typography,
  Paper,
  Box
} from "@mui/material";

function StaffDashboard() {
  const [stats, setStats] = useState({
    totalBikes: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bikesRes, customersRes] = await Promise.all([
        axios.get("/bikes"),
        axios.get("/customers")
      ]);

      const bikes = bikesRes.data.data || [];
      const customers = customersRes.data.data || [];

      setStats({
        totalBikes: bikes.length,
        totalCustomers: customers.length
      });

    } catch (error) {
      console.error("Staff Dashboard Error:", error);
    }
  };

  const StatCard = ({ title, value }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: 250,
        textAlign: "center",
        borderRadius: 3
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" sx={{ mt: 1 }}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Staff Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap"
        }}
      >
        <StatCard title="Total Bikes" value={stats.totalBikes} />
        <StatCard title="Total Customers" value={stats.totalCustomers} />
      </Box>
    </>
  );
}

export default StaffDashboard;
