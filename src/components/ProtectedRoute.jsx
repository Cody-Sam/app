import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {}

function LoggedIn({ user, children }) {
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return children ? children : <Outlet />;
}

function Admin({ user, children }) {
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!user.admin) {
    return <Navigate to={-1} replace />;
  }
  return children ? children : <Outlet />;
}

ProtectedRoute.LoggedIn = LoggedIn;
ProtectedRoute.Admin = Admin;

export default ProtectedRoute;
