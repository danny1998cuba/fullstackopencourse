const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    comments: { type: [String], default: [] },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', schema)