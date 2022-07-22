import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GlowCard from "./GlowCard";

describe("GlowCard Test", () => {
  test("Should show header when supplied", () => {
    render(
      <GlowCard>
        <GlowCard.Header>Header Text</GlowCard.Header>
      </GlowCard>
    );
    expect(screen.getByText(/Header Text/i)).toBeDefined();
  });
  test("Should show body when supplied", () => {
    render(
      <GlowCard>
        <GlowCard.Body>Body Text</GlowCard.Body>
      </GlowCard>
    );
    expect(screen.getByText(/Body Text/i)).toBeDefined();
  });

  test("Should show footer when supplied", () => {
    render(
      <GlowCard>
        <GlowCard.Footer>Footer Text</GlowCard.Footer>
      </GlowCard>
    );
  });

  test("Should show image when supplied", () => {
    render(
      <GlowCard>
        <GlowCard.Media src="https://picsum.photos/400/400" alt="GlowCard Media" />
      </GlowCard>
    );
    expect(screen.getByAltText(/GlowCard Media/i)).toBeDefined();
  });

  test("Can display with only one child", () => {
    render(
      <GlowCard>
        <GlowCard.Body>Body Text</GlowCard.Body>
      </GlowCard>
    );
    expect(screen.getByText(/Body Text/i)).toBeDefined();
  });

  test("Can display with multiple children", () => {
    render(
      <GlowCard>
        <GlowCard.Media src="https://picsum.photos/400/400" alt="GlowCard Media" />
        <GlowCard.Header>Header Text</GlowCard.Header>
        <GlowCard.Body>Body Text</GlowCard.Body>
        <GlowCard.Footer>Footer Text</GlowCard.Footer>
      </GlowCard>
    );
    expect(screen.getByText(/Header Text/i)).toBeDefined();
    expect(screen.getByText(/Body Text/i)).toBeDefined();
    expect(screen.getByText(/Footer Text/i)).toBeDefined();
    expect(screen.getByAltText(/GlowCard Media/i)).toBeDefined();
  });

  test("Other children are not rendered", () => {
    render(<GlowCard>GlowCard Body</GlowCard>);
    expect(screen.queryByText(/GlowCard Body/i)).toBe(null);
  });
});
