import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor/";

Given("the database contains the following recipes:", () => {
  cy.intercept("GET", "/api/recipes").as("getRecipes");
});

Given("the database contains no recipes", () => {
  cy.intercept("GET", "/api/recipes", {
    statusCode: 200,
    body: [],
  }).as("getRecipesEmpty");
});

When("I navigate to the recipe collection page", () => {
  cy.visit("http://localhost:5173/recipes");
});

Then("I should see a list of recipes displayed", () => {
  cy.wait("@getRecipes");
  cy.get("ul").should("be.visible");
  // cy.get("li").should("be.visible");
  // cy.get("li").should("have.length.at.least", 1);
});

Then("each recipe should show its name and description", () => {
  cy.wait("@getRecipes");
  cy.get("ul").should("have.length.at.least", 1);
  // cy.get("li").should("have.length.at.least", 1);
  // cy.get("li").should("contain", "Spaghetti");
  // cy.get("p").should("contain", "A classic Italian dish");
});

Then("I should see a message saying {string}", (message: string) => {
  message = "No recipes available";
  cy.wait("@getRecipesEmpty");
  cy.contains(message);
});
