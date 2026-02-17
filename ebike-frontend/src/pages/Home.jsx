import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else if (role === "STAFF") {
        navigate("/staff-dashboard");
      }
    }
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        E-Bike Inventory System
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        Manage stock, sales and analytics easily.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/login")}
      >
        LOGIN
      </Button>
    </Box>
  );
}

export default Home;
