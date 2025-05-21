const express = require('express')
require("./utils/database")
const { errorHandler, unhandledRoutes, getTokenFromRequest, userExtractor } = require('./utils/middleware')

const blogRouter = require('./controller/blog')
const userRouter = require('./controller/user')
const loginRouter = require('./controller/login')

const app = express()
app.use(express.json())

app.use(getTokenFromRequest)

app.use("/api/blogs", userExtractor, blogRouter)
app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)

app.use(errorHandler)
app.use(unhandledRoutes)

module.exports = app