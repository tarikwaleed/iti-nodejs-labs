require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const { MONGO_URI } = process.env

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database")
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...")
      console.error(error)
      process.exit(1)
    })
}
