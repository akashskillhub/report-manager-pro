const mongoose = require("mongoose")

const pathologySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pathologyName: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
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

