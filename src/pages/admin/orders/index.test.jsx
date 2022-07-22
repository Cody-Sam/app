import { describe, expect, test } from "vitest";
import Orders from "./index";
import OrderIndex from "./OrderIndex";
import ProcessOrder from "./ProcessOrder";

describe("Orders Pages", () => {
  test("returns account index by default", () => {
    expect(Orders().type).toEqual(OrderIndex);
  });
  test("Orders.Index returns OrderIndex", () => {
    expect(Orders.Index.type).toEqual(OrderIndex.type);
  });
  test("Orders.Index returns OrderIndex", () => {
    expect(Orders.Process.type).toEqual(ProcessOrder.type);
  });
});
