require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 3003

module.exports = { MONGODB_URL, PORT }