import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Test", () => {
  test("Should show header when supplied", () => {
    render(
      <Card>
        <Card.Header>Header Text</Card.Header>
      </Card>
    );
    expect(screen.getByText(/Header Text/i)).toBeDefined();
  });
  test("Should show body when supplied", () => {
    render(
      <Card>
        <Card.Body>Body Text</Card.Body>
      </Card>
    );
    expect(screen.getByText(/Body Text/i)).toBeDefined();
  });

  test("Should show footer when supplied", () => {
    render(
      <Card>
        <Card.Footer>Footer Text</Card.Footer>
      </Card>
    );
  });

  test("Should show image when supplied", () => {
    render(
      <Card>
        <Card.Media src="https://picsum.photos/400/400" alt="Card Media" />
      </Card>
    );
    expect(screen.getByAltText(/Card Media/i)).toBeDefined();
  });

  test("Can display with only one child", () => {
    render(
      <Card>
        <Card.Body>Body Text</Card.Body>
      </Card>
    );
    expect(screen.getByText(/Body Text/i)).toBeDefined();
  });

  test("Can display with multiple children", () => {
    render(
      <Card>
        <Card.Media src="https://picsum.photos/400/400" alt="Card Media" />
        <Card.Header>Header Text</Card.Header>
        <Card.Body>Body Text</Card.Body>
        <Card.Footer>Footer Text</Card.Footer>
      </Card>
    );
    expect(screen.getByText(/Header Text/i)).toBeDefined();
    expect(screen.getByText(/Body Text/i)).toBeDefined();
    expect(screen.getByText(/Footer Text/i)).toBeDefined();
    expect(screen.getByAltText(/Card Media/i)).toBeDefined();
  });

  test("Other children are not rendered", () => {
    render(<Card>Card Body</Card>);
    expect(screen.queryByText(/Card Body/i)).toBe(null);
  });
});
