describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND_API_URL")}/testing/reset`)
    cy.visit("http://127.0.0.1:5173")
  })

  it("Login form is shown", () => {
    cy.get("#loginForm")
  })


})