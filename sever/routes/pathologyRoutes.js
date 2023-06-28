const { getAllPathology, registerPathology, destroyPathology, updatePathology, deletePathology, pathologyOrders, pathologyAcceptOrder, pathologyUploadReports } = require("../controllers/pathologoController")
const { isPathology } = require("../middlewares/authProtected")




const router = require("express").Router()

router
    .get("/", getAllPathology)
    .post("/register", registerPathology)
    .delete("/destroy", destroyPathology)
    .put("/update/:pathologyId", updatePathology)
    .delete("/delete/:pathologyId", deletePathology)

    .get("/orders", isPathology, pathologyOrders)
    .put("/orders/:orderId", isPathology, pathologyAcceptOrder)
    .put("/orders/report/:orderId", isPathology, pathologyUploadReports)


module.exports = router