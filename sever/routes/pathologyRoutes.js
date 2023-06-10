const { getAllPathology, registerPathology, destroyPathology, updatePathology, deletePathology } = require("../controllers/pathologoController")




const router = require("express").Router()

router
    .get("/", getAllPathology)
    .post("/register", registerPathology)
    .delete("/destroy", destroyPathology)
    .put("/update/:pathologyId", updatePathology)
    .delete("/delete/:pathologyId", deletePathology)


module.exports = router