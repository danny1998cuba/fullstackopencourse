const app = require('../app')
const mongoose = require('mongoose');
const supertest = require('supertest')
const { beforeEach, test, after, describe } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const { getAllUsersDb, notSavedIdUser } = require("../utils/test-helpers")

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({});
    // await Blog.insertMany(blogs)
})

describe("api users", () => {

    // test("get blogs returns the right amount and right content-type", async () => {
    //     const res = await api.get("/api/blogs")
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/)

    //     assert.strictEqual(res.body.length, blogs.length)
    // })

    // test("the unique identifier is named id", async () => {
    //     const res = await api.get("/api/blogs")
    //     const valid = res.body.every(b => 'id' in b)
    //     assert.strictEqual(valid, true)
    // })

    describe("saving users", () => {
        test("save an user works", async () => {
            const newData = {
                name: "Daniel",
                username: "danny98",
                password: "Daniel123"
            }

            const response = await api
                .post('/api/users')
                .send(newData)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const inDb = await getAllUsersDb()
            const fromDb = inDb.find(e => e.id === response.body.id)

            assert.strictEqual(inDb.length, 1)
            assert.deepStrictEqual(fromDb, response.body)
        })

        test("username must be provided and at least 3 characters long", async () => {
            const newDataNoUsername = {
                name: "Daniel",
                password: "Daniel123"
            }

            const newDataShortUsername = {
                name: "Daniel",
                username: "da",
                password: "Daniel123"
            }

            await api
                .post('/api/users')
                .send(newDataNoUsername)
                .expect(400)
                .expect(res => {
                    if (!('error' in res.body)) {
                        throw new Error('Missing error message');
                    }
                })

            await api
                .post('/api/users')
                .send(newDataShortUsername)
                .expect(400)
                .expect(res => {
                    if (!('error' in res.body)) {
                        throw new Error('Missing error message');
                    }
                })
        })

        test("username must be unique", async () => {
            const firstOne = {
                name: "Daniel",
                username: "danny98",
                password: "Daniel123"
            }

            const secondOne = {
                name: "Daniel",
                username: "danny98",
                password: "Daniel123"
            }

            await api
                .post('/api/users')
                .send(firstOne)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            await api
                .post('/api/users')
                .send(secondOne)
                .expect(400)
                .expect(res => {
                    if (!('error' in res.body)) {
                        throw new Error('Missing error message');
                    }
                })
        })

        test("password must be provided and at least 3 characters long", async () => {
            const newDataNoPassword = {
                name: "Daniel",
                username: "danny98",
            }

            const newDataShortPassword = {
                name: "Daniel",
                username: "danny98",
                password: "Da"
            }

            await api
                .post('/api/users')
                .send(newDataNoPassword)
                .expect(400)
                .expect(res => {
                    if (!('error' in res.body)) {
                        throw new Error('Missing error message');
                    }
                })

            await api
                .post('/api/users')
                .send(newDataShortPassword)
                .expect(400)
                .expect(res => {
                    if (!('error' in res.body)) {
                        throw new Error('Missing error message');
                    }
                })
        })
    })

    // describe("deleting a blog", () => {
    //     test("delete an existing blog works", async () => {
    //         const inDb = await getAllUsersDb()
    //         await api.delete(`/api/blogs/${inDb[0].id}`).expect(204)
    //         const inDbAfter = await getAllUsersDb()

    //         assert.strictEqual(inDbAfter.length, inDb.length - 1)
    //         assert(!inDbAfter.some(b => b.id === inDb[0].id))
    //     })
    //     test("delete with a wrong id fails", async () => {
    //         const invalidId = await notSavedId()
    //         await api.delete(`/api/blogs/${invalidId}`).expect(404)
    //     })
    //     test("delete with a wrong formatted id fails", async () => {
    //         const invalidId = "6f46ds46"
    //         await api.delete(`/api/blogs/${invalidId}`).expect(400)
    //     })
    // })

    // describe("update a blog", () => {
    //     test("update likes in an existing blog works", async () => {
    //         const inDb = await getAllUsersDb()
    //         await api.put(`/api/blogs/${inDb[0].id}`).send({
    //             likes: 8
    //         }).expect(200).expect("Content-Type", /application\/json/)

    //         const inDbAfter = await getAllUsersDb()

    //         assert.strictEqual(inDbAfter.length, inDb.length)

    //         assert.strictEqual(inDb[0].likes, 7)
    //         assert.strictEqual(inDbAfter.find(b => b.id === inDb[0].id).likes, 8)
    //     })
    //     test("update with a wrong id fails", async () => {
    //         const invalidId = await notSavedId()
    //         await api.put(`/api/blogs/${invalidId}`, { likes: 8 }).expect(404)
    //     })
    //     test("update with a wrong formatted id fails", async () => {
    //         const invalidId = "6f46ds46"
    //         await api.put(`/api/blogs/${invalidId}`, { likes: 8 }).expect(400)
    //     })
    // })
})

after(() => mongoose.connection.close())