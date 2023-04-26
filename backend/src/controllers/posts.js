const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")

module.exports = {
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (!post) {
        res.status(404).json({ success: false, data: "Post not found" })
      }

      res.status(200).json({ success: true, post: post || null })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      const post = await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      })
      if (!post) {
        res.status(404).json({ success: false, data: "Failed to create Post" })
      }

      console.log("Post has been added!")
      res.status(200).json({ success: true, post })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        },
        { new: true }
      )
      if (!post) {
        res.status(404).json({ success: false, data: "Post not updated" })
      }

      console.log("Likes +1")
      res.status(200).json({ success: true, data: post.likes })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id })
      if (!post) {
        res.status(404).json({ success: false, data: "Post not found" })
      }
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId)
      // Delete post from db
      await Post.remove({ _id: req.params.id })
      console.log("Deleted Post")
      res.status(200).json({ success: true, data: "Deleted Post" })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
}
