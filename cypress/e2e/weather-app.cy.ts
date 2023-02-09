describe('sample test suite', () => {
  it('should render weather app', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#locationsId').should('be.visible')
  })
})