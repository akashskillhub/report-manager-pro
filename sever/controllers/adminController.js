const asyncHandler = require("express-async-handler")
const Admin = require("../models/Admin")

exports.registerAdmin = asyncHandler(async (req, res) => {
    const result = await Admin.create(req.body)
    res.json({ message: "admin register successfully" })
})
exports.getAllAdmins = asyncHandler(async (req, res) => {
    const result = await Admin.find()
    res.json({ message: "admin fetch successfully", result })
})
exports.destroyAdmins = asyncHandler(async (req, res) => {
    const result = await Admin.deleteMany()
    res.json({ message: "admin destory successfully", result })
}) 
