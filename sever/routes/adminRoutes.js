const { getAllAdmins, registerAdmin, destroyAdmins } = require("../controllers/adminController")

const router = require("express").Router()

router
    .get("/", getAllAdmins)
    .post("/register", registerAdmin)
    .delete("/destroy", destroyAdmins)

module.exports = router