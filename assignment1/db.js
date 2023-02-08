const { rejects } = require("assert")
const fs = require("fs")
const METADATA_PATH =
  "/media/tarikwaleed/Data/iti/NODEJS/iti-nodejs-labs/assignment1/metadata.json"
const DB_PATH =
  "/media/tarikwaleed/Data/iti/NODEJS/iti-nodejs-labs/assignment1/db.json"

function getNextId() {
  return getCurrentId() + 1
}
function getCurrentId() {
  const json = readMetaDataFile()
  // console.log(JSON.parse(json));
  return parseInt(json.todo_count)
}
function readMetaDataFile() {
  var metadata = fs.readFileSync(METADATA_PATH)
  return JSON.parse(metadata)
}
function promisifiedReadMetaDataFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(METADATA_PATH, (err, rawData) => {
      if (!err) resolve(rawData)
      else reject(err)
    })
  })
}
function readDBFile() {
  var data = fs.readFileSync(DB_PATH)
  return JSON.parse(data)
}
function promisifiedReadDBFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(DB_PATH, (err, rawData) => {
      if (!err) resolve(rawData)
      else reject(err)
    })
  })
}
function initializeDBFile() {
  // initialize the file with an empty array
  // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2))
}
function initializeMetaDataFile() {
  // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
  fs.writeFileSync(METADATA_PATH, JSON.stringify({ todo_count: 0 }, null, 2))
}
function init() {
  initializeMetaDataFile()
  initializeDBFile()
}
function storeToDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}
const promisifiedStoreToDb = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), (err) => {
      if (!err) resolve()
      else reject(err)
    })
  })
}

function storeToMeta(data) {
  fs.writeFileSync(METADATA_PATH, JSON.stringify(data, null, 2))
}
const promisifiedStoreToMeta = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(METADATA_PATH, JSON.stringify(data, null, 2), (err) => {
      if (!err) resolve()
      else reject(err)
    })
  })
}
function reAssignIds() {
  var i = 0
  var json = readDBFile()
  json.map((e) => (e.id = ++i))
  storeToDB(json)
}
function prepareData(data) {
  return data.reduce((prev, elem, index, arr) => {
    const [key, value] = elem.split("=")
    prev[key] = value
    return prev
  }, {})
}

async function addTodo(todo) {
  //Read
  // var fileContent = fs.readFileSync(DB_PATH)
  const fileContent = await promisifiedReadDBFile()
  //Parse
  var fileContentAsJSON = JSON.parse(fileContent)
  //Push
  fileContentAsJSON.push(todo)
  //Write
  try {
    // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
    // fs.writeFileSync(DB_PATH, JSON.stringify(fileContentAsJSON, null, 2))
    // promisifiedStoreToDb(fileContentAsJSON).catch((err) => {
    //   console.log(err)
    // })
    await promisifiedStoreToDb(fileContentAsJSON)
    var json = readMetaDataFile()
    json.todo_count += 1
    try {
      // passing those two extra parameters to stringify, makes it write the json PrettyPrinted
      // fs.writeFileSync(METADATA_PATH, JSON.stringify(json, null, 2))
      promisifiedStoreToMeta(json).catch((err) => {
        console.log(err)
      })
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
    var data = fs.readFileSync(DB_PATH)
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
    return 1
  } else {
    console.log("Index out of range")
    return 0
  }
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

function main() {
  const [_, __, operation, ...data] = process.argv
  const options = prepareData(data)
  var todo = {
    id: getNextId(),
    title: options.title,
    content: options.content,
    checked: false,
  }
  switch (operation) {
    case "add":
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
      break
  }
}
// init()
main()

module.exports = {
  readDBFile,
  readMetaDataFile,
  addTodo,
  removeTodo,
  editTodo,
  toggleTodo,
  listTodos,
  getNextId,
}

//the goal of assignment5 is to use readFile and writeFilec
//instead of readFileSync and writeFileSync
// and to use them as promises instead of giving them callbacks
