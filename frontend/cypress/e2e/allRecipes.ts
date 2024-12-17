import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Att jag är på hemsidan", () => {
  cy.visit("http://127.0.0.1:5173/#/");
});

When("När jag går till recipes", () => {
  cy.visit("http://127.0.0.1:5173/#/recipes");
});

Then("Vill jag se en samling av alla recept", () => {
  cy.get("h1").contains("All recipes");
  cy.get("li").should("be.visible");
  cy.get("li").should("have.length.greaterThan", 0);
});

Then("Vill jag kunna läsa recepten", () => {
  cy.get("li").contains("How to make");
});

Then("Vill jag se ingredienserna", () => {
  cy.get("td").should("have.length.greaterThan", 0);
});
