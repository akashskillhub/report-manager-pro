// filename
// destination

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    filename: (req, file, next) => {
        const ext = path.extname(file.originalname)
        const fn = Date.now() + ext
        next(null, fn)
    },
    destination: (req, file, next) => {
        next(null, "profile")
    }
})

exports.profileUpload = multer({ storage }).single("profile")