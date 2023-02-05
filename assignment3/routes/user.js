var express = require("express")
var router = express.Router()
const User = require("../models/user")

function handleError(err) {
  console.log(err)
}
/* GET users listing. */
router.get("/", (req, res, next) => {
  User.find({}, (err, users) => {
    if (!err) return res.json(users)
    return handleError(err)
  })
})
router.get("/:id", (req, res, next) => {
  User.find({ _id: req.params.id }, (err, users) => {
    if (!err) return res.json(users)
    res.status(500).json(err)
  })
})

router.post("/", (req, res, next) => {
  const user = req.body
  User.create(user, (err, user) => {
    if (err) return handleError(err)
    res.send(user)
    // saved!
  })
})
router.put("/:id", async (req, res, next) => {
  const filter = { _id: req.params.id }
  const update = { ...req.body }
  let user = await User.findOneAndUpdate(filter, update)
  user.save((err) => {
    if (err) return handleError(err)
    res.json(user)
  })
})
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id
  const filter = { _id: id }
  // await User.findOneAndDelete(filter)
  User.findOneAndDelete(filter, (err, deletedUser) => {
    if (!err) {
      console.log(`user with id:${id} Deleted Successfully`)
      return res.json(deletedUser)
    }
    return handleError(err)
  })
})

module.exports = router
