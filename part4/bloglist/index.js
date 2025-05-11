const express = require('express')
require("./utils/config")
require("./utils/database")

const blogRouter = require('./controller/blog')

const app = express()
app.use(express.json())

app.use("/api/blogs", blogRouter)

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})