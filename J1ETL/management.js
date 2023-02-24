// node .\_tools\Management\management.js <Command> <Args...>

// import URL  from "url";
// const isURL = (s) => {
//   try {
//     new URL(s);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };
const isURL = (s) => {
  if (s.indexOf("http") == 0) {
    return true;
  } else {
    return false;
  }
};
import fs from "fs";

import SourceAPI from "./SourceAPI.js";
import SourceFile from "./SourceFile.js";
import Type from "./Type.js";
import RecursionFactoryForTreeConsole from "./RecursionFactoryForTreeConsole.js";
import RecursionFactoryForExtract from "./RecursionFactoryForExtract.js";
import Template from "./Template.js";
import Fragment from "./Fragment.js";
import Asset from "./Asset.js";

try {
  let i = 2; // First argument
  const command = process.argv[i++];
  if (typeof command === "undefined") {
    throw "Invalid arguments";
  }
  const resource = process.argv[i++];
  if (typeof resource === "undefined") {
    throw "Invalid arguments";
  }
  let source;
  if (fs.existsSync(resource)) {
    source = new SourceFile(resource);
    // console.log("SourceFile");
  } else {
    if (isURL(resource)) {
      source = new SourceAPI(resource, process.env.API_KEY);
      // console.log("SourceAPI");
    } else {
      throw "Invalid arguments - <resource>";
    }
  }
  // console.log(source.getResource());
  // source = new SourceFile(resource);
  switch (command.toLowerCase().substr(0, 2)) { // Switch on the first letter of the command
    case "-m": { // Mapping functions
      const tree = 
        (entity) => {
          const entityId = process.argv[i++];
          if (typeof entityId === "undefined") {
            throw "Invalid arguments";
          }
          const factory = new RecursionFactoryForTreeConsole(source, entity);
          factory.getRecursiveFunction()(Type.createNodeFromId(entity, entityId), "", true);
        }
      switch (command.toLowerCase().substr(2)) { // Switch on the rest of the command
        case "ct": { // Content types
          const entity = new Template();
          tree(entity);
          break;
        }
        case "e": { // Entries
          const entity = new Fragment();
          tree(entity);
          break;
        }
        default:
          throw "Invalid arguments";
      }
      break;
    }
    case "-e": { // Extract functions
      const extract = 
        (entity) => {
          const entityId = process.argv[i++];
          if (typeof entityId === "undefined") {
            throw "Invalid arguments";
          }
          const entityIds = entityId.split(","); // Handles one or a comma-separated list
          const factory = new RecursionFactoryForExtract(source, entity);
          let promises = [];
          for (let i = 0; i < entityIds.length; i++) {
            promises.push(
              factory.getRecursiveFunction()(
                Type.createNodeFromId(entity, entityIds[i])
              )
            );
          }
          Promise.all(promises).then(() => console.log(JSON.stringify(factory.getEntities())));
        }
      switch (command.toLowerCase().substr(2)) { // Switch on the rest of the command
        case "ct": { // Content types
          const entity = new Template();
          extract(entity);
          break;
        }
        case "e": { // Entries
          const entity = new Fragment();
          extract(entity);
          break;
        }
        case "a": { // Assets
          const entity = new Asset();
          extract(entity);
          break;
        }
        default:
          throw "Invalid arguments";
      }
      break;
    }
    default:
      throw "Invalid arguments";
  }
} catch (error) {
  console.error(error);
  console.log("");
  console.log("Arguments are:");
  console.log("");
  console.log("\t-mct <source> <contentTypeId> // Map a content type hierarchy");
  console.log("\t-me <source> <entryId> // Map an entry hierarchy");
  console.log("");
  console.log("\t-ect <source> <contentTypeId(s)> // Extract a list of content types");
  console.log("\t-ee <source> <entryId(s)> // Extract a list of entries, with corresponding content types and assets");
  console.log("\t-ea <source> <assetId(s)> // Extract a list of assets");
}
