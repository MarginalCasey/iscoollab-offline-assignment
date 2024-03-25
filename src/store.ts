import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./stores/shoppingCartSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const reducer = {
  shoppingCart: shoppingCartReducer,
};

const store = configureStore({
  reducer,
});

export function setupStore(preloadedState?: RootState) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

export default store;
