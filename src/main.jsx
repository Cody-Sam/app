// react imports
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// twin.macro import
import GlobalStyles from "./styles/GlobalStyles";

// app imports
import App from "./App";

//Page Imports
import Index, {Account, Auth, Cart, Orders, Shop} from "./pages"
const Checkout = Cart.Checkout; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* App Index */}
          <Route index element={<Index />} />

          {/* Account Routes */}
          <Route path="account" element={<Account />} />

          {/* Auth Routes */}
          <Route path="auth">
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Auth.Login />} />
            <Route path="register" element={<Auth.Register />} />
          </Route>

          {/* Cart And Checkout Routes */}
          <Route path="cart">
            <Route index element={<Cart />} />
            <Route path="checkout">
              <Route index element={<Checkout />} />
              <Route path="success" element={<Checkout.Success />} />
              <Route path="failure" element={<Checkout.Failure />} />
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
