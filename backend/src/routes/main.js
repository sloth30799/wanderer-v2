const express = require("express")
const router = express.Router()
const mainController = require("../controllers/main")
const { ensureAuth } = require("../middleware/auth")

//Main Routes
router.get("/profile", ensureAuth, mainController.getProfile)
router.get("/feed", ensureAuth, mainController.getFeed)

module.exports = router
