const express = require("express");
const { signup, signin } = require("../controllers/authController");
const { userauth } = require("../middleware/userauth");
const { getUserProfile } = require("../controllers/userController");
const router = express.Router
const userRouter = router()

userRouter.post('/signup', signup)
userRouter.post("/login", signin);

userRouter.get('/profile', userauth, getUserProfile )

module.exports = { userRouter };