import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ManufacturersPage from "./pages/ManufacturersPage";
import SantaListPage from "./pages/SantaListPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/user/SignUpPage";
import LoginPage from "./pages/user/LogInPage";

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
        element: <ProductsPage />,
        loader: () => fetch(`${apiUrl}/api/products/`),
      },
      {
        path: "/fabricants",
        element: <ManufacturersPage />,
        loader: () => fetch(`${apiUrl}/api/manufacturers/`),
      },
      {
        path: "/listenoel",
        element: <SantaListPage />,
        loader: () => fetch(`${apiUrl}/api/products/`),
      },
      {
        path: "/user",
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
