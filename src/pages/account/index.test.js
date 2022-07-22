import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Account from "./index";
import AccountIndex from "./AccountIndex";

describe("Account Pages", () => {
  test("returns account index by default", () => {
    expect(Account().type).toBe(AccountIndex);
  });
  test("Account.Index return AccountIndex",()=>{
    expect(Account().type).toBe(AccountIndex);
  })
});
