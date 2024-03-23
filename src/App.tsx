import type { Cart } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Menu from "./pages/Menu";

const queryClient = new QueryClient();

function App() {
  const [shoppingCart, setShoppingCart] = useState<Cart>([]);

  const router = createBrowserRouter([
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
          element: (
            <Menu
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          ),
        },
        {
          path: "cart",
          element: <div>cart</div>,
        },
        {
          path: "history",
          element: <div>history</div>,
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
