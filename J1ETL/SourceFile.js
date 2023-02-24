///////////////////////////////////////////////////////////
// File        : SourceFile.js
// Description : 

// Imports : 

import fs from "fs";
import jsonpath from "jsonpath";

import Source from "./Source.js";

// Class Definition
export default
class SourceFile extends Source {
// Attributes
  parsedResource = null;

// Constructor
  constructor(resource) {
    super(resource);
    this.parsedResource = JSON.parse(fs.readFileSync(this.getResource(), "utf8"));
  }


// Operations
  getNodeData(entity,node) {
    return jsonpath.value(this.parsedResource, entity.query(node.getId()));
  }

  getNodeChildren(entity,node) {
    return super.getNodeChildren(entity,node);
  }


}

// Exports

