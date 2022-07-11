import { CgMenuGridR, CgShoppingCart, CgUser, CgList } from "react-icons/cg";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  function MenuItem({ name, children }) {
    return (
      <div className={`flex w-full`}>
        <button>{children}</button>
        {sidebarOpen && <span className="pl-2 my-auto">{name}</span>}
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
          <CgMenuGridR size={"3rem"} />
        </button>
        {sidebarOpen && <span className="my-auto">Menu</span>}
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
          <MenuItem name="Account">
            <CgUser size="2em" />
          </MenuItem>
          <MenuItem name="Shop">
            <CgShoppingCart size="2em" />
          </MenuItem>
          <MenuItem name="Orders">
            <CgList size="2em" />
          </MenuItem>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
