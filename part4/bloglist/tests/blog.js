const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test("of empty list is zero", () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes([blogs[0]])
        assert.strictEqual(result, 7)
    })

    test('of a big list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', () => {
    test("of empty list is undefined", () => {
        assert.strictEqual(listHelper.favoriteBlog([]), undefined)
    })

    test('when list has only one blog, equals that blog', () => {
        const result = listHelper.favoriteBlog([blogs[0]])
        assert.deepStrictEqual(result, blogs[0])
    })

    test('of a big list is calculated right', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })

    test('with repeated post, picks the first one that matches', () => {
        const extra = {
            _id: "5a422b3a1b54a676234d17f7",
            title: "Canonical string reduction modified",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }

        const result = listHelper.favoriteBlog([...blogs, extra])
        assert.deepStrictEqual(result, blogs[2])

        const result2 = listHelper.favoriteBlog([extra, ...blogs])
        assert.deepStrictEqual(result2, extra)
    })
})

describe('most blogs', () => {
    test("of empty list is undefined", () => {
        assert.strictEqual(listHelper.mostBlogs([]), undefined)
    })

    test("of a big list is calculated right", () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        })
    })

    test('with top poster, picks the first one that matches (alphabetical order)', () => {
        /**
         * Adding one post more of "Edsger W. Dijkstra", make the array have 3 as well as "Robert C. Martin".
         * Dijkstra is selected based on alphabetical order given the grouping algorithm of Lodash
         */
        const extra = {
            _id: "5a422b3a1b54a676234d17f7",
            title: "Canonical string reduction modified",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }

        const result = listHelper.mostBlogs([...blogs, extra])
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test("of empty list is undefined", () => {
        assert.strictEqual(listHelper.mostLikes([]), undefined)
    })

    test("of a big list is calculated right", () => {
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })

    test('with top poster, picks the first one that matches (alphabetical order)', () => {
        /**
         * Adding one post more of "Robert C. Martin" with 5 extra likes, make the total of likes of this author with "Edsger W. Dijkstra".
         * Dijkstra is selected based on alphabetical order given the grouping algorithm of Lodash
         */
        const extra = {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 5,
            __v: 0
        }

        const result = listHelper.mostLikes([...blogs, extra])
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})