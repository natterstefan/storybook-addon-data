/**
 * Cypress tests
 *
 * - FYI, these tests are very simple yet. They test basic assertions (eg. does
 *   a text exist) on storybook webpages
 *
 * Docs
 * - `should` syntax: https://docs.cypress.io/api/commands/should.html#Syntax
 * - how to write tests: https://docs.cypress.io/guides/getting-started/writing-your-first-test.html
 */
describe('storybook-addon-data', () => {
  it('renders data panel', () => {
    cy.visit('http://localhost:9001')
    cy.contains('Data').should('be.visible')
  })

  it('renders data panel with data from README', () => {
    cy.visit('http://localhost:9001/?path=/story/button--with-text')
    cy.contains('data.json').should('be.visible')
    cy.contains('Example App').should('be.visible')
  })

  it('withData: renders data panel with data from README before code block', () => {
    cy.visit(
      'http://localhost:9001/?path=/story/button--without-story-parameters',
    )
    cy.contains('data.json').should('be.visible')
    cy.contains('Example Readme for the JSON part').should('be.visible')
  })

  it('withDataHoc: renders data panel with data from README before code block', () => {
    cy.visit('http://localhost:9001/?path=/story/button--with-withdata-hoc')
    cy.contains('data.json').should('be.visible')
  })
})
