import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("http://127.0.0.1:5173/#/menus");
});

Given("Jag är på sidan för menyer och rubriken visar Menus", () => {
  cy.get("h1").contains("Menus");
});

When("Jag klickar på “Create shopping list” för menyn Weekly menu 1", () => {
  cy.get("button").contains("Create shopping list").click();
});

Then("Inköpslistan ska visas", () => {
  cy.get("li").should("be.visible");
});

Then("Inköpslistan ska innehålla rubriken Shopping List", () => {
  cy.get("h2").contains("Shopping List");
});
