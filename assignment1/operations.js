const helpers = require("./helpers")
async function addTodo(todo) {
  try {
    const dbJson = await helpers.readDBFile()
    dbJson.push(todo)
    await helpers.storeToDbFile(dbJson)
    const metadataJson = await helpers.readMetaDataFile()
    metadataJson.todo_count += 1
    helpers.storeToMetaDataFile(metadataJson).catch((err) => {
      console.log(err)
    })
    console.log("Todo added")
    helpers.reAssignIds()
  } catch (error) {
    console.log(error)
  }
}
async function removeTodo(id) {
  const currentId = await helpers.getCurrentId()
  if (id > 0 && id <= currentId) {
    const dbJson = await helpers.readDBFile()
    dbJson.splice(id - 1, 1)
    await helpers.storeToDbFile(dbJson)
    console.log("Todo Deleted Successfully")
    const metaJson = await helpers.readMetaDataFile()
    metaJson.todo_count -= 1
    await helpers.storeToMetaDataFile(metaJson)
    await helpers.reAssignIds()
    return 1
  } else {
    console.log("Index out of range")
    return 0
  }
}
async function toggleTodo(id) {
  const dbJson = await helpers.readDBFile()
  dbJson.filter((e) => e.id == id).map((e) => (e.checked = !e.checked))
  helpers.storeToDbFile(dbJson)
  console.log(`Todo ${id} Toggled`)
}
async function showTodos(option) {
  // var json = readDBFile()
  const json = await helpers.readDBFile()
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
async function editTodo(todo) {
  // var json = readDBFile()
  const json = promisifiedReadDBFile()
  json
    .filter((e) => e.id == todo.id)
    .map((e) => {
      if (todo.title) e.title = todo.title
      if (todo.content) e.content = todo.content
    })
  storeToDB(json)
}
module.exports = {
  addTodo,
  editTodo,
  removeTodo,
  toggleTodo,
  showTodos,
}
