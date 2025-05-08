const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URL

mongoose.connect(mongoUrl).then(r => console.log("DB connected")).catch(e => console.error("Error to connect", e.message));

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)