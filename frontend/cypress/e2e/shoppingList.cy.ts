import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("Jag är på sidan för menyer", () => {
  cy.visit("http://127.0.0.1:5173/#/shoppingList");
});

When("Jag klickar på “Visa inköpslista” för menyn “Veckomeny 1”", () => {
  cy.get("button").contains("Visa inköpslista").click();
});

Then("Inköpslistan ska innehålla “Butter 1 tablespoons”", () => {
  cy.contains("Butter 1 tablespoons");
});
