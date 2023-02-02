import { readFileSync, writeFileSync } from "fs";
const METADATA_PATH =
  "/media/tarikwaleed/Data/iti/NODEJS/iti-nodejs-labs/assignment1/metadata.json";
const DB_PATH =
  "/media/tarikwaleed/Data/iti/NODEJS/iti-nodejs-labs/assignment1/db.json";

function getNextId() {
  var metadata = readFileSync(METADATA_PATH);
  var json = JSON.parse(metadata);
  return parseInt(json.todo_count) + 1;
}
function initializeDBFile() {
  // initialize the file with an empty array
  // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
  writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}
function initializeMetaDataFile() {
  // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
  writeFileSync(METADATA_PATH, JSON.stringify({ todo_count: 0 }, null, 2));
}

function addTodo(todo) {
  //Read
  var fileContent = readFileSync(DB_PATH);
  //Parse
  var fileContentAsJSON = JSON.parse(fileContent);
  //Push
  fileContentAsJSON.push(todo);
  //Write
  try {
    // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
    writeFileSync(DB_PATH, JSON.stringify(fileContentAsJSON, null, 2));
    var metadata = readFileSync(METADATA_PATH);
    var json = JSON.parse(metadata);
    json.todo_count += 1;
    try {
      // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
      writeFileSync(METADATA_PATH, JSON.stringify(json, null, 2));
    } catch (error) {
      console.log("ERROR, not appended");
    }
  } catch (err) {
    console.log("ERROR, not appended");
  }
}

// Both will just run once
// initializeMetaDataFile();
// initializeDBFile();
var args = process.argv;
var operation = args[2];
switch (operation) {
  case "add":
    var title = args[3].split("=")[1];
    var content = args[4].split("=")[1];
    var todo = {
      id: getNextId(),
      title: title,
      content: content,
      checked: true,
    };
    addTodo(todo);

    break;
  case "remove":
    console.log("remove");

    break;
  case "check":
    console.log("check");

    break;
  case "list":
    console.log("list");

    break;
  case "edit":
    console.log("edit");

    break;
  case "unckeck":
    console.log("unckeck");

    break;

  default:
    console.log("unknown operation");
    break;
}
