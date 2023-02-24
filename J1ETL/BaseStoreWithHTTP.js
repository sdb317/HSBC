///////////////////////////////////////////////////////////
// File        : BaseStoreWithHTTP.js
// Description : 

// Imports : 

import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const jsonConfig = {
  "Content-Type": "application/json; charset=utf-8"
};

import BaseStore from "./BaseStore";

// Class Definition
export default
class BaseStoreWithHTTP extends BaseStore {
// Attributes

// Constructor
  constructor(mediator,itemType) {
    super(mediator, itemType);
  }


// Operations
  getConfig(baseConfig) {
    let config = {};
    if (typeof baseConfig !== "undefined") {
      config = Object.assign(
        config,
        baseConfig
      );
    }
    const accessToken = localStorage.getItem("token"); // const accessToken = window.a2a.token; // 
    if (accessToken != null) {
      config["Authorization"] = "Bearer " + accessToken;
    }
    return {headers: config};
  }

  checkStatus(response) {
    if (typeof response === "undefined") {
      const message = `HTTP invalid response`;
      console.error(message);
      throw message;
    }
    if (Math.floor(response.status / 100) != 2) {// It failed
      if ((typeof response.data !== "undefined") && (typeof response.data.failure !== "undefined")) {
        const message = `HTTP ${response.status}: ` + response.data["failure"];
        console.error(message);
        throw message;
      }
    }
    else {
      if (typeof response.reported === "undefined") {
        console.info(JSON.stringify(response.data));
        response.reported = true; // Ensure it is only logged once, in the first handler
      }
      return true;
    }
    return false;
  }

  httpGet(URL,delegate=undefined) {
    console.info(`httpGet: ${URL}`);
    let promise = axios.get(URL, this.getConfig());
    if (typeof delegate === "function") {
      promise.then((response) => delegate(response)).catch((error) => console.log(error));
    }
    return promise;
  }

  httpPost(URL,payload,delegate=undefined) {
    console.info(`httpPost: ${URL}`);
    console.info(JSON.stringify(payload));
    let promise = axios.post(URL, payload, this.getConfig(jsonConfig));
    if (typeof delegate === "function") {
      promise.then((response) => delegate(response)).catch((error) => console.log(error));
    }
    return promise;
  }

  httpPut(URL,payload,delegate=undefined) {
    console.info(`httpPut: ${URL}`);
    console.info(JSON.stringify(payload));
    let promise = axios.put(URL, payload, this.getConfig(jsonConfig));
    if (typeof delegate === "function") {
      promise.then((response) => delegate(response)).catch((error) => console.log(error));
    }
    return promise;
  }

  httpDelete(URL,delegate=undefined) {
    console.info(`httpDelete: ${URL}`);
    let promise = axios.delete(URL, this.getConfig(jsonConfig));
    if (typeof delegate === "function") {
      promise.then((response) => delegate(response)).catch((error) => console.log(error));
    }
    return promise;
  }


}

// Exports

