import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("App should render", () => {
    render(<App />);
    expect(screen.getByTestId("app")).toBeDefined();
  });
});
