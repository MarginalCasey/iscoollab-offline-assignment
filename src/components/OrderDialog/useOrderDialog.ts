import { useDispatch } from "@/hooks/redux";
import { addItem, updateItem } from "@/stores/shoppingCartSlice";
import type { Cart, Order } from "@/types";
import { useState } from "react";

function useOrderDialog(shoppingCart: Cart) {
  const dispatch = useDispatch();

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
    if (editMode) {
      dispatch(
        updateItem({
          index: selectedCartItemIndex,
          item: order,
        })
      );
    } else {
      dispatch(addItem(order));
    }
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
