///////////////////////////////////////////////////////////
// File        : BaseStore.js
// Description : 

// Imports : 

import { observable } from "mobx";

// Class Definition
export default
class BaseStore {
// Attributes
  mediator;
  itemType;
  @observable items = [];

// Constructor
  constructor(mediator,itemType) {
    this.mediator = mediator;
    this.itemType = itemType;
  }


// Operations
  getItemType() {
    return this.itemType;
  }

  getItemListType() {
    return `${this.getItemType()}s`; // Plural
  }

  getItemTypeLowerCase() {
    if ((typeof this.itemType === "undefined") || (!this.itemType.length)) {
      throw("No 'itemType'");
    } else {
      return this.itemType.toLowerCase();
    }
  }

  getItemListTypeLowerCase() {
    return this.getItemListType().toLowerCase(); // Plural
  }


}

// Exports

