import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("http://127.0.0.1:5173/#/menus");
});

Given("Jag är på sidan för menyer och rubriken visar Weekly menu 1", () => {
  cy.visit("http://127.0.0.1:5173/#/menus");
});

When("Jag klickar på “Create shopping list” för menyn Weekly menu 1", () => {
  cy.get("button").contains("Create shopping list").click();
});

Then("Inköpslistan ska visas", () => {
  cy.get("li").should("be.visible");
});

Then("Inköpslistan ska innehålla “Butter 1 tablespoons”", () => {
  cy.get("li").contains("Butter 1 tablespoons");
  cy.get("li").contains("Eggs 2 pieces");
  cy.get("li").contains("Flour 100 grams");
  cy.get("li").contains("Milk 500 liters");
  cy.get("li").contains("Sugar 200 grams");
});
