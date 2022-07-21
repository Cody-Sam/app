import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdMenuOpen,
  MdStore,
  MdAccountBox,
  MdShoppingCart,
  MdDesktopWindows,
  MdReceipt,
  MdLogin,
  MdLogout,
  MdProductionQuantityLimits,
  MdAdminPanelSettings,
  MdHome,
  MdLocalPostOffice,
  MdStars,
} from "react-icons/md";
import { UserContext } from "modules/user";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { userStore, userDispatch } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const admin = location.pathname.split("/")[1] == "admin";

  function MenuItem({ name, children, path }) {
    return (
      <NavLink
        className={({ isActive }) => (isActive ? "text-green-500" : "")}
        to={path}
        onClick={() => sidebarOpen && setSidebarOpen(!sidebarOpen)}
      >
        <div className={`flex w-full`}>
          {children}
          {sidebarOpen && <span className="pl-2 my-auto">{name}</span>}
        </div>
      </NavLink>
    );
  }

  function MenuLogOut({ children }) {
    return (
      <div className={`flex w-full`}>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              userDispatch({ type: "logout" });
            }
          }}
        >
          {children}
        </button>
        {sidebarOpen && <span className="pl-2 my-auto">Log Out</span>}
      </div>
    );
  }

  function SidebarToggle() {
    return (
      <div className="flex">
        <button
          onClick={(e) => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          {sidebarOpen ? (
            <div className="flex">
              <MdMenuOpen size={"3rem"} />
              <p className="my-auto">Close Menu</p>
            </div>
          ) : (
            <MdMenu size={"3rem"} />
          )}
        </button>
      </div>
    );
  }

  function NavGroup({ children }) {
    return (
      <div className={`flex flex-wrap content-start px-2 py-4 gap-4`}>
        {children}
      </div>
    );
  }

  function StoreNavLinks() {
    return (
      <>
        <MenuItem name="Home" path="/">
          <MdHome size="2em" />
        </MenuItem>
        <MenuItem name="Build A PC" path="build">
          <MdDesktopWindows size="2em" />
        </MenuItem>
        <MenuItem name="Shop" path="shop">
          <MdStore size="2em" />
        </MenuItem>
        {!(userStore.user && userStore.user.admin) && (
          <MenuItem name="Shopping Cart" path="cart">
            <MdShoppingCart size="2em" />
          </MenuItem>
        )}
      </>
    );
  }

  function AdminNavLinks() {
    return (
      <>
        <MenuItem name="Home" path="/">
          <MdHome size="2em" />
        </MenuItem>
        <MenuItem name="Products" path="admin/products">
          <MdProductionQuantityLimits size="2em" />
        </MenuItem>
        <MenuItem name="Orders" path="admin/orders">
          <MdLocalPostOffice size="2em" />
        </MenuItem>
      </>
    );
  }

  function AccountNavLinks() {
    return (
      <>
        <MenuItem name="Account" path="account">
          <MdAccountBox size="2em" />
        </MenuItem>
        {userStore.user.admin && (
          <MenuItem name="Admin" path="admin">
            <MdAdminPanelSettings size="2em" />
          </MenuItem>
        )}
        {!userStore.user.admin && (
          <>
            <MenuItem name="Wishlist" path="wishlist">
              <MdStars size="2em" />
            </MenuItem>
            <MenuItem name="Orders" path="orders">
              <MdReceipt size="2em" />
            </MenuItem>
          </>
        )}

        <MenuLogOut className={"pt-4"}>
          <MdLogout size="2em" />
        </MenuLogOut>
      </>
    );
  }

  return (
    <div
      id="sidebar"
      className={`${sidebarOpen ? "w-52" : "w-12"} bg-gray-600 z-50`}
    >
      <div className="flex-col divide-y h-full w-full">
        <SidebarToggle />
        <NavGroup>{admin ? <AdminNavLinks /> : <StoreNavLinks />}</NavGroup>
        <NavGroup>
          {userStore.user ? (
            <AccountNavLinks />
          ) : (
            <MenuItem name="Log In" path="/auth/login">
              <MdLogin size="2em" />
            </MenuItem>
          )}
        </NavGroup>
      </div>
    </div>
  );
}

export default Sidebar;
