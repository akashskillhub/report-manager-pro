const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: "doctor",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    test: [
        {
            testId: mongoose.Types.ObjectId,
            price: Number
        }
    ],
    docs: [String]
}, { timestamps: true })

module.exports = mongoose.model("order", orderSchema)