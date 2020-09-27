import { addFirstWords } from '../../utils/addWord'

describe('Navigation', () => {
  it('has correct height on iphone 6', () => {
    cy.viewport('iphone-6')
    cy.visit('/')
    addFirstWords(cy)
    cy.get('.nav').should($div => {
      expect($div.get(0).offsetHeight).to.eq(64)
    })
  })

  it('has correct height on iphone X', () => {
    cy.viewport('iphone-x')
    cy.visit('/')
    addFirstWords(cy)
    cy.get('.nav').should($div => {
      expect($div.get(0).offsetHeight).to.eq(94)
    })
  })
})
