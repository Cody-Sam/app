import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountIndex from "./AccountIndex";
import { UserContext } from "modules/user";

describe("Account Index Page", () => {
  test("Should render", () => {
    render(
      <UserContext.Provider
        value={{
          userStore: { user: {} },
          userDispatch: () => {
            console.log(1);
          },
        }}
      >
        <AccountIndex />
      </UserContext.Provider>
    );
    expect(screen.getByText("This is your account page")).toBeDefined();
  });
});
