const Gear = require("../models/Gear")

module.exports = {
  createGearTemplate: async (req, res) => {
    try {
      const gear = await Gear.create({
        name: req.user.userName,
        user: req.user.id,
        equipments: [],
        accessories: [],
        essentials: [],
        template: true,
        createdBy: req.user.userName,
      })

      if (!gear) {
        res
          .status(404)
          .json({ success: false, data: "Failed to create gear template" })
      }
      req.flash("success", {
        msg: "Success! Your Gear Template has been created.",
      })

      res.status(200).json({ success: true, gear: gear, messages: req.flash() })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  getAllTemplates: async (req, res) => {
    try {
      const userTemplates = await Gear.find({
        user: req.user.id,
        template: true,
      }).lean()

      const templates = await Gear.find({
        template: true,
        createdBy: "Admin",
      }).lean()

      res
        .status(200)
        .json({ success: true, templates: [...userTemplates, ...templates] })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  deleteGearTemplate: async (req, res) => {
    try {
      // Find gear by id
      const gear = await Gear.findById(req.params.id)

      if (!gear) {
        res.status(404).json({ success: false, data: "Gear not found" })
      }

      // Delete gear from db
      await Gear.remove({ _id: req.params.id })
      console.log("Deleted Gear")
      res.status(200).json({ success: true, data: "Deleted Gear" })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
}
