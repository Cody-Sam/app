import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  MdMenu,
  MdMenuOpen,
  MdStore,
  MdAccountBox,
  MdShoppingCart,
  MdReceipt,
  MdLogout,
} from "react-icons/md";
import { UserContext } from "/src/modules/User";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { userStore, userDispatch } = useContext(UserContext);
  function MenuItem({ name, children, path }) {
    return (
      <div className={`flex w-full`}>
        <NavLink
          className={({ isActive }) => (isActive ? "text-green-500" : "")}
          to={path}
        >
          {children}
        </NavLink>
        {sidebarOpen && <span className="pl-2 my-auto">{name}</span>}
      </div>
    );
  }

  function MenuLogOut({ children }) {
    return (
      <div className={`flex w-full`}>
        <button
          onClick={() => {
            userDispatch({ type: "logout" });
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
            <MdMenuOpen size={"3rem"} />
          ) : (
            <MdMenu size={"3rem"} />
          )}
        </button>
        {sidebarOpen && (
          <NavLink to="/" className="my-auto">
            PC Store
          </NavLink>
        )}
      </div>
    );
  }

  return (
    <div
      id="sidebar"
      className={`${sidebarOpen ? "w-52" : "w-12"} bg-gray-600 z-50`}
    >
      <div className="flex-col divide-y h-full w-full">
        <SidebarToggle />
        <div className={`flex flex-wrap content-start px-2 pt-4 gap-4`}>
          <MenuItem name="Account" path="account">
            <MdAccountBox size="2em" />
          </MenuItem>
          <MenuItem name="Shop" path="shop">
            <MdStore size="2em" />
          </MenuItem>
          <MenuItem name="Shopping Cart" path="cart">
            <MdShoppingCart size="2em" />
          </MenuItem>
          <MenuItem name="Orders" path="orders">
            <MdReceipt size="2em" />
          </MenuItem>
          {userStore.user && (
            <MenuLogOut>
              <MdLogout size="2em" />
            </MenuLogOut>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
