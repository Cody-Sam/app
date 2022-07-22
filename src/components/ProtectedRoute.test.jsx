import { vi, describe, expect, test, vitest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserContext } from "modules/user";
import * as ReactRouterDom from "react-router-dom";

vi.mock("react-router-dom", () => {
  const Navigate = vi.fn();
  return { Navigate };
});

import ProtectedRoute from "./ProtectedRoute";

describe("ProtectedRoute", () => {
  test("Should not render anything by itself", () => {
    render(
      <UserContext.Provider
        value={{
          userStore: {},
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <ProtectedRoute>
          <p>content</p>
        </ProtectedRoute>
      </UserContext.Provider>
    );
    expect(screen.queryByText("content")).toBeNull();
  });
});

describe("ProtectedRoute.LoggedIn", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should redirect if not logged in and auth required", () => {
    const spy = vi.spyOn(ReactRouterDom, "Navigate");
    render(
      <UserContext.Provider
        value={{
          userStore: {},
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <ProtectedRoute.LoggedIn authRequired={true}>
          <p>content</p>
        </ProtectedRoute.LoggedIn>
      </UserContext.Provider>
    );
    expect(spy).toBeCalledWith({ replace: true, to: "/auth/login" }, {});
  });
  test("Should redirect if logged in and auth not required", () => {
    const spy = vi.spyOn(ReactRouterDom, "Navigate");
    render(
      <UserContext.Provider
        value={{
          userStore: { user: {} },
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <ProtectedRoute.LoggedIn user={{ name: "test" }} authRequired={false}>
          <p>content</p>
        </ProtectedRoute.LoggedIn>
      </UserContext.Provider>
    );
    expect(spy).toBeCalledWith({ replace: true, to: "/account" }, {});
  });
  test("Should render content if logged in and auth required", () => {
    render(
      <UserContext.Provider
        value={{
          userStore: { user: {} },
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <ProtectedRoute.LoggedIn user={{ name: "test" }} authRequired={true}>
          <p>content</p>
        </ProtectedRoute.LoggedIn>
      </UserContext.Provider>
    );
    expect(screen.getByText("content")).toBeDefined();
  });
  test("Should render content if not logged in and no auth required", () => {
    render(
      <UserContext.Provider
        value={{
          userStore: { user: {} },
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <ProtectedRoute.LoggedIn user={null} authRequired={false}>
          <p>content</p>
        </ProtectedRoute.LoggedIn>
      </UserContext.Provider>
    );
    expect(screen.getByText("content")).toBeDefined();
  });
});

describe("ProtectedRoute.Admin", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should redirect if not logged in", () => {
    const spy = vi.spyOn(ReactRouterDom, "Navigate");
    render(
      <UserContext.Provider
        value={{
          userStore: {},
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <ProtectedRoute.Admin>
          <p>content</p>
        </ProtectedRoute.Admin>
      </UserContext.Provider>
    );
    expect(spy).toBeCalledWith({ replace: true, to: "/auth/login" }, {});
  });

  test("Should redirect back if logged in and not an admin", () => {
    const spy = vi.spyOn(ReactRouterDom, "Navigate");
    render(
      <UserContext.Provider
        value={{
          userStore: {},
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <ProtectedRoute.Admin user={{ name: test, admin: false }}>
          <p>content</p>
        </ProtectedRoute.Admin>
      </UserContext.Provider>
    );
    expect(spy).toBeCalledWith({ to: -1, replace: true }, {});
  });

  test("Should render content if logged in and user is admin", () => {
    render(
      <UserContext.Provider
        value={{
          userStore: { user: {} },
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <ProtectedRoute.Admin
          user={{ name: "test", admin: true }}
          authRequired={true}
        >
          <p>content</p>
        </ProtectedRoute.Admin>
      </UserContext.Provider>
    );
    expect(screen.getByText("content")).toBeDefined();
  });
});
