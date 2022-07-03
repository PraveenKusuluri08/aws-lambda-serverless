const mongoose = require("mongoose")

const DbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`Database is connected",${connection.connection.host}`)
  } catch (e) {
    console.log(`error,${e}`)
  }
}
module.exports = DbConnection
