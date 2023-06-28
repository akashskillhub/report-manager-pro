const asyncHandler = require("express-async-handler")
const Admin = require("../models/Admin")

const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
const Tests = require("../models/Tests")
const Order = require("../models/Order")
const Doctor = require("../models/Doctor")
const { newDocUpload } = require("../utils/upload")
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
    const isExist = await Tests.findOne({ name: req.body.name })
    if (isExist) {
        return res.status(400).json({ message: "test already exist" })
    }
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
    const result = await Order.find().populate("doctorId").populate("test.testId").populate("pathology")
    res.json({ message: "Orders Fetched successfully", result })
})
exports.adminDeleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const result = await Order.findByIdAndDelete(orderId)
    res.json({ message: "Orders Deleted successfully" })
})
exports.adminUpdateOrder = asyncHandler(async (req, res) => {
    if (req.body.action === "assign") {
        const { orderId } = req.params
        await Order.findByIdAndUpdate(orderId, req.body)
        return res.json({ message: "Order updated Successfully" })
    }
    newDocUpload(req, res, async (err) => {

        if (err) {
            return res.status(400).json({
                message: "multer Error " + err
            })
        }
        const newDocs = []
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                let url = process.env.NODE_ENV === "development"
                    ? process.env.DEV_URL
                    : process.env.PRODUCTION_URL
                newDocs.push(`${url}/${req.files[i].filename}`)
            }
        }
        const { orderId } = req.params
        await Order.findByIdAndUpdate(orderId, {
            ...req.body,
            test: JSON.parse(req.body.test),
            docs: [...JSON.parse(req.body.docs), ...newDocs]
        })
        res.json({ message: "Order updated Successfully" })
        /* old code end*/
    })
})


