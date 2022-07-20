import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/Sidebar";
import ContentWrapper from "components/ContentWrapper";

function Layout() {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative min-h-screen text-white">
      <div className="relative flex h-screen bg-black">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="w-full flex-1 h-[49px] border-b bg-slate-500 z-50">
          PC Builder
          {!sidebarOpen && (
            <input className="w-full" placeholder="Search Terms"></input>
          )}
        </div>
        <ContentWrapper.Page focus={!sidebarOpen}>
          <Outlet />
        </ContentWrapper.Page>
      </div>
    </div>
  );
}

export default Layout;
