const validUserCredentials = {
  username: "root",
  password: "root123"
}

describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND_API_URL")}/testing/reset`)
    cy.visit("http://127.0.0.1:5173")
  })

  it("Login form is shown", () => {
    cy.get("#loginForm")
  })

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("input[name=username]").type(validUserCredentials.username)
      cy.get("input[name=password]").type(validUserCredentials.password)
      cy.get("button[type=\"submit\"]").click()
      cy.get(".error")
        .contains("invalid credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
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
})