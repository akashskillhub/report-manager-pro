const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const { docUpload } = require("../utils/upload")
const jsonwebtoken = require("jsonwebtoken")
const Doctor = require("../models/Doctor")
exports.addTestController = asyncHandler(async (req, res) => {
    docUpload(req, res, async err => {
        if (err) {
            res.status(400).json({ message: "multer error " + err })
        }

        // isLogin start
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
            console.log(req.body);
            // next()
            const docs = []
            for (let i = 0; i < req.files.length; i++) {
                docs.push(req.files[i].path)
            }
            await Order.create({ ...req.body, test: JSON.parse(req.body.test), docs })
            res.json({ message: "Order Placed Successfully" })

        })
        // isLogin end 


    })

})
exports.getAllOrderController = asyncHandler(async (req, res) => {
    console.log(req.body);
    const result = await Order.find()
    res.json({ message: "Order Fetch Successfully", result })

})
exports.destroyOrderController = asyncHandler(async (req, res) => {

    const result = await Order.deleteMany()
    res.json({ message: "Order Destoyed Successfully" })

})