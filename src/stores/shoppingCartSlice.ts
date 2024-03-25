import type { RootState } from "@/store";
import type { Cart, Order } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import isEqual from "lodash.isequal";

interface ShoppingCartState {
  value: Cart;
}

const initialState: ShoppingCartState = {
  value: [],
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Cart>) => {
      const shoppingCart = action.payload;
      state.value = shoppingCart;
    },
    addItem: (state, action: PayloadAction<Order>) => {
      const newItem = action.payload;

      const indexOfIdenticalOrder = state.value.findIndex(
        (item) =>
          item.id === newItem.id && isEqual(item.adjusts, newItem.adjusts)
      );

      if (indexOfIdenticalOrder === -1) {
        state.value.push(newItem);
      } else {
        state.value[indexOfIdenticalOrder].amount += newItem.amount;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.value.splice(index, 1);
    },
    updateItem: (
      state,
      action: PayloadAction<{ index: number; item: Order }>
    ) => {
      const { index, item } = action.payload;
      state.value[index] = item;
    },
    clear: (state) => {
      state.value = [];
    },
  },
});

export const { init, addItem, removeItem, updateItem, clear } =
  shoppingCartSlice.actions;

export const selectShoppingCart = (state: RootState) =>
  state.shoppingCart.value;

export default shoppingCartSlice.reducer;
