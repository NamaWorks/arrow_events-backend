require("dotenv").config()
const express = require("express")
const { connectDB } = require("./src/config/db.js")
const userRouter = require("./src/api/routes/user_routes.js")
const eventsRouter = require("./src/api/routes/event_routes.js")
const cloudinary = require("cloudinary").v2
const cors = require("cors")
const { configCloudinary } = require("./src/middleware/files-users.middleware.js")
const server = express()

configCloudinary()



connectDB()
server.use(express.json())
server.use(cors())

server.use("/users", userRouter)
server.use("/events", eventsRouter)

server.use("*", (req, res, next) => {
  return res.status(404).json(`error 404: route not found`)
})

server.listen(3000, ()=> {
   console.log(`server launched at: http://localhost:3000`)
})

 