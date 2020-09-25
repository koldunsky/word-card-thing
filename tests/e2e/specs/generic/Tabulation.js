import { addFirstWordWithoutPassingScreen } from '../../utils/addWord'

describe('Tabulation', () => {
  it('initial state tabulates correctly', () => {
    cy.visit('/')
    cy.get('body').tab()
    cy.focused().should('have.id', 'intro_field_word').tab()
    cy.focused().should('have.id', 'intro_field_translation').tab()
    cy.focused().should('have.id', 'intro_field_word')
  })

  it('tab works while add words', () => {
    cy.visit('/')
    addFirstWordWithoutPassingScreen(cy)
    cy.get('#intro_button_pass').then(() => {
      cy.get('body').tab()
    })
    cy.focused().should('have.id', 'intro_button_pass')
  })
})
