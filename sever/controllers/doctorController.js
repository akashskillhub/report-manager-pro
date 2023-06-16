const asyncHandler = require("express-async-handler")
const Doctor = require("../models/Doctor")

const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")
const Tests = require("../models/Tests")


exports.registerDoctor = asyncHandler(async (req, res) => {

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const result = await Doctor.create({ ...req.body, password: hashPassword })
    res.json({
        message: "Doctor register successfully"
    })
})
exports.getAllDoctor = asyncHandler(async (req, res) => {
    const result = await Doctor.find().select(" -password  -__v -createdAt -updatedAt ")
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

exports.getAllDoctorTests = asyncHandler(async (req, res) => {
    const result = await Tests.find().select("   -__v -createdAt -updatedAt ")
    res.json({
        message: "Doctor Tests fetch successfully", result
    })
})
