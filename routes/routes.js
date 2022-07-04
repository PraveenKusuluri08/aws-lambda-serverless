const router = require("express").Router()
const {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteSingleTodo,
  deleteAllCompletedTodos,
  deleteAllTodos,
} = require("../controllers/todo.controller")

router.get("/hello", (req, res) => {
  res.send({ message: "Router" })
})

router.post("/createtodo", createTodo)
router.get("/gettodos", getTodos)
router.get("/getsingletodo", getSingleTodo)
router.put("/updatetodo", updateTodo)
router.delete("/deletesingletodo", deleteSingleTodo)
router.delete("/deleteallcompletedtodos", deleteAllCompletedTodos)
router.delete("/deletealltodos", deleteAllTodos)

module.exports = router
