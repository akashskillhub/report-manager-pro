const multer = require("multer")
const path = require("path")
const docStorage = multer.diskStorage({
    filename: (req, file, next) => {

        const ext = path.extname(file.originalname)
        const fn = Date.now() + ext
        next(null, fn)
    },
    destination: (req, file, next) => {
        next(null, "uploads")
    }
})
const reportStorage = multer.diskStorage({
    filename: (req, file, next) => {

        const ext = path.extname(file.originalname)
        const fn = Date.now() + ext
        next(null, fn)
    },
    destination: (req, file, next) => {
        next(null, "reports")
    }
})
exports.reportUpload = multer({ storage: reportStorage }).array("reports", 5)


exports.docUpload = multer({ storage: docStorage }).array("docs", 5)
exports.newDocUpload = multer({ storage: docStorage }).array("newDocs", 5)