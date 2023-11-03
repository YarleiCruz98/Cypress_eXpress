describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('http://localhost:8080/')
  })
})