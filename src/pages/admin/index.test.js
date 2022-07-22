import { describe, expect, test } from "vitest";
import Admin from "./index";
import AdminIndex from "./AdminIndex";
import Products from "./products";
import Orders from "./orders";

describe("Admin Pages", () => {
  test("returns account index by default", () => {
    expect(Admin().type).toEqual(AdminIndex);
  });
  test("Admin.Index returns AdminIndex", () => {
    expect(Admin.Index.type).toEqual(AdminIndex.type);
  });
  test("Admin.Products returns AdminProducts", () => {
    expect(Admin.Products.type).toEqual(Products.type);
  });
  test("Admin.Orders returns AdminOrders", () => {
    expect(Admin.Orders.type).toEqual(Orders.type);
  });
});
