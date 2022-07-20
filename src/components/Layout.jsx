import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/Sidebar";
import ContentWrapper from "components/ContentWrapper";

function Layout() {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative min-h-screen text-white">
      <div className="relative flex h-screen bg-black">
        <Sidebar sidebarOpen={sidebarOpen} setSideBarOpen={setSidebarOpen} />
        <ContentWrapper.Page>
          <Outlet />
        </ContentWrapper.Page>
      </div>
    </div>
  );
}

export default Layout;
