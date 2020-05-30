export const addWord = (cy) => {
  cy.get('#field_word').type('www')
  cy.get('#field_translation').type('ttt')
  cy.get('#button_add').click()
}

export const addThreeWords = (cy) => {
  for (let i = 0; i < 3; i++) {
    addWord()
  }
}
