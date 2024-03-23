import type { Cart, Order } from "@/types";
import isEqual from "lodash.isequal";
import { create } from "mutative";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

function useOrderDialog(
  shoppingCart: Cart,
  setShoppingCart: Dispatch<SetStateAction<Cart>>
) {
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [selectedCartItemIndex, setSelectedCartItemIndex] = useState<number>();
  const editMode = selectedCartItemIndex !== undefined;

  const openOrderDialog = (productId: number, cartItemIndex?: number) => () => {
    setSelectedProductId(productId);
    setSelectedCartItemIndex(cartItemIndex);
  };
  const closeOrderDialog = () => {
    setSelectedProductId(undefined);
    setSelectedCartItemIndex(undefined);
  };
  const submitOrderDialog = (order: Order) => {
    setShoppingCart(
      create(shoppingCart, (draft) => {
        if (editMode) {
          draft[selectedCartItemIndex] = order;
        } else {
          const indexOfIdenticalOrder = shoppingCart.findIndex(
            (item) =>
              item.id === order.id && isEqual(item.adjusts, order.adjusts)
          );

          if (indexOfIdenticalOrder === -1) {
            draft.push(order);
          } else {
            draft[indexOfIdenticalOrder].amount += order.amount;
          }
        }
      })
    );
  };

  return {
    selectedProductId,
    selectedOrder: editMode ? shoppingCart[selectedCartItemIndex] : undefined,
    openOrderDialog,
    closeOrderDialog,
    submitOrderDialog,
  };
}

export default useOrderDialog;
