const asyncHanlder = require("express-async-handler")
const { profileUpload } = require("../utils/profile")
exports.addProfile = asyncHanlder(async (req, res) => {
    profileUpload(req, res, async err => {
        if (err) {
            return res.json({ message: "multer Error " + err })
        }
        // databse Query (entry)
        console.log(req.file)
        res.json({ message: "profile created successfully" })
    })

}) 