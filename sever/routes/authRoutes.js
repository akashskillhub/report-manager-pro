const { continueWithGoogle1, logoutUser } = require("../controllers/authController")

const router = require("express").Router()

router
    .post("/continue-with-google", continueWithGoogle1)
    .post("/logout", logoutUser)



module.exports = router