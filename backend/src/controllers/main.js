const Gear = require("../models/Gear")
const Post = require("../models/Post")
const Trip = require("../models/Trip")

module.exports = {
  getProfile: async (req, res) => {
    try {
      if (!req.user) res.status(200).json(null)
      const posts = await Post.find({ user: req.user.id }).lean()
      const trips = await Trip.find({ user: req.user.id }).lean()
      const gears = await Gear.find({
        user: req.user.id,
        template: true,
      }).lean()
      res.status(200).json({ success: true, posts, trips, gears })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: "descending" })
        .lean()
        .populate("user")
      res.status(200).json({ success: true, posts })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
}
