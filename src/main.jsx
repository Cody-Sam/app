// react imports
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// app imports
import App from "./App";

//Page Imports
import {
  Index,
  Account,
  Admin,
  Auth,
  Build,
  Cart,
  Orders,
  Shop,
} from "./pages";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<App />}>
          {/* App Index */}
          <Route index element={<Index />} />

          {/* Account Routes */}
          <Route path="account" element={<Account />} />

          {/* Admin Routes */}
          <Route path="admin" >
            <Route index element={<Admin />} />
            <Route path="products">
              <Route index element={<Admin.Products />} />
              <Route path="new" element={<Admin.Products.New />} />
            </Route>
          </Route>

          {/* Auth Routes */}
          <Route path="auth">
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Auth.Login />} />
            <Route path="register" element={<Auth.Register />} />
          </Route>

          {/* Builder Routes */}
          <Route path="build">
            <Route index element={<Build />} />
          </Route>

          {/* Cart And Checkout Routes */}
          <Route path="cart">
            <Route index element={<Cart />} />
            <Route path="checkout">
              <Route index element={<Cart.Checkout />} />
              <Route path="success" element={<Cart.Checkout.Success />} />
              <Route path="failure" element={<Cart.Checkout.Failure />} />
            </Route>
          </Route>

          {/* Orders Routes */}
          <Route path="orders" element={<Orders />} />

          {/* Shop Routes */}
          <Route path="shop">
            <Route index element={<Shop />} />
            <Route path="item/:item" element={<Shop.Item />} />
          </Route>
        </Route>

        {/* End Of Routes */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
