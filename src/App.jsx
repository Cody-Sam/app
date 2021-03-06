import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import "./index.css";

import { UserContext, userReducer, fetchUser } from "modules/user";
import Layout from "components/Layout";
import TopBarContext from "modules/topBar";
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

import WishList from "./pages/wishlist/WishList";

function App() {
  const [userStore, userDispatch] = useReducer(userReducer, {
    status: sessionStorage.getItem("token") ? "pending" : "unauthenticated",
    user: null,
    token: sessionStorage.getItem("token"),
  });
  const [topBarContent, setTopBarContent] = useState({
    title: "PC Builder 9001",
    searchBar: false,
  });
  const [topBarSearchValue, setTopBarSearchValue] = useState("");

  useEffect(() => {
    fetchUser(userStore, userDispatch);
  }, []);

  return (
    <TopBarContext.Provider
      value={{
        topBarContent,
        setTopBarContent,
        topBarSearchValue,
        setTopBarSearchValue,
      }}
    >
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
                element={
                  <ProtectedRoute.LoggedIn
                    user={userStore.user}
                    status={userStore.status}
                  />
                }
              >
                <Route index element={<Account />} />
              </Route>

              {/* Admin Routes */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute.Admin
                    user={userStore.user}
                    status={userStore.status}
                  />
                }
              >
                <Route index element={<Admin />} />
                <Route path="products">
                  <Route index element={<Admin.Products />} />
                  <Route path="new" element={<Admin.Products.New />} />
                  <Route path="edit/:item" element={<Admin.Products.Edit />} />
                </Route>

                <Route path="orders">
                  <Route index element={<Admin.Orders />} />
                  <Route path=":orderID" element={<Admin.Orders.Process />} />
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
                <Route path="item/:item" element={<Shop.Item build={true} />} />
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
                  <ProtectedRoute.LoggedIn
                    user={userStore.user}
                    status={userStore.status}
                  />
                }
              >
                <Route index element={<Orders />} />
                <Route path=":id" element={<Orders.Show />} />
              </Route>

              <Route path="wishlist" element={<WishList />} />

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
    </TopBarContext.Provider>
  );
}

export default App;
