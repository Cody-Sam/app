import { vi, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductIndex from "./ProductIndex";
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

describe("Product Index", () => {
  window.fetch = () => {
    return {
      json: () => {
        return [{ _id: "62d56996a7fc8cb8da8b873f", name: "Product Name" }];
      },
    };
  };

  test("should render", async () => {
    await act(async () => {
      render(
        <TestRouter>
          <UserContext.Provider value={{ userStore: {} }}>
            <ProductIndex />
          </UserContext.Provider>
        </TestRouter>
      );
    });
    expect(await screen.findByText("Product Name")).toBeDefined();
  });
});
