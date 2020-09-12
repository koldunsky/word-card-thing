import { addFirstWords } from '../../utils/addWord'

const initialOrder = [
  ['bed', 'кровать'],
  ['apple', 'яблоко'],
  ['wheel', 'колесо'],
  ['house', 'Дом'],
  ['House', 'дом']
]
const words = [
  initialOrder[1],
  initialOrder[0],
  initialOrder[3],
  initialOrder[4],
  initialOrder[2]
]
const wordsReversed = [
  initialOrder[2],
  initialOrder[4],
  initialOrder[3],
  initialOrder[0],
  initialOrder[1]
]
const translations = [
  initialOrder[3],
  initialOrder[4],
  initialOrder[2],
  initialOrder[0],
  initialOrder[1]
]
const translationsReversed = [
  initialOrder[1],
  initialOrder[0],
  initialOrder[2],
  initialOrder[4],
  initialOrder[3]
]
const checkOrder = (pair, i) => {
  cy.get('[data-qa="list-item"]').eq(i).contains(pair[0])
  cy.get('[data-qa="list-item"]').eq(i).contains(pair[1])
}

describe('"List" screen', () => {
  beforeEach(() => {
    cy.visit('/')
    addFirstWords(cy, initialOrder)
    cy.get('.nav [data-qa="nav-item-list"]').click()
  })
  it('sorting: word normal order', () => {
    words.forEach(checkOrder)
  })

  it('sorting: word reverse order', () => {
    cy.get('[data-qa="list-sorting-word"]').click()

    wordsReversed.forEach(checkOrder)
  })

  it('sorting: translation normal order', () => {
    cy.get('[data-qa="list-sorting-word"]').click()
    cy.get('[data-qa="list-sorting-translation"]').click()

    translations.forEach(checkOrder)
  })

  it('sorting: translation reverse order', () => {
    cy.get('[data-qa="list-sorting-word"]').click()
    cy.get('[data-qa="list-sorting-translation"]').click()
    cy.get('[data-qa="list-sorting-translation"]').click()

    translationsReversed.forEach(checkOrder)
  })

  it('sorting: without sorting', () => {
    cy.get('[data-qa="list-sorting-word"]').click()
    cy.get('[data-qa="list-sorting-translation"]').click()
    cy.get('[data-qa="list-sorting-translation"]').click()
    cy.get('[data-qa="list-sorting-delete-button"]').click()

    initialOrder.forEach(checkOrder)
  })
  it('deletion works', () => {
    cy.get('[data-qa="list-item-delete-button"]').eq(0).click()
    cy.get('[data-qa="list-wrapper"]').find('[data-qa="list-item"]').should('have.length', 4)
  })
})
