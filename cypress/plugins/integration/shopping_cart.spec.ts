

describe("Shopping cart", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("displays all products with images, titles, and prices", () => {
      cy.get(".shelf-item").each((product) => {
        cy.wrap(product)
          .find(".shelf-item__thumb")
          .should("have.attr", "src")
          .and("not.be.empty");
  
        cy.wrap(product)
          .find(".shelf-item__title")
          .should("not.be.empty");
  
        cy.wrap(product)
          .find(".shelf-item__price")
          .should("not.be.empty");
      });
    });
  });
  