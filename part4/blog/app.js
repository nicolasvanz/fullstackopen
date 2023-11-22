const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const blogRouter = require("./controllers/blogs")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

const app = express()


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
app.use("/api/blogs", blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app