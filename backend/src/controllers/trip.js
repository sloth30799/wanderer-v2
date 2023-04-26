const Trip = require("../models/Trip")
const Gear = require("../models/Gear")

module.exports = {
  getTrips: async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id).populate("gear")
      if (!trip) {
        return res.status(404).json({ success: false, error: "Trip not found" })
      }

      res.status(200).json({ success: true, trip: trip || null })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  createTrip: async (req, res) => {
    try {
      const {
        destination,
        startDate,
        endDate,
        budget,
        accommodationName,
        accommodationCost,
        transportationName,
        transportationCost,
        note,
      } = req.body

      const gear = await Gear.create({
        name: destination,
        user: req.user.id,
        equipments: [],
        accessories: [],
        essentials: [],
      })
      if (!gear) {
        return res
          .status(404)
          .json({ success: false, error: "Failed to create gear" })
      }

      const trip = await Trip.create({
        destination,
        startDate,
        endDate,
        budget,
        accommodations: {
          name: accommodationName,
          cost: accommodationCost,
        },
        transportation: {
          name: transportationName,
          cost: transportationCost,
        },
        gear: gear,
        user: req.user.id,
        note,
      })
      if (!trip) {
        res.status(404).json({ success: false, data: "Failed to create trip" })
      }

      console.log("Trip has been added!")
      res.status(200).json({ success: true, trip: trip })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  tripUpdate: async (req, res) => {
    try {
      const trip = await Trip.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { completed: req.body.completed }
      )
      if (!trip) {
        return res
          .status(404)
          .json({ success: false, error: "Trip not updated" })
      }

      req.flash("success", {
        msg: "Success! Your Trip has been updated.",
      })
      res.status(200).json({
        success: true,
        messages: req.flash(),
        completed: trip.completed,
      })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  deleteTrip: async (req, res) => {
    try {
      // Find trip by id
      let trip = await Trip.findById({ _id: req.params.id }).populate("gear")
      if (!trip) {
        return res.status(404).json({ success: false, error: "Trip not found" })
      }

      const gearId = trip.gear._id
      const gear = await Gear.findById({ _id: gearId })
      if (!gear) {
        return res.status(404).json({ success: false, error: "Gear not found" })
      }

      // Delete trip from db
      await Trip.remove({ _id: req.params.id })
      if (gear.template === false) await Gear.remove({ _id: gearId })
      console.log("Deleted Trip")
      res.status(200).json({ success: true, data: "Deleted Trip" })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
}
