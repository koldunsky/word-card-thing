import { addFirstWord } from '../../utils/addWord'

describe('"Intro" screen', () => {
  it('passes successfully', () => {
    cy.visit('/')
    addFirstWord(cy)
    cy.wait(1000)
    cy.get('#app .introScreen')
      .should('have.class', 'introScreen_inactive')
      .should('have.css', 'opacity', '0')
      .should('have.css', 'pointer-events', 'none')
  })
})
