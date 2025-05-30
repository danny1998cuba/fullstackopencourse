const app = require('../app')
const mongoose = require('mongoose');
const supertest = require('supertest')
const { beforeEach, test, after, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogs, getAllBlogsDb, notSavedId, userTest } = require('../utils/test-helpers')

const api = supertest(app)
let token = null

beforeEach(async () => {
    await User.deleteMany({});
    const res = await api.post("/api/users").send(userTest)
    await Blog.deleteMany({});
    await Blog.insertMany(blogs.map(b => ({ ...b, user: res.body.id })))

    const resp = await api.post("/api/login").send({ username: userTest.username, password: userTest.password })
    token = resp.body.token
})

describe("api blogs", () => {
    test("get blogs returns the right amount and right content-type", async () => {
        const res = await api.get("/api/blogs")
            .auth(token, { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(res.body.length, blogs.length)
    })

    test("the unique identifier is named id", async () => {
        const res = await api.get("/api/blogs").auth(token, { type: 'bearer' })
        const valid = res.body.every(b => 'id' in b)
        assert.strictEqual(valid, true)
    })

    describe("saving blogs", () => {
        test("save a blog works", async () => {
            const newData = {
                title: "Otro de pruebas",
                author: "Daniel",
                url: "https://example.com",
                likes: 3
            }

            const response = await api
                .post('/api/blogs')
                .send(newData)
                .auth(token, { type: 'bearer' })
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const inDb = await getAllBlogsDb()
            const fromDb = inDb.find(e => e.id === response.body.id)

            assert.strictEqual(inDb.length, blogs.length + 1)
            assert.deepStrictEqual(fromDb, response.body)
        })

        test("save a blog without token returns an Unauthorized response", async () => {
            const newData = {
                title: "Otro de pruebas",
                author: "Daniel",
                url: "https://example.com",
                likes: 3
            }

            await api
                .post('/api/blogs')
                .send(newData)
                .expect(401)
                .expect('Content-Type', /application\/json/)
                .expect(res => {
                    if (!('error' in res.body)) {
                        throw new Error('Missing error message');
                    }
                })

            const inDb = await getAllBlogsDb()

            assert.strictEqual(inDb.length, blogs.length)
        })

        test("likes property is 0 by default", async () => {
            const newData = {
                title: "Otro de pruebas",
                author: "Daniel",
                url: "https://example.com"
            }

            const response = await api
                .post('/api/blogs')
                .send(newData)
                .auth(token, { type: 'bearer' })
                .expect(201)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(response.body.likes, 0)
        })

        test("title or url missing triggers an error 400", async () => {
            const newDataNoTitle = {
                author: "Daniel",
                url: "https://example.com"
            }

            const newDataNoUrl = {
                title: "Otro de pruebas",
                author: "Daniel",
            }

            await api
                .post('/api/blogs')
                .send(newDataNoTitle)
                .auth(token, { type: 'bearer' })
                .expect(400)

            await api
                .post('/api/blogs')
                .send(newDataNoUrl)
                .auth(token, { type: 'bearer' })
                .expect(400)
        })
    })

    describe("deleting a blog", () => {
        test("delete an existing blog works", async () => {
            const inDb = await getAllBlogsDb()
            await api.delete(`/api/blogs/${inDb[0].id}`).auth(token, { type: 'bearer' }).expect(204)
            const inDbAfter = await getAllBlogsDb()

            assert.strictEqual(inDbAfter.length, inDb.length - 1)
            assert(!inDbAfter.some(b => b.id === inDb[0].id))
        })
        test("delete with a wrong id fails", async () => {
            const invalidId = await notSavedId()
            await api.delete(`/api/blogs/${invalidId}`).auth(token, { type: 'bearer' }).expect(404)
        })
        test("delete with a wrong formatted id fails", async () => {
            const invalidId = "6f46ds46"
            await api.delete(`/api/blogs/${invalidId}`).auth(token, { type: 'bearer' }).expect(400)
        })
        test("delete an existing blog without token returns an Unauthorized response", async () => {
            const inDb = await getAllBlogsDb()
            await api.delete(`/api/blogs/${inDb[0].id}`)
                .expect(401)
                .expect('Content-Type', /application\/json/)
                .expect(res => {
                    if (!('error' in res.body)) {
                        throw new Error('Missing error message');
                    }
                })
            const inDbAfter = await getAllBlogsDb()

            assert.strictEqual(inDbAfter.length, inDb.length)
            assert(inDbAfter.some(b => b.id === inDb[0].id))
        })
    })

    describe("update a blog", () => {
        test("update likes in an existing blog works", async () => {
            const inDb = await getAllBlogsDb()
            await api.put(`/api/blogs/${inDb[0].id}`)
                .send({
                    likes: 8
                })
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect("Content-Type", /application\/json/)

            const inDbAfter = await getAllBlogsDb()

            assert.strictEqual(inDbAfter.length, inDb.length)

            assert.strictEqual(inDb[0].likes, 7)
            assert.strictEqual(inDbAfter.find(b => b.id === inDb[0].id).likes, 8)
        })
        test("update with a wrong id fails", async () => {
            const invalidId = await notSavedId()
            await api.put(`/api/blogs/${invalidId}`, { likes: 8 }).auth(token, { type: 'bearer' }).expect(404)
        })
        test("update with a wrong formatted id fails", async () => {
            const invalidId = "6f46ds46"
            await api.put(`/api/blogs/${invalidId}`, { likes: 8 }).auth(token, { type: 'bearer' }).expect(400)
        })
    })
})

after(() => mongoose.connection.close())