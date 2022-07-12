// react imports
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// twin.macro import
import GlobalStyles from "./styles/GlobalStyles";

// app imports
import App from "./App";
import IndexPage from "./pages/IndexPage";
import AccountIndex from "./pages/account/AccountIndex";
import ShopIndex from "./pages/shop/ShopIndex";
import OrdersIndex from "./pages/orders/OrdersIndex";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<IndexPage />} />
          <Route path="/account" element={<AccountIndex />} />
          <Route path="/shop" element={<ShopIndex />} />
          <Route path="/orders" element={<OrdersIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
