import { LOGGED_USER_LS_KEY } from "../../src/lib/constants"

const user = {
  name: 'Daniel',
  username: 'danny98',
  password: 'Daniel123'
}

const user2 = {
  name: 'Daniel 2',
  username: 'danny982',
  password: 'Daniel123'
}

const blog = {
  id: "321adf",
  title: "First Blog",
  author: "Author 1",
  url: "http://example.com/1",
  likes: 5,
  user: {
    name: "Daniel",
    username: "danny98",
    id: "321ade",
  },
};

const blog2 = {
  title: "Second Blog",
  author: "Author 2",
  url: "http://example.com/2",
};

const initialBlogs = [
  {
    title: "First Blog",
    author: "Author 1",
    url: "http://example.com/1",
    likes: 5
  },
  {
    title: "Second Blog",
    author: "Author 2",
    url: "http://example.com/2",
    likes: 10
  },
  {
    title: "Third Blog",
    author: "Author 3",
    url: "http://example.com/3",
    likes: 7
  }
]

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', '/api/testing/reset')
    cy.request('POST', '/api/users', user)
    cy.request('POST', '/api/users', user2)

    cy.visit("")
  })

  it('Login form is shown', function () {
    cy.contains("log in to the application")
    cy.get("#login-form")
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get("input:first").type(user.username)
      cy.get("input:last").type(user.password)

      cy.contains("login").click()

      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get("input:first").type(user.username)
      cy.get("input:last").type("random password")

      cy.contains("login").click()

      cy.get("#notification").should("contain", "Wrong username or password")
      cy.get("#notification").should("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', '/api/login', { username: user.username, password: user.password }).then(response => {
        cy.request({
          method: "POST",
          url: '/api/blogs',
          body: blog2,
          headers: {
            "Authorization": `Bearer ${response.body.token}`
          }
        }).then((response) => { blog2.id = response.body.id })

        localStorage.setItem(LOGGED_USER_LS_KEY, JSON.stringify(response.body))
        cy.visit('')
      })
    })

    it('A blog can be created', function () {
      cy.contains("create new blog").click()

      cy.get("#title").type(blog.title)
      cy.get("#author").type(blog.author)
      cy.get("#url").type(blog.url)

      cy.get("#create-button").click()

      cy.get("#notification").should("contain", `A new blog ${blog.title} by ${blog.author} added`)
      cy.get("#notification").should("have.css", "color", "rgb(0, 128, 0)")
    })

    it("Users can like a blog", function () {
      cy.contains(`${blog2.title} ${blog2.author}`).contains("view").click()
      cy.contains("likes 0")

      cy.contains("like").click()

      cy.contains("likes 1")
    })

    it("Users can delete a blog", function () {
      cy.contains(`${blog2.title} ${blog2.author}`).contains("view").click()
      cy.contains("remove").click()

      cy.get("#notification").should("contain", `Blog entry removed`)
      cy.get("#notification").should("have.css", "color", "rgb(0, 128, 0)")
    })

    it("Only creator can see remove button", function () {
      // Check right user
      cy.contains(`${blog2.title} ${blog2.author}`).contains("view").click()
      cy.contains("remove")

      // Logout
      cy.contains("logout").click()

      // log in with wrong user
      cy.get("input:first").type(user2.username)
      cy.get("input:last").type(user2.password)
      cy.contains("login").click()

      // Check not button
      cy.contains(`${blog2.title} ${blog2.author}`).contains("view").click()
      cy.contains("remove").should("not.exist")
    })
  })

  describe('When logged in with several test blogs', function () {
    beforeEach(function () {
      cy.request('POST', '/api/login', { username: user.username, password: user.password }).then(response => {
        initialBlogs.forEach(b => {
          cy.request({
            method: "POST",
            url: '/api/blogs',
            body: b,
            headers: {
              "Authorization": `Bearer ${response.body.token}`
            }
          })
        })

        localStorage.setItem(LOGGED_USER_LS_KEY, JSON.stringify(response.body))
        cy.visit('')
      })
    })

    it("blogs are ordered by likes", async () => {
      initialBlogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .forEach((b, index) => {
          cy.get(".blog").eq(index).should("contain", b.title)
        })
    })
  })
})