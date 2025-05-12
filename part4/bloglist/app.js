const express = require('express')
require("./utils/database")

const blogRouter = require('./controller/blog')

const app = express()
app.use(express.json())

app.use("/api/blogs", blogRouter)

module.exports = app