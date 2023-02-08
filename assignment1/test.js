const helpers = require("./helpers")
const operations = require("./operations")

async function constructTodo() {
  const id = await helpers.getNextId()
  const todo = {
    id: id,
    title: "hello",
    content: "hello",
    checked: false,
  }
  return todo
}
// helpers.init()
// operations.toggleTodo(1)

