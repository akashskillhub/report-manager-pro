const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const { docUpload } = require("../utils/upload")
exports.addTestController = asyncHandler(async (req, res) => {
    docUpload(req, res, async err => {
        if (err) {
            res.status(400).json({ message: "multer error " + err })
        }
        console.log(req.body)
        console.log(req.files)
        const docs = []
        for (let i = 0; i < req.files.length; i++) {
            docs.push(req.files[i].path)
        }
        await Order.create({ ...req.body, docs })
        res.json({ message: "Order Placed Successfully" })
    })

})
exports.getAllOrderController = asyncHandler(async (req, res) => {

    const result = await Order.find()
    res.json({ message: "Order Fetch Successfully", result })

})
exports.destroyTestController = asyncHandler(async (req, res) => {

    const result = await Order.deleteMany()
    res.json({ message: "Order Destoyed Successfully" })

})