import { addThreeWords } from '../../utils/addWord'

const initialOrder = [
  ['apple', 'яблоко'],
  ['house', 'дом'],
  ['wheel', 'колесо']
]
const wordsReversed = [
  ['wheel', 'колесо'],
  ['house', 'дом'],
  ['apple', 'яблоко']
]
const translations = [
  ['house', 'дом'],
  ['wheel', 'колесо'],
  ['apple', 'яблоко']
]
const translationsReversed = [
  ['apple', 'яблоко'],
  ['wheel', 'колесо'],
  ['house', 'дом']
]
const checkOrder = (pair, i) => {
  cy.get('[data-qa="list-item"]').eq(i).contains(pair[0])
  cy.get('[data-qa="list-item"]').eq(i).contains(pair[1])
}

describe('"List" screen', () => {
  it('sorting works well', () => {
    cy.visit('/')
    addThreeWords(cy, initialOrder)
    cy.get('.nav [data-qa="nav-item-list"]').click()
    initialOrder.forEach(checkOrder)

    cy.get('[data-qa="list-sorting-word"]').click()
    cy.get('[data-qa="list-sorting-word"]').click()

    wordsReversed.forEach(checkOrder)

    cy.get('[data-qa="list-sorting-translation"]').click()

    translations.forEach(checkOrder)

    cy.get('[data-qa="list-sorting-translation"]').click()

    translationsReversed.forEach(checkOrder)
  })
})
