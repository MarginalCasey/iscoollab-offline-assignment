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
  const openOrderDialog = (productId: number) => () => {
    setSelectedProductId(productId);
  };
  const closeOrderDialog = () => {
    setSelectedProductId(undefined);
  };
  const handleSubmitOrderDialog = (order: Order) => {
    setShoppingCart(
      create(shoppingCart, (draft) => {
        const indexOfIdenticalOrder = shoppingCart.findIndex(
          (item) => item.id === order.id && isEqual(item.adjusts, order.adjusts)
        );

        if (indexOfIdenticalOrder === -1) {
          draft.push(order);
        } else {
          draft[indexOfIdenticalOrder].amount += order.amount;
        }
      })
    );
  };

  return {
    selectedProductId,
    openOrderDialog,
    closeOrderDialog,
    handleSubmitOrderDialog,
  };
}

export default useOrderDialog;
