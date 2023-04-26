const Gear = require("../models/Gear")

module.exports = {
  getTemplate: async (req, res) => {
    try {
      const gear = await Gear.findById(req.params.id).populate("user")
      if (!gear) {
        res.status(404).json({ success: false, messages: "Gear not found" })
      }

      res.status(200).json({ success: true, gear: gear || null })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  updateGear: async (req, res) => {
    try {
      const updatedGear = req.body.gear
      const gear = await Gear.findOneAndReplace(
        {
          _id: req.params.id,
        },
        { ...updatedGear, updatedAt: Date.now() }
      )

      if (!gear) {
        res.status(404).json({ success: false, messages: "Gear not Updated" })
      }
      req.flash("success", {
        msg: "Success! Your Gear List has been updated.",
      })

      res.status(200).json({ success: true, messages: req.flash() })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  deleteGear: async (req, res) => {
    try {
      // Find gear by id
      const gear = await Gear.findById(req.params.id)

      if (!gear) {
        res.status(404).json({ success: false, messages: "Gear not found" })
      }

      // Delete gear from db
      await Gear.remove({ _id: req.params.id })
      console.log("Deleted Gear")
      res.status(200).json({ success: true, messages: "Deleted Gear" })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
}
