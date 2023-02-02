const db = require("../assignment1/db")
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

app.get("/todo/checked", (req, res) => {
  res.send(db.listTodos("checked"))
})
app.get("/todo/unchecked", (req, res) => {
  res.send(db.listTodos("unchecked"))
})
app.get("/todo/all", (req, res) => {
  res.send(db.listTodos("all"))
})
app.post("/todo", (req, res) => {
  var todo = {
    id: db.getNextId(),
    title: req.body.title,
    content: req.body.content,
    checked: false,
  }
  db.addTodo(todo)
  res.send(todo)
})
app.delete("/todo/:id", (req, res) => {
  db.removeTodo(req.params.id)
    ? res.send(JSON.stringify({ result: "OK" }))
    : res.send(JSON.stringify({ result: "ERROR,Index Out of range" }))
})
app.put("/todo/:id", (req, res) => {
  db.editTodo(req.body)
  res.send(JSON.stringify({ result: "Edited Successfully" }))
})
app.put("/todo/toggle/:id", (req, res) => {
  db.toggleTodo(req.params.id)
  res.send(JSON.stringify({ result: "Toggled Succsssfully" }))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
