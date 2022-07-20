import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/Sidebar";
import ContentWrapper from "components/ContentWrapper";
import TopBar from "components/TopBar";

function Layout() {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative min-h-screen text-white">
      <div className="relative flex h-screen bg-black">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <TopBar sidebarOpen={sidebarOpen} />
        <ContentWrapper.Page
          onClick={() => setSidebarOpen(false)}
          focus={!sidebarOpen}
        >
          <Outlet />
        </ContentWrapper.Page>
      </div>
    </div>
  );
}

export default Layout;
