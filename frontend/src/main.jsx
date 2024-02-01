import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/products/ProductsPage";
import ManufacturersPage from "./pages/ManufacturersPage";
import SantaListPage from "./pages/products/SantaListPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/user/SignUpPage";
import LoginPage from "./pages/user/LogInPage";
import OrdersPage from "./pages/products/OrdersPage";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/produits",
        children: [
          {
            path: "",
            element: <ProductsPage />,
            loader: () =>
              axios.get(`${apiUrl}/api/products/`).then((res) => res.data),
          },
          {
            path: "listenoel",
            element: <SantaListPage />,
          },
          {
            path: "commandes",
            element: <OrdersPage />,
            loader: () =>
              axios.get(`${apiUrl}/api/orders/`).then((res) => res.data),
          },
          {
            path: "fabricants",
            element: <ManufacturersPage />,
            loader: () =>
              axios.get(`${apiUrl}/api/manufacturers/`).then((res) => res.data),
          },
        ],
      },
      {
        path: "/profil",
        children: [
          {
            path: "inscription",
            element: <SignUpPage />,
          },
          {
            path: "connexion",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
