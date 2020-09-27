import { addFirstWordWithoutPassingScreen, addFirstWord } from '../../utils/addWord'

describe('Tabulation', () => {
  it('initial state tabulates correctly', () => {
    cy.visit('/')
    cy.get('body').tab()
    cy.focused().should('have.id', 'intro_field_word').tab()
    cy.focused().should('have.id', 'intro_field_translation').tab()
    cy.focused().should('have.id', 'intro_field_word')
  })

  it('tab works when first word is added', () => {
    cy.visit('/')
    addFirstWordWithoutPassingScreen(cy)
    cy.get('#intro_button_pass').should('have.css', 'opacity', '1').then(() => {
      cy.get('body').tab()
    })
    cy.focused().should('have.id', 'intro_button_pass')
  })

  it('tab works after intro screen is passed', () => {
    cy.visit('/')
    addFirstWord(cy)
    cy.get('body').tab()
    cy.focused().should('have.id', 'field_word').tab()
    cy.focused().should('have.id', 'field_translation').tab()
    cy.focused().should('have.id', 'button_add').tab()
    cy.focused().should('have.id', 'field_word').tab()
    cy.focused().should('have.id', 'field_translation').tab()
    cy.focused().should('have.id', 'button_add')
  })
})
