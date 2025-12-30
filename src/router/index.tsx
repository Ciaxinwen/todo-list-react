import { createBrowserRouter, Navigate } from "react-router";
import { Home } from "@/pages/home";
import { List } from "@/pages/list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/list",
    element: <List />,
  },
]);
