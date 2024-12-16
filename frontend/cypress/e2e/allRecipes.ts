import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Att jag är på hemsidan", () => {
  cy.visit("http://127.0.0.1:5173/#/");
});

When("När jag går till recipes", () => {
  cy.visit("http://127.0.0.1:5173/#/recipes");
});

Then("Vill jag se en samling av alla recept", () => {
  cy.get("h1").contains("All recipes");
});
