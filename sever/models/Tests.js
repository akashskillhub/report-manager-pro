const mongoose = require("mongoose")

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    doctorPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["gynacologist", "general physician", "gastroenterologist", "physician"]
    },
    validity: {
        type: Date,
        // required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("labtest", testSchema)