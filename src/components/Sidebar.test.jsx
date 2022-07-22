import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "modules/user";
import Sidebar from "./Sidebar";

function TestRouter({ children }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={children} />
      </Routes>
    </BrowserRouter>
  );
}

global.window.confirm = () => true;

describe("Sidebar", () => {
  test("It should render", () => {
    let sidebarOpen = false;
    let setSidebarOpen = (value) => (sidebarOpen = value);
    render(
      <TestRouter>
        <UserContext.Provider value={{ userStore: { user: {} } }}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </UserContext.Provider>
      </TestRouter>
    );
    expect(screen.getByTitle("sidebar-toggle")).toBeDefined();
  });
  test("It should toggle", () => {
    let sidebarOpen = false;
    let setSidebarOpen = (value) => (sidebarOpen = value);
    render(
      <TestRouter>
        <UserContext.Provider value={{ userStore: { user: {} } }}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </UserContext.Provider>
      </TestRouter>
    );
    expect(sidebarOpen).toBe(false);
    fireEvent(
      screen.getByTitle("sidebar-toggle"),
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    expect(sidebarOpen).toBe(true);
  });
  test("Admin links not shown to an normal user", () => {
    let sidebarOpen = true;
    let setSidebarOpen = (value) => (sidebarOpen = value);
    render(
      <TestRouter>
        <UserContext.Provider value={{ userStore: { user: { admin: false } } }}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </UserContext.Provider>
      </TestRouter>
    );
    expect(screen.queryByText("Admin")).toBeNull();
  });
  test("Admin links shown to an admin user", () => {
    let sidebarOpen = true;
    let setSidebarOpen = (value) => (sidebarOpen = value);
    render(
      <TestRouter>
        <UserContext.Provider value={{ userStore: { user: { admin: true } } }}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </UserContext.Provider>
      </TestRouter>
    );
    expect(screen.getByText("Admin")).toBeDefined();
  });
  test("Admin nav links are not displayed when not at admin path", () => {
    let sidebarOpen = true;
    let setSidebarOpen = (value) => (sidebarOpen = value);
    render(
      <TestRouter>
        <UserContext.Provider value={{ userStore: { user: { admin: true } } }}>
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            adminOveride={false}
          />
        </UserContext.Provider>
      </TestRouter>
    );
    expect(screen.queryByText("Products")).toBeNull();
  });
  test("Admin nav links are displayed at the admin path", () => {
    let sidebarOpen = true;
    let setSidebarOpen = (value) => (sidebarOpen = value);
    render(
      <TestRouter>
        <UserContext.Provider value={{ userStore: { user: { admin: true } } }}>
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            adminOveride={true}
          />
        </UserContext.Provider>
      </TestRouter>
    );
    expect(screen.getByText("Products")).toBeDefined();
  });
  test("Can Log Out", () => {
    let sidebarOpen = true;
    let setSidebarOpen = (value) => (sidebarOpen = value);
    let dispatchResult = {};
    const dispatch = (value) => {
      dispatchResult = value;
    };
    
    render(
      <TestRouter>
        <UserContext.Provider
          value={{
            userStore: { user: { admin: true } },
            userDispatch: dispatch,
          }}
        >
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </UserContext.Provider>
      </TestRouter>
    );
    fireEvent(
      screen.getByText("Log Out"),
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    expect(dispatchResult).toEqual({type:"logout"})
  });
});
