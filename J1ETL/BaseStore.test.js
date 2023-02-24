/* global console */
/* eslint-disable no-console */

// jest --silent --watch BaseStore

import { reaction } from "mobx";

import BaseStore from "./BaseStore";

describe("testBaseStore", () => {
  const name = "Item";
  let store; // For tests

  beforeAll(() => {
    store = new BaseStore(null, name);
    const lengthReaction = reaction(
      () => store.items.length,
      length => console.info("items.length: " + store.items.length)
    );
  });

  beforeEach(() => {
  });

  test("constructor", () => { // .only .skip
    let test = 1;
    console.info(store.getItemTypeLowerCase());
    console.info(store.getItemListTypeLowerCase());
    console.info(store.getItemType());
    console.info(store.getItemListType());
    test &= ((store.getItemTypeLowerCase() + store.getItemListTypeLowerCase() + store.getItemType() + store.getItemListType()) == "itemitemsItemItems");
    test &= (typeof (store.items) != "undefined");
    expect(test > 0).toBe(true);
  });

  test("push", () => {
    let test = 1;
    store.items.push(name);
    test &= (store.items.length);
    test &= (store.items[0] == name);
    expect(test > 0).toBe(true);
  });

  afterAll(() => {
  });

  afterEach(() => {
  });
});

