import { useState } from "react";
import {Outlet, Link} from "react-router-dom"
import tw from "twin.macro";
import "./index.css";

import Sidebar from "./components/Sidebar";
import ContentWrapper from "./components/ContentWrapper.jsx";


function App() {
  let [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="relative min-h-screen text-white">
        <div className="relative flex h-screen bg-black">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        </div>
    </div>
  );
}

export default App;
