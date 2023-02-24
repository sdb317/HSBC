/* global console */
/* eslint-disable no-console */

// jest --silent --watch OptionsStore

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "../_globals"
import EntityTypes from "../Tests/EntityTypes.json";

let mockAdapter;
if (!parseInt(process.env.JEST_AXIOS)) { // set JEST_AXIOS=1 # Uses real REST api
  console.log("Mocking Axios...");
  mockAdapter = new MockAdapter(axios);
} else {
  mockAdapter = new MockAdapter();
}
const id = 1;
mockAdapter
  .onGet("/api/v1/options/datacolumn/types/")
  .reply(200, EntityTypes)
  ;

import DataColumnTypeStore from "./DataColumnTypeStore"; // ...is derived from OptionsStore
class Mediator { // For mocks
  initialisation = [];
  activeQuery = {queryStore: {}};
}

describe("testOptionsStore", () => {
  let store; // For tests

  beforeAll(() => {
    store = new DataColumnTypeStore(new Mediator());
  });

  beforeEach(() => {
  });

  test("constructor", () => { // .only .skip
    expect(typeof store.items != "undefined").toBe(true);
  });

  test("get", () => {
    expect.assertions(1);
    return store.get().then(() => expect(store.items != "undefined").toBe(true));
  });

  afterAll(() => {
  });

  afterEach(() => {
  });
});

