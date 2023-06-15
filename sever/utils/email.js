const nodemailer = require("nodemailer")

const sendCustomEmail = ({ to, msg, sub, template }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
        transporter.sendMail({
            to,
            from: process.env.EMAIL,
            subject: sub,
            text: msg,
            html: template
        }, err => {
            if (err) {
                console.log(err)
                return false
            } else {
                console.log("Email Send Successfully")
                return true
            }
        })

    } catch (error) {
        console.log(error)
        return false
    }

}

module.exports = sendCustomEmail