require("../database/connect")
const express = require("express")
const app = express()
app.use(express.json())



const userRoutes = require("../routes/user.routes")
app.use("/user" ,userRoutes)
const postRoutes = require("../routes/post.routes")
app.use("/post",postRoutes)
module.exports = app