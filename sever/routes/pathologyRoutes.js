const { getAllPathology, registerPathology, destroyPathology, updatePathology, deletePathology, pathologyOrders } = require("../controllers/pathologoController")
const { isPathology } = require("../middlewares/authProtected")




const router = require("express").Router()

router
    .get("/", getAllPathology)
    .post("/register", registerPathology)
    .delete("/destroy", destroyPathology)
    .put("/update/:pathologyId", updatePathology)
    .delete("/delete/:pathologyId", deletePathology)

    .get("/orders", isPathology, pathologyOrders)


module.exports = router