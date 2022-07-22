import { vi, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ProcessOrder from "./ProcessOrder";
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
        return { _id: "62d56996a7fc8cb8da8b873f", products: [] };
      },
    };
  };

  test("should render", async () => {
    await act(async () => {
      render(
        <TestRouter>
          <UserContext.Provider value={{ userStore: {} }}>
            <ProcessOrder />
          </UserContext.Provider>
        </TestRouter>
      );
    });
    expect(await screen.findByText("62d569-pleasant-writer-multiply-superstrong-unabashedly-8b873f")).toBeDefined();
  });
});
