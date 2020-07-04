import get from 'lodash/get'

export const addWord = (cy, word = 'www', translation = 'ttt') => {
  cy.get('#field_word').type(word)
  cy.get('#field_translation').type(translation)
  cy.get('#button_add').click()
}

export const addThreeWords = (cy, words) => {
  for (let i = 0; i < 3; i++) {
    addWord(cy, get(words, [i, 0], undefined), get(words, [i, 1], undefined))
  }
}
