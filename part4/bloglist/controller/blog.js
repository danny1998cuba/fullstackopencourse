const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require("jsonwebtoken")

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate([{ path: "user", select: "id username name" }])
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
    try {
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'user invalid' })
        }

        const blog = new Blog({ ...request.body, user: user._id })
        const result = await blog.save()

        await User.findByIdAndUpdate(user._id, { $push: { blogs: result._id } })

        response.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'user invalid' })
        }

        const res = await Blog.findById(request.params.id)
        if (!res) { next({ name: "NotFound" }); }
        else {
            if (res.user.toString() === user.id.toString()) {
                const deleted = await Blog.deleteOne({ _id: res._id })

                await User.findByIdAndUpdate(user._id, { $pull: { blogs: res._id } })

                if (deleted.deletedCount > 0) response.status(204).end()
                else next({ message: "error deleting blog" })
            } else {
                response.status(401).json({ error: "this blog belongs to another user" })
            }
        }
    } catch (error) {
        next(error)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    try {
        const res = await Blog.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true, context: 'query' }
        )

        if (res) response.status(200).json(res)
        else response.status(404).end()
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouter