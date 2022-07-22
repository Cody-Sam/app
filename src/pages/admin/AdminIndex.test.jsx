import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminIndex from "./AdminIndex";
describe("AdminIndex", ()=>{
  test('should render ', () => { 
    render(<AdminIndex />);
    expect(screen.getByText("admin index"))
   })
})