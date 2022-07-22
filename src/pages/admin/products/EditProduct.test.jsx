import { vi, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import EditProduct from "./EditProduct";
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

describe("Product Edit", () => {
  window.fetch = () => {
    return {
      json: () => {
        return {
          name: "test",
          description: "test",
          type: "cpu",
          price: 10000,
          quantity: 10,
          compatibility: []
        };
      },
    };
  };

  test("should render", async () => {
    await act(async () => {
      render(
        <TestRouter>
          <UserContext.Provider value={{ userStore: {} }}>
            <EditProduct />
          </UserContext.Provider>
        </TestRouter>
      );
    });
    expect(await screen.findByText("Update Item")).toBeDefined();
  });
});
