import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Typography, Paper, Box } from "@mui/material";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBikes: 0,
    totalCustomers: 0,
    totalSales: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    totalStock: 0,
    lowStock: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [bikesRes, customersRes, salesRes, purchasesRes] =
        await Promise.all([
          axios.get("/bikes"),
          axios.get("/customers"),
          axios.get("/sales"),
          axios.get("/purchases")
        ]);

      const bikes = bikesRes.data.data || [];
      const customers = customersRes.data.data || [];
      const sales = salesRes.data.data || [];
      const purchases = purchasesRes.data.data || [];

      const totalRevenue = sales.reduce(
        (sum, sale) => sum + (sale.totalAmount || 0),
        0
      );

      const totalStock = bikes.reduce(
        (sum, bike) => sum + (bike.stock || 0),
        0
      );

      const lowStock = bikes.filter(
        (bike) => bike.stock <= bike.minimumStock
      ).length;

      setStats({
        totalBikes: bikes.length,
        totalCustomers: customers.length,
        totalSales: sales.length,
        totalPurchases: purchases.length,
        totalRevenue,
        totalStock,
        lowStock
      });

    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  const Card = ({ title, value }) => (
    <Paper elevation={3} sx={{ p: 3, width: 260, textAlign: "center", borderRadius: 3 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" sx={{ mt: 1 }}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Card title="Total Bikes" value={stats.totalBikes} />
        <Card title="Total Customers" value={stats.totalCustomers} />
        <Card title="Total Sales" value={stats.totalSales} />
        <Card title="Total Purchases" value={stats.totalPurchases} />
        <Card title="Total Revenue" value={`₹ ${stats.totalRevenue}`} />
        <Card title="Total Stock" value={stats.totalStock} />
        <Card title="Low Stock Items" value={stats.lowStock} />
      </Box>
    </>
  );
}

export default Dashboard;
