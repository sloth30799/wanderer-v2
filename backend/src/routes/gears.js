const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")
const gearController = require("../controllers/gear")

router.get("/:id", ensureAuth, gearController.getTemplate)

router.put("/updateGear/:id", ensureAuth, gearController.updateGear)

module.exports = router
