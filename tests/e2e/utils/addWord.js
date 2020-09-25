import get from 'lodash/get'

export const addFirstWordWithoutPassingScreen = (cy, word = 'www', translation = 'ttt') => {
  cy.get('#intro_field_word').type(word)
  cy.get('#intro_field_translation').type(translation)
  cy.get('#intro_button_add').click()
}

export const addFirstWord = (cy, word = 'www', translation = 'ttt') => {
  cy.get('#intro_field_word').type(word)
  cy.get('#intro_field_translation').type(translation)
  cy.get('#intro_button_add').click()
  cy.get('#intro_button_pass').click()
}

export const addFirstWords = (cy, words) => {
  const length = words ? words.length : 3

  for (let i = 0; i < length; i++) {
    if (i === 0) {
      addFirstWord(cy, get(words, [i, 0], undefined), get(words, [i, 1], undefined))
    } else {
      addWord(cy, get(words, [i, 0], undefined), get(words, [i, 1], undefined))
    }
  }
}

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

