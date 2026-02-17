import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          {role === "ADMIN"
            ? "E-Bike Inventory Admin"
            : "E-Bike Inventory Staff"}
        </Typography>

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
