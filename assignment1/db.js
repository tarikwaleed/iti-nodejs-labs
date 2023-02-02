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
  writeFileSync(DB_PATH, JSON.stringify([]));
}
function initializeMetaDataFile() {
  writeFileSync(METADATA_PATH, JSON.stringify({ todo_count: 0 }));
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
    writeFileSync(DB_PATH, JSON.stringify(fileContentAsJSON));
    var metadata = readFileSync(METADATA_PATH);
    var json = JSON.parse(metadata);
    json.todo_count += 1;
    try {
      writeFileSync(METADATA_PATH, JSON.stringify(json));
    } catch (error) {
      console.log("ERROR, not appended");
    }
  } catch (err) {
    console.log("ERROR, not appended");
  }
}
// var todo = {
//   id: getNextId(),
//   title: "first todo",
//   content: "this is my very todo in the app",
//   checked: true,
// };

// Both will just run once
// initializeMetaDataFile();
// initializeDBFile();
// addTodo(todo)
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
