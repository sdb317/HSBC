///////////////////////////////////////////////////////////
// File        : Source.js
// Description : 

// Imports : 

import jsonpath from "jsonpath";

// Class Definition
export default
class Source {
// Attributes
  resource = "";
  async = false;

// Constructor
  constructor(resource) {
    this.setResource(resource);
  }


// Operations
  getResource() {
    return this.resource;
  }

  setResource(value) {
    this.resource = value;
  }

  getNodeChildren(entity,node) {
    return jsonpath.query(node, entity.queryChildren());
  }


}

// Exports

