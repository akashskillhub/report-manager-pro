const mongoose = require("mongoose")

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hospitalName: {
        type: String,
        // required: true
    },
    mobile: {
        type: Number,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    dob: {
        type: Date,
    },
    doa: {
        type: Date,
    },
    avatar: {
        type: String
    },
    education: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


module.exports = mongoose.model("doctor", doctorSchema)

