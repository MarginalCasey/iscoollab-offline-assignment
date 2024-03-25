import type { Cart } from "@/types";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import MuiToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, Outlet } from "react-router-dom";

interface LayoutProps {
  shoppingCart: Cart;
}

const Toolbar = styled(MuiToolbar)`
  a {
    border-radius: 0;
  }

  a.active {
    border-bottom: 1px solid white;
  }
`;

const Main = styled.main`
  margin-top: 64px;
  height: calc(100vh - 64px);
  background-color: #f8f8f8;
  overflow-y: auto;
`;

const Amount = styled.div`
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
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            點餐系統
          </Typography>
          <Button color="inherit" component={NavLink} to="menu">
            菜單
          </Button>
          <Button color="inherit" component={NavLink} to="cart">
            購物車
            {cartItemAmount > 0 && (
              <Amount data-testid="cart-item-amount">{cartItemAmount}</Amount>
            )}
          </Button>
          <Button color="inherit" component={NavLink} to="history">
            訂單
          </Button>
        </Toolbar>
      </AppBar>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default Layout;
