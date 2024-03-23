import type { Cart } from "@/types";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";

interface LayoutProps {
  shoppingCart: Cart;
}

export const Amount = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: 1;
  padding: 0px 5px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  background: #f44336;
`;

function Layout({ shoppingCart }: LayoutProps) {
  const cartItemAmount = shoppingCart.reduce(
    (sum, order) => sum + order.amount,
    0
  );

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
              {cartItemAmount > 0 && <Amount>{cartItemAmount}</Amount>}
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
