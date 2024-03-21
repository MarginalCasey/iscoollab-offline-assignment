import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/menu" replace />,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "menu",
        element: <div>menu</div>,
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
