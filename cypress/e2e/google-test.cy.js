/// <reference types="cypress" />
const searchBar = (term) => {
  cy.get(".RNNXgb").type(term + "{enter}");
  cy.wait("@googleSearch");
};

const validateSettingLink = () => {
  cy.get('.Q3DXx').eq(1).within(()=> {
    cy.get('.c58wS').should('be.visible')
  })
} 
describe("Validate google test cases", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://www.google.com/complete/search?*").as(
      "googleSearch"
    );
  });
  beforeEach(() => {
    cy.visit("https://www.google.com");
  });
  it("1. validate can search for any term using single search bar", () => {
    searchBar("cucumber testing");
    cy.url().should("include", "/search");
    validateSettingLink()
  });
  it("2. validate the user can see how many results were found", () => {
    searchBar("cypress documentation");
    cy.get("#appbar").within(() => {
      cy.get("#result-stats").should("be.visible").and("contain", "Cerca de ");
    });
    validateSettingLink()
  });
  it("3. Validate can see the how long the search took", () => {
    searchBar("Javascript course");
    cy.get("#appbar").within(() => {
      cy.get("nobr").should("be.visible");
    });
    validateSettingLink()
  });
  it("4. Validate not found search", () => {
    searchBar("kjhjgdfyfjlkmljnkmhbjhj");
    cy.get(".card-section").within(() => {
      cy.get("p").eq(0).should("be.visible").and('contain', 'No se han encontrado resultados para tu búsqueda');
    });
    validateSettingLink()
  });
});
