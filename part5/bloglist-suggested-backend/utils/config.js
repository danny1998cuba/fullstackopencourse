require('dotenv').config()

let PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URL_TEST : process.env.MONGODB_URL

module.exports = {
    MONGODB_URI,
    PORT
}