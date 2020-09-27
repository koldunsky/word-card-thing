import { addFirstWords } from '../../utils/addWord'

describe('"Add" screen', () => {
  it('unlocks navigation', () => {
    cy.visit('/')
    addFirstWords(cy)
    cy.wait(500)
    cy.get('.nav').should($div => {
      expect($div.get(0).offsetHeight).greaterThan(0)
    })
  })
})
