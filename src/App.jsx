import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import "./index.css";

import { UserContext, userReducer } from "./modules/User";
import Layout from "components/Layout"

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

function App({ admin = false }) {
  const [userStore, userDispatch] = useReducer(userReducer, {
    status: "noUser",
    user: null,
    token: sessionStorage.getItem("token"),
  });

  useEffect(() => {
    const fetchUser = async () => {
      let token = userStore.token;
      if (token) {
        userDispatch({ type: "setStatus", data: { status: "authorising" } });
        const res = await fetch("http://localhost:4000/api/v1/users/me", {
          headers: { authorization: "Bearer " + token },
        });
        const user = await res.json();
        userDispatch({ type: "login", data: { user, token } });
      }
    };
    fetchUser();
  }, []);



  return (
    <UserContext.Provider value={{ userStore, userDispatch }}>
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Layout />}>
            {/* App Index */}
            <Route index element={<Index />} />

            {/* Account Routes */}
            <Route path="account" element={<Account />} />

            {/* Admin Routes */}
            <Route path="admin">
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
    </UserContext.Provider>
  );
}

export default App;
