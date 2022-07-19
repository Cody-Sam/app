import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext, fetchUser } from "modules/user";

function ProtectedRoute() {}

function LoggedIn({ user, status, children, authRequired = true }) {
  const { userStore, userDispatch } = useContext(UserContext);
  useEffect(() => {
    fetchUser(userStore, userDispatch);
  }, []);

  if (status !== "pending") {
    if (!user && authRequired) {
      return <Navigate to="/auth/login" replace />;
    }
    if (user && !authRequired) {
      return <Navigate to="/account" replace />;
    }

    return children ? children : <Outlet />;
  }
}

function Admin({ user, status, children }) {
  const { userStore, userDispatch } = useContext(UserContext);

  useEffect(() => {
    fetchUser(userStore, userDispatch);
  }, []);
  if (status !== "pending") {
    if (!user) {
      return <Navigate to="/auth/login" replace />;
    }
    if (!user.admin) {
      return <Navigate to={-1} replace />;
    }
    return children ? children : <Outlet />;
  }
}

ProtectedRoute.LoggedIn = LoggedIn;
ProtectedRoute.Admin = Admin;

export default ProtectedRoute;
