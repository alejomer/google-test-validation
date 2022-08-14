/// <reference types="cypress" />

const searchBar = (term) => {
  cy.get(".RNNXgb").type(term + "{enter}");
  cy.wait("@googleSearch");
};
const validateSettingsLink = () => {
  cy.get(".Q3DXx")
    .eq(1)
    .within(() => {
      cy.get(".c58wS").should("be.visible");
    });
};
describe("Validate google test cases", () => {
  beforeEach(() => {
    cy.intercept("GET", `${Cypress.env("baseUrl")}complete/search?*`).as(
      "googleSearch"
    );
  });
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });
  it("1. validate can search for any term using single search bar", () => {
    searchBar("cucumber testing");
    cy.url().should("include", "/search");
    validateSettingsLink();
  });
  it("2. validate the user can see how many results were found", () => {
    searchBar("cypress documentation");
    cy.get("#appbar").within(() => {
      cy.get("#result-stats").should("be.visible").and("contain", "Cerca de ");
    });
    validateSettingsLink();
  });
  it("3. Validate can see the how long the search took", () => {
    searchBar("Javascript course");
    cy.get("#appbar").within(() => {
      cy.get("nobr").should("be.visible");
    });
    validateSettingsLink();
  });
  it("4. Validate not found search", () => {
    searchBar("kjhjgdfyfjlkmljnkmhbjhj");
    cy.get(".card-section").within(() => {
      cy.get("p")
        .eq(0)
        .should("be.visible")
        .and("contain", "No se han encontrado resultados para tu búsqueda");
    });
    validateSettingsLink();
  });
});
