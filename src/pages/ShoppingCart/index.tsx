import OrderDialog from "@/components/OrderDialog";
import useOrderDialog from "@/components/OrderDialog/useOrderDialog";
import checkout from "@/providers/checkout";
import fetchMenu from "@/providers/fetchMenu";
import type { Menu } from "@/providers/fetchMenu/types";
import type { Cart } from "@/types";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { create } from "mutative";
import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Item,
  ItemAction,
  ItemDetail,
  ItemInfo,
  ItemName,
  PurchaseButton,
  PurchaseDetail,
  Section,
  Title,
  Total,
} from "./index.style";

interface CartProps {
  shoppingCart: Cart;
  setShoppingCart: Dispatch<SetStateAction<Cart>>;
}

function ShoppingCart({ shoppingCart, setShoppingCart }: CartProps) {
  const navigate = useNavigate();
  const { isFetching, data } = useQuery<Menu>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });
  const checkoutMutation = useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      setShoppingCart([]);
      navigate("/history");
    },
  });

  const {
    selectedProductId,
    selectedOrder,
    openOrderDialog,
    closeOrderDialog,
    submitOrderDialog,
  } = useOrderDialog(shoppingCart, setShoppingCart);

  if (shoppingCart.length === 0) return <Section>購物車內容為空</Section>;
  if (isFetching) return null;

  const { products, adjusts, options } = data as Menu;
  const totalProductAmount = shoppingCart.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const totalProductPrice = shoppingCart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);

  const deleteCartItem = (index: number) => () => {
    setShoppingCart(
      create(shoppingCart, (draft) => {
        draft.splice(index, 1);
      })
    );
  };

  const submit = () => {
    checkoutMutation.mutate(shoppingCart);
  };

  return (
    <Container>
      <Section>
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
                  .concat(`$${item.totalPrice}`)
                  .concat(`${item.amount}份`)
                  .join(" / ")}
              </ItemDetail>
            </ItemInfo>
            <ItemAction>
              <Button
                onClick={openOrderDialog(item.id, index)}
                disabled={checkoutMutation.isPending}
              >
                編輯
              </Button>
              <Button
                onClick={deleteCartItem(index)}
                disabled={checkoutMutation.isPending}
              >
                刪除
              </Button>
            </ItemAction>
          </Item>
        ))}
      </Section>
      <Section>
        <Title>訂單匯總</Title>
        <PurchaseDetail>
          <div>商品 * {totalProductAmount}</div>
          <div>${totalProductPrice}</div>
        </PurchaseDetail>
        <Total>
          <div>應付金額</div>
          <div>${totalProductPrice}</div>
        </Total>
      </Section>
      <PurchaseButton
        variant="contained"
        size="large"
        fullWidth
        onClick={submit}
        disabled={checkoutMutation.isPending}
      >
        完成付款並購買
      </PurchaseButton>
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
