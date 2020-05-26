// https://docs.cypress.io/api/introduction/api.html

describe("Navigation", () => {
  it("Visits the app root url", () => {
    const addWord = () => {
      cy.get("#field_word").type("www");
      cy.get("#field_translation").type("ttt");
      cy.get("#field_translation").type("ttt");
    };
    cy.viewport("iphone-6");
    cy.visit("/");
    cy.get(".nav").should($div => {
      expect($div.get(0).offsetHeight).to.eq(68);
    });
  });
});
