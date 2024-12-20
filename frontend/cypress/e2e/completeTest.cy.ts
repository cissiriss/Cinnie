describe("completeTest", () => {
  it("visit the website and clicks the recipe button", () => {
    cy.visit("http://localhost:5173/");
    cy.get("li").should("be.visible");
    cy.get("div").contains("Recipes").click();
    cy.get("li").contains("All recipes").click();
    cy.get("h3").should("be.visible");
    cy.get("li").should("be.not.empty");
  });

  it("visit the website and clicks the menu button", () => {
    cy.visit("http://localhost:5173/");
    cy.get("li").should("be.visible");
    cy.get("div").contains("Menus").click();
    cy.get("li").contains("See menus").click();
    cy.get("h1").should("be.visible");
    cy.get("li").should("be.not.empty");
  });

  it("visit the recipe form", () => {
    cy.visit("http://localhost:5173/");
    cy.get("li").should("be.visible");
    cy.get("div").contains("Recipes").click();
    cy.get("li").contains("Add recipe").click();
    cy.get("input").should("be.visible");
    cy.get("button").contains("Add Ingredient");
    cy.get("button").contains("Save");
  });
  it("visit the menu form", () => {
    cy.visit("http://localhost:5173/");
    cy.get("li").should("be.visible");
    cy.get("div").contains("Menus").click();
    cy.get("li").contains("Add menu").click();
    cy.get("input").should("be.visible");
    cy.get("button").contains("Add Menu");
    cy.get("input[type=checkbox]").should("be.visible");
  });
});
