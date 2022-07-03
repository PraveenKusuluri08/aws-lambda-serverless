const router = require("express").Router()
const { createTodo } = require("../controllers/todo.controller")
router.get("/hello", (req, res) => {
  res.send({ message: "Router" })
})

router.post("/createtodo", createTodo)

module.exports = router
