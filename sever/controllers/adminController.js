const asyncHandler = require("express-async-handler")
const Admin = require("../models/Admin")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const Tests = require("../models/Tests")
const Order = require("../models/Order")
exports.registerAdmin = asyncHandler(async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const result = await Admin.create({ ...req.body, password: hashPassword })
    res.json({ message: "admin register successfully" })
})
exports.getAllAdmins = asyncHandler(async (req, res) => {
    const result = await Admin.find().select("-password  -__v -createdAt -updatedAt ")
    res.json({ message: "admin fetch successfully", result })
})
exports.destroyAdmins = asyncHandler(async (req, res) => {
    const result = await Admin.deleteMany()
    res.json({ message: "admin destory successfully", result })
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const found = await Admin.findOne({ email })
    if (!found) {
        return res.status(401).json({ message: "email not found" })
    }

    const match = await bcrypt.compare(password, found.password)
    if (!match) {
        return res.status(401).json({ message: "invalid password" })
    }

    const token = jwt.sign({ adminId: found._id, role: found.role }, process.env.JWT_KEY)

    res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        // secure: true
    })
    res.json({
        message: "login success",
        result: found
    })


})

// test CRUD

exports.adminAddTest = asyncHandler(async (req, res) => {
    const result = await Tests.create(req.body)
    res.json({ message: "Test Created successfully" })
})
exports.adminGetAllTests = asyncHandler(async (req, res) => {
    const result = await Tests.find()
    res.json({ message: "Test Fetch successfully", result })
})
exports.adminUpdateTest = asyncHandler(async (req, res) => {
    const { testId } = req.params
    const result = await Tests.findByIdAndUpdate(testId, req.body)
    res.json({ message: "Test Updated successfully" })
})
exports.adminDeleteTest = asyncHandler(async (req, res) => {
    const { testId } = req.params
    const result = await Tests.findByIdAndDelete(testId)
    res.json({ message: "Test Deleted successfully" })
})
exports.adminDestroyTest = asyncHandler(async (req, res) => {
    await Tests.deleteMany()
    res.json({ message: "Test Destroyed successfully" })
})

// order
exports.adminAllOrders = asyncHandler(async (req, res) => {
    const result = await Order.find().populate("doctorId")
    res.json({ message: "Orders Fetched successfully", result })
})


