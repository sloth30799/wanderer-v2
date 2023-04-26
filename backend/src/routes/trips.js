const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const tripController = require("../controllers/trip");

router.get("/:id", ensureAuth, tripController.getTrips);

router.post("/postTrip", ensureAuth, tripController.createTrip);

router.put("/tripUpdate/:id", ensureAuth, tripController.tripUpdate)

router.delete("/deleteTrip/:id", tripController.deleteTrip);

module.exports = router;
