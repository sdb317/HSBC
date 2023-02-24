/* global console */
/* eslint-disable no-console */

// jest --silent --watch BaseStoreWithHTTP

import BaseStoreWithHTTP from "./BaseStoreWithHTTP";

describe("testBaseStoreWithHTTP", () => {
  const name = "Item";
  let store; // For tests

  beforeAll(() => {
    store = new BaseStoreWithHTTP(null, name);
  });

  beforeEach(() => {
  });

  test("constructor", () => { // .only .skip
    let test = 1;
    test &= (store.getItemTypeLowerCase() == "item");
    expect(test > 0).toBe(true);
  });

  test("push", () => {
    let test = 1;
    store.items.push(name);
    test &= (store.items.length > 0);
    test &= (store.items[0] == name);
    expect(test > 0).toBe(true);
  });

  afterAll(() => {
  });

  afterEach(() => {
  });
});

