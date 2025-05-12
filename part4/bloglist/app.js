const express = require('express')
require("./utils/database")
const { errorHandler, unhandledRoutes } = require('./utils/middleware')

const blogRouter = require('./controller/blog')

const app = express()
app.use(express.json())

app.use("/api/blogs", blogRouter)

app.use(errorHandler)
app.use(unhandledRoutes)

module.exports = app