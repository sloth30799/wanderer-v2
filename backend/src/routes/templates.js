const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")
const gearTemplateController = require("../controllers/template")

router.post(
  "/createGearTemplate",
  ensureAuth,
  gearTemplateController.createGearTemplate
)

router.get("/AllTemplates", ensureAuth, gearTemplateController.getAllTemplates)
// router.get("/:id", ensureAuth, gearTemplateController.getTemplate)

router.delete(
  "/deleteGearTemplate/:id",
  ensureAuth,
  gearTemplateController.deleteGearTemplate
)

module.exports = router
