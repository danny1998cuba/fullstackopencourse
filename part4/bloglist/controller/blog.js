const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
    try {
        const blog = new Blog(request.body)

        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const res = await Blog.findByIdAndDelete(request.params.id)
        if (res) response.status(204).end()
        else response.status(404).end()
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