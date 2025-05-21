const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body

        if (!password) {
            next({ name: "ValidationError", message: "password is required" })
            return;
        }

        if (password.length < 3) {
            next({ name: "ValidationError", message: "password is too short" })
            return;
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await User.find({}).populate([{ path: "blogs", select: "url title author id" }])
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter