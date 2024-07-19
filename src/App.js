// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UpdateItem from "./pages/Update";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import ItemDetail from "./pages/ItemDetail";
import Order from "./pages/Order";
import Invoice from "./pages/Invoice";
import InvoiceDetail from "./pages/InvoiceDetail";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "",
          element: <Homepage />,
        },
        {
          path: "update/:id",
          element: <UpdateItem />,
        },
        {
          path: "add",
          element: <Add />,
        },
        {
          path: "item/:id",
          element: <ItemDetail />,
        },
        {
          path: "order",
          element: <Order />,
        },
        {
          path: "invoices",
          element: <Invoice />,
        },
        {
          path: "invoices/:id",
          element: <InvoiceDetail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
