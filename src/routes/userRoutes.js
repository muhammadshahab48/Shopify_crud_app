
const { Router } = require("express");
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = Router();

router.post("/signup", userController.userSignUpHandler)
router.post("/login", userController.userLoginHandler)
router.post("/reset-password", authMiddleware, userController.resetPasswordHandler)

module.exports = router