const { addTestController, getAllOrderController } = require("../controllers/OrderController")
const { getAllDoctor, registerDoctor, destroyDoctor, updateDoctor, deleteDoctor, getAllDoctorTests } = require("../controllers/doctorController")
const { isDoctor } = require("../middlewares/authProtected")


const router = require("express").Router()

router
    .get("/", isDoctor, getAllDoctor)
    .post("/register", registerDoctor)
    .delete("/destroy", destroyDoctor)
    .put("/update/:doctorId", updateDoctor)
    .delete("/delete/:doctorId", deleteDoctor)

    .get("/test", getAllDoctorTests)


    .post("/test/add", addTestController)
    .get("/orders", isDoctor, getAllOrderController)


module.exports = router