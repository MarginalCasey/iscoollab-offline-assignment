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

  if (shoppingCart.length === 0) return <Container>購物車內容為空</Container>;
  if (isFetching) return null;

  const { products, options } = data as Menu;

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
        <Item key={item.id}>
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
            <Button>編輯</Button>
            <Button onClick={handleDeleteCartItem(index)}>刪除</Button>
          </ItemAction>
        </Item>
      ))}
    </Container>
  );
}

export default ShoppingCart;
