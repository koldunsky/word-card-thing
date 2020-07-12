import get from 'lodash/get'

export const addWord = (cy, word = 'www', translation = 'ttt') => {
  cy.get('#field_word').type(word)
  cy.get('#field_translation').type(translation)
  cy.get('#button_add').click()
}

export const addWords = (cy, words) => {
  const length = words ? words.length : 3

  for (let i = 0; i < length; i++) {
    addWord(cy, get(words, [i, 0], undefined), get(words, [i, 1], undefined))
  }
}
