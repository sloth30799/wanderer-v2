const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")

router.get("/getUser", authController.getUser)

//Local for user login/signup
router.post("/signup", authController.postSignup)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)

// google
router.get("/google", authController.googleAuthenticate)
router.get("/google/callback", authController.googleCallback)

module.exports = router
