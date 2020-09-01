/// <reference types="Cypress" />

context("Demos", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  describe("My Bogus Test", function() {
    it("Does not do much!", function() {
      expect(true).to.equal(true);
    });
  });

  describe("Navbar", function() {
    it("Has the correct Title", function() {
      cy.contains("Advanced Angular Development");
    });
  });

  describe("Left Menu", function() {
    it("Has six options in Testing menu", function() {
      cy.visit("http://localhost:4200/demos/");
      cy.get("button.mat-raised-button").should("have.length", 6);
    });

    it("Shows the correct content when clicking test pipe", function() {
      cy.visit("http://localhost:4200/demos/");
      cy.contains("Test Pipe").click();
      cy.contains("Component: TestPipeComponent");
    });
  });
});
