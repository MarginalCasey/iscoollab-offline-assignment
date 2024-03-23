import OrderDialog from "@/components/OrderDialog";
import useOrderDialog from "@/components/OrderDialog/useOrderDialog";
import fetchMenu from "@/providers/fetchMenu";
import type { Menu } from "@/providers/fetchMenu/types";
import type { Cart } from "@/types";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import { create } from "mutative";
import type { Dispatch, SetStateAction } from "react";
import {
  Container,
  Item,
  ItemAction,
  ItemDetail,
  ItemInfo,
  ItemName,
  Title,
} from "./index.style";

interface CartProps {
  shoppingCart: Cart;
  setShoppingCart: Dispatch<SetStateAction<Cart>>;
}

function ShoppingCart({ shoppingCart, setShoppingCart }: CartProps) {
  const { isFetching, data } = useQuery<Menu>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const {
    selectedProductId,
    selectedOrder,
    openOrderDialog,
    closeOrderDialog,
    submitOrderDialog,
  } = useOrderDialog(shoppingCart, setShoppingCart);

  if (shoppingCart.length === 0) return <Container>購物車內容為空</Container>;
  if (isFetching) return null;

  const { products, adjusts, options } = data as Menu;

  const handleDeleteCartItem = (index: number) => () => {
    setShoppingCart(
      create(shoppingCart, (draft) => {
        draft.splice(index, 1);
      })
    );
  };

  return (
    <Container>
      <Title>購物內容</Title>
      {shoppingCart.map((item, index) => (
        <Item key={index}>
          <ItemInfo>
            <ItemName>{products[item.id].name}</ItemName>
            <ItemDetail>
              {Object.values(item.adjusts)
                .map((adjust) => Object.values(adjust.options))
                .flat()
                .map((option) => {
                  const name = options[option.id].name;
                  const amount = option.amount;
                  return amount > 1 ? `${name}x${amount}` : name;
                })
                .concat(`$${products[item.id].price}`)
                .concat(`${item.amount}份`)
                .join(" / ")}
            </ItemDetail>
          </ItemInfo>
          <ItemAction>
            <Button onClick={openOrderDialog(item.id, index)}>編輯</Button>
            <Button onClick={handleDeleteCartItem(index)}>刪除</Button>
          </ItemAction>
        </Item>
      ))}
      {selectedProductId && (
        <OrderDialog
          products={products}
          adjusts={adjusts}
          options={options}
          productId={selectedProductId}
          currentOrder={selectedOrder}
          onClose={closeOrderDialog}
          onSubmit={submitOrderDialog}
        />
      )}
    </Container>
  );
}

export default ShoppingCart;
