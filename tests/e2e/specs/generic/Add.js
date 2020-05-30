// https://docs.cypress.io/api/introduction/api.html

describe('"Add" screen', () => {
  const addWord = () => {
    cy.get('#field_word').type('www')
    cy.get('#field_translation').type('ttt')
    cy.get('#button_add').click()
  }

  const addThreeWords = () => {
    for (let i = 0; i < 3; i++) {
      addWord()
    }
  }

  it('unlocks navigation', () => {
    cy.visit('/')
    addThreeWords()
    cy.wait(500)
    cy.get('.nav').should($div => {
      expect($div.get(0).offsetHeight).greaterThan(0)
    })
  })
})
