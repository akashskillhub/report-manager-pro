const jsonwebtoken = require("jsonwebtoken")
const Doctor = require("../models/Doctor")
exports.isDoctor = (req, res, next) => {

    const { jwt } = req.cookies
    if (!jwt) {
        return res.status(401).json({ message: "Please Login" })
    }
    jsonwebtoken.verify(jwt, process.env.JWT_KEY, async (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Token" })
        }
        const result = await Doctor.findById(decode.id)
        if (!result) {
            return res.status(401).json({ message: "Doctor only route. you are not doctor" })
        }
        req.body.doctorId = result._id
        next()

    })


}