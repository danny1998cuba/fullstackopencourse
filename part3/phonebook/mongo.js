const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("password missing")
    process.exit(1)
}

const psw = process.argv[2]
const url = `mongodb+srv://admin:${psw}@cluster0.amodjwt.mongodb.net/`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length > 3) {
    if (process.argv.length !== 5) {
        console.log("Not enough parameters to create")
        process.exit(1)
    } else {
        const name = process.argv[3]
        const number = process.argv[4]

        const person = new Person({ name, number })
        person.save().then(res => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    }
} else {
    Person.find({}).then(res => {
        console.log("phonebook:")
        if (res && res.length > 0) res.forEach(p => console.log(`${p.name} ${p.number}`))
        else console.log("Empty phonebook")

        mongoose.connection.close()
    })
}