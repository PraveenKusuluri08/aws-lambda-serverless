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

const getTodos = async (req, res) => {
  try {
    let todo = await Todo.find().populate("title description createdAt")

    return res.status(200).json(todo)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: "Failed to get all todos" })
  }
}

const getSingleTodo = async (req, res) => {
  const { id } = req.query
  try {
    let todo = await Todo.findOne({ _id: id }).sort({ _id: -1 })
    return res.status(200).json(todo)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: "Failed to get single todo" })
  }
}

const updateTodo = async (req, res) => {
  const { id } = req.query
  const { title, description } = req.body
  try {
    const count = await Todo.count({ _id: id })

    if (count <= 0) {
      return res
        .status(404)
        .json({ message: "Failed to update todo! Todo is not exists" })
    }
    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description }
    )
    return res.status(200).json(todo)
  } catch (err) {
    console.log(err)

    return res.status(404).json({ message: "Failed to update todo" })
  }
}

const deleteSingleTodo = async (req, res) => {
  const { id } = req.query
  try {
    const todo = await Todo.deleteOne({ _id: id })

    return res.status(200).json(todo)
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: "failed to delete single todo" })
  }
}

const deleteAllCompletedTodos = async (req, res) => {
  try {
    const todo = await Todo.deleteMany({ isCompleted: true })
    return res
      .status(200)
      .json({ message: "Successfully to delete todos whcih are completed" })
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Failed to delete todos which are completed" })
  }
}

const deleteAllTodos = async (req, res) => {
  try {
    const todo = await Todo.deleteMany({})
    console.log(todo)
    return res.status(200).json({ message: "Successfully delete all todos" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Failed to delete all todos" })
  }
}

module.exports = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteSingleTodo,
  deleteAllCompletedTodos,
  deleteAllTodos,
}
