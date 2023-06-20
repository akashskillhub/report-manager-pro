const { destroyOrderController } = require("../controllers/OrderController")
const { getAllAdmins, registerAdmin, destroyAdmins, loginAdmin, adminGetAllTests, adminAddTest, adminUpdateTest, adminDeleteTest, adminDestroyTest } = require("../controllers/adminController")

const router = require("express").Router()

router
    .get("/", getAllAdmins)
    .post("/register", registerAdmin)
    .post("/login", loginAdmin)
    .delete("/destroy", destroyAdmins)

    .get("/test", adminGetAllTests)
    .post("/test/add", adminAddTest)
    .put("/test/:testId", adminUpdateTest)
    .delete("/test/destroy", adminDestroyTest)
    .delete("/test/:testId", adminDeleteTest)
    .delete("/order/destroy", destroyOrderController)

module.exports = router