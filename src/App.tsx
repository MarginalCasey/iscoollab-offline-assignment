import type { Cart } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import localforage from "localforage";
import { useEffect } from "react";
import "./App.css";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "./hooks/redux";
import History from "./pages/History";
import Menu from "./pages/Menu";
import ShoppingCart from "./pages/ShoppingCart";
import { init, selectShoppingCart } from "./stores/shoppingCartSlice";

const queryClient = new QueryClient();

function App() {
  const shoppingCart = useSelector(selectShoppingCart);
  const dispatch = useDispatch();

  useEffect(() => {
    localforage.getItem<Cart>("shoppingCart").then((value) => {
      if (value) {
        dispatch(init(value));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    localforage.setItem<Cart>("shoppingCart", shoppingCart);
  }, [shoppingCart]);

  const router = createHashRouter([
    {
      path: "/",
      element: <Navigate to="/menu" replace />,
    },
    {
      path: "/",
      element: <Layout shoppingCart={shoppingCart} />,
      children: [
        {
          path: "menu",
          element: <Menu />,
        },
        {
          path: "cart",
          element: <ShoppingCart />,
        },
        {
          path: "history",
          element: <History />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
