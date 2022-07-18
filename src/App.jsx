import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import "./index.css";

import { UserContext, userReducer } from "./modules/User";
import Layout from "components/Layout";
import ProtectedRoute from "components/ProtectedRoute";

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
    status: sessionStorage.getItem("token") ? "pending" :"unauthenticated",
    user: null,
    token: sessionStorage.getItem("token"),
  });

  useEffect(() => {
    console.log("checking auth")
    const fetchUser = async () => {
      let token = userStore.token;
      if (token) {
        userDispatch({ type: "setStatus", data: { status: "pending" } });
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
            <Route
              path="account"
              element={<ProtectedRoute.LoggedIn user={userStore.user} status={userStore.status} />}
            >
              <Route index element={<Account />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="admin"
              element={<ProtectedRoute.Admin user={userStore.user} status={userStore.status} />}
            >
              <Route index element={<Admin />} />
              <Route path="products">
                <Route index element={<Admin.Products />} />
                <Route path="new" element={<Admin.Products.New />} />
              </Route>
            </Route>

            {/* Auth Routes */}
            <Route
              path="auth"
              element={
                <ProtectedRoute.LoggedIn
                  user={userStore.user}
                  status={userStore.status}
                  authRequired={false}
                />
              }
            >
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
            <Route
              path="orders"
              element={
                <ProtectedRoute.LoggedIn>
                  <Orders />
                </ProtectedRoute.LoggedIn>
              }
            />

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
