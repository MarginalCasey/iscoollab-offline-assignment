import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              點餐系統
            </Typography>
            <Button color="inherit" component={Link} to="menu">
              菜單
            </Button>
            <Button color="inherit" component={Link} to="cart">
              購物車
            </Button>
            <Button color="inherit" component={Link} to="history">
              訂單
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}

export default Layout;
