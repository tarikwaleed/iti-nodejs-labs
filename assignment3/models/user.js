const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: { type: String, min: 4, max: 20, require: true },
  lastName: { type: String, min: 4, max: 20, require: true },
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  age: { type: Number, require: true },
})

module.exports = mongoose.model("User", userSchema)
