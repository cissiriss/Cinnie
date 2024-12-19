import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("http://127.0.0.1:5173/#/");
});

Given("Jag är på förstasidan och rubriken visar Meal planner", () => {
  cy.get("h1").contains("Meal planner");
});

When("Jag klickar på Menus och See menus", () => {
  cy.get("#menus").contains("Menus").click();
  cy.get("#see-menus").contains("See menus").click();
});

Then("Menyerna ska visas", () => {
  cy.get("h1").should("be.visible");
  cy.get("h2").should("be.visible");
  cy.get("li").should("have.length.greaterThan", 0);
});
