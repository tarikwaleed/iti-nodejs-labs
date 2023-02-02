import { readFileSync, writeFileSync } from "fs"
import { arrayBuffer } from "stream/consumers"
const METADATA_PATH =
  "/media/tarikwaleed/Data/iti/NODEJS/iti-nodejs-labs/assignment1/metadata.json"
const DB_PATH =
  "/media/tarikwaleed/Data/iti/NODEJS/iti-nodejs-labs/assignment1/db.json"

function getNextId() {
  return getCurrentId() + 1
}
function getCurrentId() {
  var json = readMetaDataFile()
  return parseInt(json.todo_count)
}
function readMetaDataFile() {
  var metadata = readFileSync(METADATA_PATH)
  return JSON.parse(metadata)
}
function readDBFile() {
  var data = readFileSync(DB_PATH)
  return JSON.parse(data)
}
function initializeDBFile() {
  // initialize the file with an empty array
  // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
  writeFileSync(DB_PATH, JSON.stringify([], null, 2))
}
function initializeMetaDataFile() {
  // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
  writeFileSync(METADATA_PATH, JSON.stringify({ todo_count: 0 }, null, 2))
}
function init() {
  initializeMetaDataFile()
  initializeDBFile()
}
function storeToDB(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}
function storeToMeta(data) {
  writeFileSync(METADATA_PATH, JSON.stringify(data, null, 2))
}

function addTodo(todo) {
  //Read
  var fileContent = readFileSync(DB_PATH)
  //Parse
  var fileContentAsJSON = JSON.parse(fileContent)
  //Push
  fileContentAsJSON.push(todo)
  //Write
  try {
    // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
    writeFileSync(DB_PATH, JSON.stringify(fileContentAsJSON, null, 2))
    var json = readMetaDataFile()
    json.todo_count += 1
    try {
      // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
      writeFileSync(METADATA_PATH, JSON.stringify(json, null, 2))
      console.log("Todo added")
      reAssignIds()
    } catch (error) {
      console.log("ERRO, not appended")
    }
  } catch (err) {
    console.log("ERROR, not appended")
  }
}
function removeTodo(id) {
  if (id > 0 && id <= getCurrentId()) {
    var data = readFileSync(DB_PATH)
    var json = JSON.parse(data)
    // var elementToBeDeleted = (e) => e.id == id;
    // var index = json.findIndex(elementToBeDeleted);
    json.splice(id - 1, 1)
    storeToDB(json)
    console.log("Todo Deleted Successfully")
    var json = readMetaDataFile()
    json.todo_count -= 1
    storeToMeta(json)
    reAssignIds()
  } else console.log("Index out of range")
}
function reAssignIds() {
  var i = 0
  var json = readDBFile()
  json.map((e) => (e.id = ++i))
  storeToDB(json)
}
function toggleTodo(id) {
  var json = readDBFile()
  json.filter((e) => e.id == id).map((e) => (e.checked = !e.checked))
  storeToDB(json)
}
function listTodos(option) {
  var json = readDBFile()
  var result
  switch (option) {
    case "checked":
      result = json.filter((e) => {
        if (e.checked) return e
      })
      break
    case "unchecked":
      result = json.filter((e) => {
        if (!e.checked) return e
      })
      break
    case "all":
      result = json
      break

    default:
      console.log("Unknown Option")
      break
  }
  return result
}
function editTodo(todo) {
  var json = readDBFile()
  json
    .filter((e) => e.id == todo.id)
    .map((e) => {
      if (todo.title) e.title = todo.title
      if (todo.content) e.content = todo.content
    })
  storeToDB(json)
}

function prepareData(data) {
  return data.reduce((prev, elem, index, arr) => {
    const [key, value] = elem.split("=")
    prev[key] = value
    return prev
  }, {})
}

function main() {
  const [_, __, operation, ...data] = process.argv
  const options = prepareData(data)
  switch (operation) {
    case "add":
      var todo = {
        id: getNextId(),
        title: options.title,
        content: options.content,
        checked: false,
      }
      addTodo(todo)
      break
    case "remove":
      removeTodo(options.id)
      break
    case "toggle":
      toggleTodo(options.id)
      break
    case "show":
      console.log(listTodos(options.option))
      break
    case "edit":
      editTodo(options)
      break
    default:
      console.log("unknown operation")
      break
  }
}
// init()
main()
