const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("express-async-errors")

const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const testingRouter = require("./controllers/testing")

const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

const app = express()

mongoose.set("strictQuery", false)

console.info(`Connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch(error => {
    logger.error(`Couldn't connect to MongoDB: ${error.message}`)
  })

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app