
const asyncHandler = require("express-async-handler")
const Doctor = require("../models/Doctor")

const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")
const Pathology = require("../models/Pathology")
const sendCustomEmail = require("../utils/email")
const { registerTemplate } = require("../utils/templates/register")

exports.continueWithGoogle1 = asyncHandler(async (req, res) => {

    const { tokenId, account } = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    const verify = await client.verifyIdToken({ idToken: tokenId })
    if (!verify) {
        return res.status(400).json({ message: "account unverified" })
    }

    const { payload: { email, name, picture } } = verify
    let result
    if (account === "doctor") {
        result = await Doctor.findOne({ email }).lean()
    } else {
        result = await Pathology.findOne({ email }).lean()
    }
    if (result) {


        const token = JWT.sign({ id: result._id }, process.env.JWT_KEY)
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        // login
        res.json({
            message: "login success",
            result: { ...result, account }
        })
    } else {
        // register


        const data = account === "doctor"
            ? await Doctor.create({
                name,
                email,
                avatar: picture
            })
            : await Pathology.create({
                name,
                email,
                avatar: picture
            })

        const token = JWT.sign({ id: data._id }, process.env.JWT_KEY)
        res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

        sendCustomEmail({
            to: email,
            sub: "welcome to Report manager pro+",
            msg: "asdasdasdsad",
            template: registerTemplate()
        })

        res.json({
            message: "register success",
            // result: { ...data, account }
            result: {
                _id: data._id,
                name: data.name,
                email: data.email,
                avatar: data.avatar,
                active: data.active,
                account
            }
        })

    }


})

exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("jwt")
    res.json({
        message: "Logout Success"
    })

})