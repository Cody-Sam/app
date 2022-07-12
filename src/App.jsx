import { useState, useReducer } from "react";
import { Outlet, Link } from "react-router-dom";
import tw from "twin.macro";
import "./index.css";

import Sidebar from "./components/Sidebar";
import ContentWrapper from "./components/ContentWrapper.jsx";
import { UserContext, userReducer } from "./modules/User";


function App() {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  let initialUserState = {user:null, token:null};
  const [userStore, userDispatch] = useReducer(userReducer, initialUserState)
  return (
    <div className="relative min-h-screen text-white">
      <div className="relative flex h-screen bg-black">
        <UserContext.Provider value={{ userStore, userDispatch }} >
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
