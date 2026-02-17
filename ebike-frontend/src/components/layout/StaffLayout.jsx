import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  CssBaseline
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

function StaffLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ================= APP BAR ================= */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-Bike Inventory Staff
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ================= SIDEBAR ================= */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        {/* This Toolbar pushes sidebar content below AppBar */}
        <Toolbar />

        <List>
          <ListItemButton onClick={() => navigate("/staff-dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/staff-customers")}>
            <ListItemText primary="Customers" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/staff-bikes")}>
            <ListItemText primary="Bikes" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/sales")}>
            <ListItemText primary="Sales" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        {/* Push content below AppBar */}
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}

export default StaffLayout;
