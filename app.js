const express = require("express")
require("dotenv").config({ path: "./.env" })
const app = express()
const serverless = require("serverless-http")
const DbConnection = require("./utils/dbConnection")
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

DbConnection()
app.get("/", (req, res) => {
  res.status(200).send({ message: "Expressjs app" })
})
app.use("/api", require("./routes/routes"))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`App is listining on port ${PORT}`)
})

module.exports.handler = serverless(app)
