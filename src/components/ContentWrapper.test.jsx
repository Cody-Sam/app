import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ContentWrapper from "./ContentWrapper";

describe("ContentWrapper", () => {
  test("Should render nothing itself", () => {
    render(<ContentWrapper>Content</ContentWrapper>);
    expect(screen.queryByText(/Content/i)).toBeNull();
  });
});

describe("ContentWrapper.Page", () => {
  test("Should render any children supplied", () => {
    render(<ContentWrapper.Page>Content</ContentWrapper.Page>);
    expect(screen.getByText(/Content/i)).toBeDefined();
  });
  test("Should not render overlay if focused", () => {
    render(
      <ContentWrapper.Page focus={true}>
        <p>Content</p>
      </ContentWrapper.Page>
    );
    expect(screen.queryByTestId("overlay")).toBeNull();
  });
  test("Should render overlay if not focused", () => {
    render(
      <ContentWrapper.Page focus={false}>
        <p>Content</p>
      </ContentWrapper.Page>
    );
    expect(screen.getByTestId("overlay")).toBeDefined();
  });
});

describe("ContentWrapper.Flex", () => {
  test("Should render any children", () => {
    render(
      <ContentWrapper.Flex>
        <p>content</p>
      </ContentWrapper.Flex>
    );
    expect(screen.getByText("content")).toBeDefined();
  });
});

describe("ContentWrapper.Grid", () => {
  test("Should render any children", () => {
    render(
      <ContentWrapper.Grid>
        <p>content</p>
      </ContentWrapper.Grid>
    );
    expect(screen.getByText("content")).toBeDefined();
  });
});
