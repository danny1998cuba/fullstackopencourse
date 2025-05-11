const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config')
const { info, error } = require('./logger')

mongoose.connect(MONGODB_URL)
    .then(_ => info("MongoDB connected"))
    .catch(e => error("Error connecting DB", e.message))