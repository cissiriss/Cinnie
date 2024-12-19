import Home from "../../src/components/Home";

describe("Home", () => {
  it("should render", () => {
    cy.mount(<Home />);
    cy.get("div").should("have.class", "container");
    cy.get("div").should("have.class", "prose");
    cy.get("h1").should("have.text", "Meal planner");
    cy.get("h2").should("have.text", "Plan your weekly meals");
    cy.get("ol").should("be.visible");
    cy.get("li").should("have.length", 3);
  });
});
