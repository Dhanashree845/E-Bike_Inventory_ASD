import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* ADMIN ONLY */}
        {role === "ADMIN" && (
          <>
            <ListItemButton onClick={() => navigate("/bikes")}>
              <ListItemText primary="Bikes" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/suppliers")}>
              <ListItemText primary="Suppliers" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/purchases")}>
              <ListItemText primary="Purchases" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/reports")}>
              <ListItemText primary="Reports" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate("/stock-history")}>
              <ListItemText primary="Stock History" />
            </ListItemButton>
          </>
        )}

        {/* ADMIN + STAFF */}
        <ListItemButton onClick={() => navigate("/customers")}>
          <ListItemText primary="Customers" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/sales")}>
          <ListItemText primary="Sales" />
        </ListItemButton>

        <Divider sx={{ my: 2 }} />

        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;
