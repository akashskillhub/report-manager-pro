const asyncHandler = require("express-async-handler")
const Doctor = require("../models/Doctor")

exports.registerDoctor = asyncHandler(async (req, res) => {
    const result = await Doctor.create(req.body)
    res.json({
        message: "Doctor register successfully"
    })
})
exports.getAllDoctor = asyncHandler(async (req, res) => {
    const result = await Doctor.find()
    res.json({
        message: "Doctor fetch successfully", result
    })
})
exports.destroyDoctor = asyncHandler(async (req, res) => {
    const result = await Doctor.deleteMany()
    res.json({
        message: "Doctor Destroy successfully", result
    })
})
exports.updateDoctor = asyncHandler(async (req, res) => {
    const { doctorId } = req.params;
    const result = await Doctor.findByIdAndUpdate(doctorId, req.body, {
        new: true,
    })
    res.json({
        message: "Doctor update successfully", result
    })

})
exports.deleteDoctor = asyncHandler(async (req, res) => {
    const { doctorId } = req.params;
    const result = await Doctor.findByIdAndDelete(doctorId)
    res.json({
        message: "Doctor Delete successfully", result
    })
})