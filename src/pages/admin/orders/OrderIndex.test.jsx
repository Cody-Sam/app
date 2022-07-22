import { vi, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderIndex from "./OrderIndex";
import { UserContext } from "modules/user";
import { act } from "react-dom/test-utils";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function TestRouter({ children }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={children} />
      </Routes>
    </BrowserRouter>
  );
}

describe("Orders Index", () => {
  window.fetch = () => {
    return {
      json: () => {
        return [{ _id: "62d56996a7fc8cb8da8b873f", products: [] }];
      },
    };
  };

  test("should render", async () => {
    await act(async () => {
      render(
        <TestRouter>
          <UserContext.Provider value={{ userStore: {} }}>
            <OrderIndex />
          </UserContext.Provider>
        </TestRouter>
      );
    });
    expect(await screen.findByText("Orders")).toBeDefined();
  });
});
