const Todo = require("../models/todo.model")

const createTodo = async (req, res) => {
  const { title, description } = req.body

  let data = { title, description, createdAt: new Date().toISOString() }
  try {
    const count = await Todo.count({ title })
    if (count > 0) {
      let todoData = await Todo.findOne({ title })
      return res.status(404).send({ message: "Todo already exists", todoData })
    }
    let todo = await (
      await Todo.create({ ...data })
    ).populate("title description createdAt")
    return res.status(201).json(todo)
  } catch (err) {
    console.log(err)
    return res
      .status(404)
      .json({ message: "Failed to create todos please try again" })
  }
}

module.exports = { createTodo }
