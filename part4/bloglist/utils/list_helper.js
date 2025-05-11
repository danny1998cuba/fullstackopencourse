const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, b) => acc += b.likes, 0)
}

const favoriteBlog = (blogs) => {
    const max = Math.max(...blogs.map(b => b.likes))
    return blogs.find(b => b.likes === max)
}

const mostBlogs = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')
    const array = Object.keys(grouped).map(k => ({ author: k, blogs: grouped[k].length }))
    const max = Math.max(...array.map(b => b.blogs))
    return array.find(b => b.blogs === max)
}

const mostLikes = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')
    const array = Object.keys(grouped).map(k => ({ author: k, likes: grouped[k].reduce((acc, b) => acc += b.likes, 0) }))
    console.log(array)
    const max = Math.max(...array.map(b => b.likes))
    return array.find(b => b.likes === max)
}

module.exports = {
    dummy, totalLikes,
    favoriteBlog, mostBlogs,
    mostLikes
}