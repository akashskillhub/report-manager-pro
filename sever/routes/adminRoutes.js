const { destroyOrderController } = require("../controllers/OrderController")
const { getAllAdmins, registerAdmin, destroyAdmins, loginAdmin, adminGetAllTests, adminAddTest, adminUpdateTest, adminDeleteTest, adminDestroyTest, adminAllOrders, adminDeleteOrder } = require("../controllers/adminController")

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

    .get("/orders", adminAllOrders)
    .delete("/order/destroy", destroyOrderController)
    .delete("/orders/delete/:orderId", adminDeleteOrder)

module.exports = router