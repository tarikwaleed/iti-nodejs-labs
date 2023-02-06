const express = require("express")
const router = express.Router()
const Post = require("../models/post")
function handleError(error) {
  console.log(error)
}
/* GET posts listing. */
router.get("/", (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (!err) return res.json(posts)
    return handleError(err)
  }).populate({path:'author'})
})
router.get("/:id", (req, res, next) => {
  Post.find({ _id: req.params.id }, (err, posts) => {
    if (!err) return res.json(posts)
    res.status(500).json(err)
  })
})

router.post("/", (req, res, next) => {
  const post = req.body
  Post.create(post, (err, post) => {
    if (err) return handleError(err)
    res.send(post)
    // saved!
  })
})
router.put("/:id", async (req, res, next) => {
  const filter = { _id: req.params.id }
  const update = { ...req.body }
  let post = await Post.findOneAndUpdate(filter, update)
  post.save((err) => {
    if (err) return handleError(err)
    res.json(post)
  })
})
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id
  const filter = { _id: id }
  // await Post.findOneAndDelete(filter)
  Post.findOneAndDelete(filter, (err, deletedPost) => {
    if (!err) {
      console.log(`post with id:${id} Deleted Successfully`)
      return res.json(deletedPost)
    }
    return handleError(err)
  })
})
module.exports = router
