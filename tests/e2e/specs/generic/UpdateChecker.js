import { UPDATE_CHECKER_UPDATE_UI } from '../selectors'

describe('Update checker', () => {
  it('shows update UI', () => {
    cy.visit('/')
    cy.wait(0).then(() => {
      cy.get('body').trigger('swUpdated')
      cy.get(UPDATE_CHECKER_UPDATE_UI)
    })
    cy.get(UPDATE_CHECKER_UPDATE_UI)
  })
})
