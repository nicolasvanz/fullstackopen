const validUserCredentials = {
  username: "testUserName",
  name: "testName",
  password: "123test123"
}

const newBlogProps = {
  title: "newBlogTestTitle",
  author: "newBlogTestAuthor",
  url: "newBlogTestUrl",
}

describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND_API_URL")}/testing/reset`)
    cy.request(
      "POST", `${Cypress.env("BACKEND_API_URL")}/users`, validUserCredentials
    )
    cy.visit(Cypress.env("HOMEPAGE"))
  })

  it("Login form is shown", () => {
    cy.get("#loginForm")
  })

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("input[name=username]").type(validUserCredentials.username)
      cy.get("input[name=password]").type(validUserCredentials.password)
      cy.get("button[type=\"submit\"]").click()
      cy.get(".success")
    })

    describe("fails with wrong credentials", () => {
      it("wrong username", () => {
        cy.get("input[name=username]").type("invalidUsername")
        cy.get("input[name=password]").type(validUserCredentials.password)
        cy.get("button[type=\"submit\"]").click()
        cy.get(".error")
          .contains("invalid credentials")
          .and("have.css", "color", "rgb(255, 0, 0)")
      })

      it("wrong password", () => {
        cy.get("input[name=username]").type(validUserCredentials.username)
        cy.get("input[name=password]").type("invalidPassword")
        cy.get("button[type=\"submit\"]").click()
        cy.get(".error")
          .contains("invalid credentials")
          .and("have.css", "color", "rgb(255, 0, 0)")
      })
    })
  })

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login(validUserCredentials)
    })

    it("a blog can be created", () => {
      cy.contains("new blog").click()
      cy.get("input[name=title]").type(newBlogProps.title)
      cy.get("input[name=author]").type(newBlogProps.author)
      cy.get("input[name=url]").type(newBlogProps.url)
      cy.get("button[type=submit]").click()

      cy.get(".success")
      cy.contains(`${newBlogProps.title} ${newBlogProps.author}`)
      cy.contains("view")
    })

    describe("with a created blog", () => {
      beforeEach(() => {
        const token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        cy.request({
          method: "POST",
          url: `${Cypress.env("BACKEND_API_URL")}/blogs`,
          headers: {
            authorization: token
          },
          body: newBlogProps
        })
        cy.visit(Cypress.env("HOMEPAGE"))
      })

      it("users can like the blog", () => {
        cy.contains("view").click()
        cy.contains("like").as("likeButton")
        cy.get("@likeButton").parent()
          .should("include.text", "likes 0")
        cy.get("@likeButton").click()
        cy.get("@likeButton").parent()
          .should("include.text", "likes 1")
      })
    })
  })
})