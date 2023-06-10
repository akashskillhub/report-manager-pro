const express = require("express")
require('dotenv').config({ path: "./.env" })
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/doctor", require("./routes/doctorRoutes"))
app.use("/api/pathology", require("./routes/pathologyRoutes"))


mongoose.connection.once("open", () => {
    console.log("Database Connected")
    app.listen(PORT, console.log(`http://localhost:${PORT}`))
})
mongoose.connection.on("error", err => {
    console.log("unable to connect database " + err)
})
