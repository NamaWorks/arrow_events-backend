require("dotenv").config()
const express = require("express")
const { connectDB } = require("./src/config/db.js")
const userRouter = require("./src/api/routes/user_routes.js")
const eventsRouter = require("./src/api/routes/event_routes.js")
const cloudinary = require("cloudinary").v2
const cors = require("cors")
const server = express()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})



connectDB()
server.use(express.json())
server.use(cors())

server.use("/users", userRouter)
server.use("/events", eventsRouter)

server.use("*", (req, res, next) => {
  return res.status(404).json(`error 404: route not found`)
})

server.listen(3500, ()=> {
   console.log(`server launched at: http://localhost:3500`)
})

 