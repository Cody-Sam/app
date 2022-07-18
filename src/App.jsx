import { useState, useEffect, useReducer } from "react";
import { Outlet, Link } from "react-router-dom";
import "./index.css";

import Sidebar from "./components/Sidebar";
import ContentWrapper from "./components/ContentWrapper.jsx";
import { UserContext, userReducer } from "./modules/User";

function App({admin = false}) {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  const [userStore, userDispatch] = useReducer(userReducer, {
    status:"noUser",
    user: null,
    token: sessionStorage.getItem("token")
  });

  
  useEffect(() => {
    const fetchUser = async () => {
      let token = userStore.token;
      if (token) {
        userDispatch({type:"setStatus", data:{status:"authorising"}})
        const res = await fetch("http://localhost:4000/api/v1/users/me", {
          headers: { authorization: "Bearer " + token },
        });
        const user = await res.json();
        userDispatch({ type: "login", data: { user, token } });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      <div className="relative flex h-screen bg-black">
        <UserContext.Provider value={{ userStore, userDispatch }}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <ContentWrapper.Page>
            <Outlet />
          </ContentWrapper.Page>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
