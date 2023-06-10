const { getAllDoctor, registerDoctor, destroyDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorController")


const router = require("express").Router()

router
    .get("/", getAllDoctor)
    .post("/register", registerDoctor)
    .delete("/destroy", destroyDoctor)
    .put("/update/:doctorId", updateDoctor)
    .delete("/delete/:doctorId", deleteDoctor)


module.exports = router