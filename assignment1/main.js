const fs = require("fs")


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
// main()

module.exports = {
  addTodo,
  removeTodo,
  editTodo,
  toggleTodo,
  listTodos,
  getNextId,
  getCurrentId,
  promisifiedReadDBFile,
  promisifiedReadMetaDataFile,
  promisifiedStoreToDb,
  promisifiedStoreToMeta,
  initializeDBFile,
  initializeMetaDataFile,
  init,
}

//the goal of assignment5 is to use readFile and writeFilec
//instead of readFileSync and writeFileSync
// and to use them as promises instead of giving them callbacks
