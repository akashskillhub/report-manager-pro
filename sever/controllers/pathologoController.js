const asyncHandler = require("express-async-handler")
const Pathology = require("../models/Pathology")
const bcrypt = require("bcrypt")
const Order = require("../models/Order")

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
    const result = await Order.find({ pathology: req.body.pathologyId })
    res.json({
        message: "Pathology Order Fetched successfully", result
    })
})