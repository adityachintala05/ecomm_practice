require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const routes = require("./routes/routes")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Mongo Connected")
})
.catch(err => {
    console.log(err)
})

app.use("/", routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})