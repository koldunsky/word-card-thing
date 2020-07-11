import { addWords } from '../../utils/addWord'

const initialOrder = [
  ['bed', 'кровать'],
  ['apple', 'яблоко'],
  ['wheel', 'колесо'],
  ['house', 'дом']
]
const words = [
  initialOrder[1],
  initialOrder[0],
  initialOrder[3],
  initialOrder[2]
]
const wordsReversed = [
  initialOrder[2],
  initialOrder[3],
  initialOrder[0],
  initialOrder[1]
]
const translations = [
  initialOrder[3],
  initialOrder[2],
  initialOrder[0],
  initialOrder[1]
]
const translationsReversed = [
  initialOrder[1],
  initialOrder[0],
  initialOrder[2],
  initialOrder[3]
]
const checkOrder = (pair, i) => {
  cy.get('[data-qa="list-item"]').eq(i).contains(pair[0])
  cy.get('[data-qa="list-item"]').eq(i).contains(pair[1])
}

describe('"List" screen', () => {
  it('sorting works well', () => {
    cy.visit('/')
    addWords(cy, initialOrder)

    cy.get('.nav [data-qa="nav-item-list"]').click()
    words.forEach(checkOrder)

    cy.get('[data-qa="list-sorting-word"]').click()

    wordsReversed.forEach(checkOrder)

    cy.get('[data-qa="list-sorting-translation"]').click()

    translations.forEach(checkOrder)

    cy.get('[data-qa="list-sorting-translation"]').click()

    translationsReversed.forEach(checkOrder)

    cy.get('[data-qa="list-delete-button"]').click()

    initialOrder.forEach(checkOrder)
  })
})
