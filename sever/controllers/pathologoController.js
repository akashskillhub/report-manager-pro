const asyncHandler = require("express-async-handler")
const Pathology = require("../models/Pathology")


exports.registerPathology = asyncHandler(async (req, res) => {
    const result = await Pathology.create(req.body)
    res.json({
        message: "Pathology register successfully"
    })
})
exports.getAllPathology = asyncHandler(async (req, res) => {
    const result = await Pathology.find()
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