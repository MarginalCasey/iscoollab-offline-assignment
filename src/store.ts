import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./stores/shoppingCartSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
});

export default store;
