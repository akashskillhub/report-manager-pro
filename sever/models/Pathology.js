const mongoose = require("mongoose")

const pathologySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pathologyName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    avatar: {
        type: String
    },

    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


module.exports = mongoose.model("pathology", pathologySchema)

