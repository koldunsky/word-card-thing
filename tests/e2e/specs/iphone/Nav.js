// https://docs.cypress.io/api/introduction/api.html

describe("Navigation", () => {
  const addWord = () => {
    cy.get("#field_word").type("www");
    cy.get("#field_translation").type("ttt");
    cy.get("#button_add").click();
  };

  const addThreeWords = () => {
    for (let i = 0; i < 3; i++) {
      addWord();
    }
  };

  it("has correct height on iphone 6", () => {
    cy.viewport("iphone-6");
    cy.visit("/");
    addThreeWords();
    cy.get(".nav").should($div => {
      expect($div.get(0).offsetHeight).to.eq(64);
    });
  });

  it("has correct height on iphone X", () => {
    cy.viewport("iphone-x");
    cy.visit("/");
    console.info(navigator.userAgent);
    addThreeWords();
    cy.get(".nav").should($div => {
      expect($div.get(0).offsetHeight).to.eq(94);
    });
  });
});
