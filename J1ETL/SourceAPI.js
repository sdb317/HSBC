///////////////////////////////////////////////////////////
// File        : SourceAPI.js
// Description : 

// Imports : 

import axios from "axios";

import Source from "./Source.js";

// Class Definition
export default
class SourceAPI extends Source {
// Attributes
  token = "";
  httpConfig = {"Content-Type": "application/json; charset=utf-8"};

// Constructor
  constructor(resource,token) {
    super(resource);
    this.token = token;
    this.async = true;
    if (typeof this.token === "undefined") {
      throw "Invalid API key";
    }
    this.httpConfig["Authorization"] = "Bearer " + this.token;
  }


// Operations
  getNodeData(entity,node) {
    try {
      let url = `${this.getResource()}/${entity.getTypesWithUnderscore()}/${node.getId()}`;
      // console.log(url);
      let promise = axios.get(url, {headers: this.httpConfig});
      promise.catch((error) => Promise.resolve())
      return promise;
    } catch (error) {
      console.error(error);
    }
    return Promise.reject();
  }

  getNodeChildren(entity,node) {
    return super.getNodeChildren(entity,node);
  }


}

// Exports

