const asyncHandler = require("express-async-handler")
const Pathology = require("../models/Pathology")
const bcrypt = require("bcrypt")
const Order = require("../models/Order")
const { reportUpload } = require("../utils/upload")
const jsonwebtoken = require("jsonwebtoken")

exports.registerPathology = asyncHandler(async (req, res) => {
    // const hashPassword = await bcrypt.hash(req.body.password, 10)
    const result = await Pathology.create(req.body)
    res.json({
        message: "Pathology register successfully"
    })
})
exports.getAllPathology = asyncHandler(async (req, res) => {
    const result = await Pathology.find().select("-password  -__v -createdAt -updatedAt ")
    res.json({
        message: "Pathology fetch successfully", result
    })
})
exports.destroyPathology = asyncHandler(async (req, res) => {
    const result = await Pathology.deleteMany()
    res.json({
        message: "Pathology Destroy successfully", result
    })
})
exports.updatePathology = asyncHandler(async (req, res) => {
    const { pathologyId } = req.params;
    const result = await Pathology.findByIdAndUpdate(pathologyId, req.body, {
        new: true,
    })
    res.json({
        message: "Pathology update successfully", result
    })

})
exports.deletePathology = asyncHandler(async (req, res) => {
    const { pathologyId } = req.params;
    const result = await Pathology.findByIdAndDelete(pathologyId)
    res.json({
        message: "Pathology Delete successfully", result
    })
})
exports.pathologyOrders = asyncHandler(async (req, res) => {
    const result = await Order.find({ pathology: req.body.pathologyId }).populate("test.testId")
    res.json({
        message: "Pathology Order Fetched successfully", result
    })
})
exports.pathologyAcceptOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const result = await Order.findByIdAndUpdate(orderId, {
        status: "accept"
    }, {
        new: true
    })
    res.json({
        message: "Pathology Order Status Update successfully",
        result
    })
})
exports.pathologyUploadReports = asyncHandler(async (req, res) => {


    reportUpload(req, res, async err => {
        if (err) {
            res.status(400).json({ message: "multer error " + err })
        }

        // isLogin start
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "Please Login" })
        }
        jsonwebtoken.verify(token, process.env.JWT_KEY, async (err, decode) => {
            if (err) {
                return res.status(401).json({ message: "Invalid Token" })
            }
            const result = await Pathology.findById(decode.id)
            if (!result) {
                return res.status(401).json({ message: "Pathology only route. you are not Pathology" })
            }
            req.body.pathologyId = result._id
            console.log(req.body);
            // next()
            const reports = []
            for (let i = 0; i < req.files.length; i++) {
                let url = process.env.NODE_ENV === "development"
                    ? process.env.DEV_URL
                    : process.env.PRODUCTION_URL
                reports.push(`${url}/${req.files[i].filename}`)
            }
            const { orderId } = req.params
            await Order.findByIdAndUpdate(orderId, { reports })
            res.json({ message: "report upload Successfully" })
            // 
        })
    })
})